"use client"

import { useSession, useUser, useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SiDiscover, SiGooglepay, SiKlarna, SiMastercard, SiVisa } from "react-icons/si";
import { FaApplePay } from 'react-icons/fa6';
import { TransitionLinkBackNav } from '@/components/client/pageTransition';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ExpressCheckoutButton from "@/components/client/ExpressCheckoutButton";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  apiVersion: '2023-10-16',
});

// Create a new CartItem component
const CartItem = ({ item, cartItem, index, editing, onDelete, onUpdateQuantity }) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0.3, 1, 0.3]);
    const background = useTransform(
        x,
        [-100, 0, 100],
        ['rgba(255, 0, 0, 0.2)', 'rgba(255, 255, 255, 0)', 'rgba(255, 0, 0, 0.2)']
    );

    const maxQuantity = item[0].available || 0;
    const currentQuantity = parseInt(cartItem.quantity);
    const images = item[0].imgs ? JSON.parse(item[0].imgs) : [];
    const selfPrice = Math.round(item[0].price * currentQuantity * 100) / 100;

    return (
        <motion.div 
            key={cartItem.itemId}
            className='flex'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
            }}
        >
            <motion.div
                className='flex justify-center items-center cursor-pointer'
                animate={{ opacity: editing ? 1 : 0, width: editing ? "48px" : 0 }}
                onClick={() => onDelete(cartItem.itemId)}
                whileHover={{ scale: 1.1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <motion.div 
                    whileHover={{ color: "red" }}
                    className="text-2xl"
                >
                    ×
                </motion.div>
            </motion.div>
            <motion.div 
                className="flex flex-1 items-center mb-4 gap-x-3 background-card p-2 rounded-2xl relative"
                style={{ x, opacity, background }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) > 100) {
                        onDelete(cartItem.itemId);
                    }
                }}
            >
                <Image
                    src={`https://src.depxtech.com/${images[0]}`}
                    width="84"
                    height="84"
                    alt={item[0].id}
                    className="w-24 h-24 object-contain rounded-xl bg-[#77777720]"
                />
                <div className="flex flex-1 flex-col">
                    <h3 className="text-ellipsis line-clamp-2 whitespace-normal">
                        {item[0].title}
                    </h3>
                    <div className='flex flex-row items-center'>
                        <div className="text-2xl text-left font-extrabold flex-1">
                            <span className="text-sm">$ </span>
                            <span className='align-bottom'>{`${selfPrice}`.split('.')[0]}</span>
                            <span className="text-[0px]">.</span>
                            <span className="text-sm">{`${selfPrice}`.split('.')[1] || "00"}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <motion.button
                                whileHover={{ scale: currentQuantity > 1 ? 1.1 : 1 }}
                                whileTap={{ scale: currentQuantity > 1 ? 0.9 : 1 }}
                                onClick={() => onUpdateQuantity(cartItem.itemId, Math.max(1, currentQuantity - 1))}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentQuantity > 1 ? 'bg-[#88888850]' : 'bg-[#88888850] opacity-50 cursor-not-allowed'
                                }`}
                                disabled={currentQuantity <= 1}
                            >
                                -
                            </motion.button>
                            <span className="w-8 text-center">{currentQuantity}</span>
                            <motion.button
                                whileHover={{ scale: currentQuantity < maxQuantity ? 1.1 : 1 }}
                                whileTap={{ scale: currentQuantity < maxQuantity ? 0.9 : 1 }}
                                onClick={() => onUpdateQuantity(cartItem.itemId, Math.min(maxQuantity, currentQuantity + 1))}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    currentQuantity < maxQuantity ? 'bg-[#88888850]' : 'bg-[#88888850] opacity-50 cursor-not-allowed'
                                }`}
                                disabled={currentQuantity >= maxQuantity}
                            >
                                +
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Home() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]); // State to store the rendered cart items
    const [editing, setEditing] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [itemsData, setItemsData] = useState([]); // Add this state
    const { user } = useUser();
    const { session } = useSession();
    const { isSignedIn } = useAuth();

    function createClerkSupabaseClient() {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_KEY,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({
                            template: 'supabase',
                        });

                        const headers = new Headers(options?.headers);
                        headers.set('Authorization', `Bearer ${clerkToken}`);

                        return fetch(url, {
                            ...options,
                            headers,
                        });
                    },
                },
            },
        );
    }
    const client = createClerkSupabaseClient();

    useEffect(() => {
        if (!user) return;

        async function loadCart() {
            setLoading(true);
            const { data, error } = await client
                .from('userdata')
                .select('cart');

            if (!error) {
                setCart(data[0].cart);
                console.log(data[0].cart);
            }
            setLoading(false); // Ensure loading stops even if there's an error
        }

        loadCart();
    }, [user]);

    useEffect(() => {
        if (!cart.length) return;

        async function loadAmountAndCartItems() {
            setLoading(true);
            let total = 0;

            try {
                const itemPromises = cart.map(cartItem =>
                    fetch(`https://api.depxtech.com/read?filter_id=${cartItem.itemId}`).then(response => response.json())
                );

                const items = await Promise.all(itemPromises);
                setItemsData(items);

                const renderedCartItems = items.map((item, index) => {
                    if (!item || !item[0]) return null;
                    
                    const cartItem = cart[index];
                    total += Math.round(item[0].price * parseInt(cartItem.quantity) * 100) / 100;

                    return (
                        <CartItem
                            key={cartItem.itemId}
                            item={item}
                            cartItem={cartItem}
                            index={index}
                            editing={editing}
                            onDelete={handleDeleteItem}
                            onUpdateQuantity={handleUpdateQuantity}
                        />
                    );
                }).filter(Boolean);

                setTotalAmount(Math.round(total * 100) / 100);
                setCartItems(renderedCartItems);
                setLoading(false);
                setFirstTime(false);
            } catch (error) {
                console.error('Error loading cart items:', error);
                setLoading(false);
            }
        }

        loadAmountAndCartItems();
    }, [cart, editing]);

    const handleDeleteItem = async (itemId) => {
        const updatedCart = cart.filter(item => item.itemId !== itemId);
        
        const { error } = await client
            .from('userdata')
            .update({ cart: updatedCart })
            .eq('user_id', user.id);

        if (!error) {
            setCart(updatedCart);
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        const itemData = itemsData.find(item => item[0].id === itemId);
        const maxQuantity = itemData?.[0]?.available || 0; // Changed to use item.available
        
        // Ensure newQuantity is within bounds
        newQuantity = Math.max(1, Math.min(maxQuantity, newQuantity));

        const updatedCart = cart.map(item => {
            if (item.itemId === itemId) {
                return { ...item, quantity: newQuantity.toString() };
            }
            return item;
        });

        const { error } = await client
            .from('userdata')
            .update({ cart: updatedCart })
            .eq('user_id', user.id);

        if (!error) {
            setCart(updatedCart);
        }
    };

    if (!isSignedIn) {
        return (
            <main className="max-w-6xl mx-auto pt-0 p-4 pr-0 flex flex-col items-center justify-center h-full">
                <div className="text-center">
                    <h3 className="text-xl mb-4">Please Sign In to View Your Cart</h3>
                    <TransitionLinkBackNav href="/sign-in">
                        <Button className="flex-1 text-md" size="lg">Sign In</Button>
                    </TransitionLinkBackNav>
                </div>
            </main>
        );
    } else if (cart.length > 0 || loading) {
        return (
            <main className="max-w-6xl mx-auto pt-0 p-4 pr-0 flex flex-col">
                <div className="flex-1 flex max-h-[calc(100dvh-45px-16px)] flex-col">
                <div className='flex-1 overflow-auto pr-4'>
                    <div className='flex item-center pt-8'>
                    <h1 className="text-4xl font-extrabold mb-12 flex-1 flex items-end">Cart {cart.length != 0 && <span className='text-2xl'>({cart.length})</span> || <Skeleton className="inline-block w-[34px] h-[30px]"/>}</h1>
                    <Button variant="link" onClick={() => setEditing(!editing)}>Edit</Button>
                    </div>
                    <div className="flex flex-col">
                        <AnimatePresence>
                            {cartItems}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='m-4'>
                    <h3 className="flex text-2xl items-end pb-6">
                    <div className='flex-1 align-bottom'>Total:</div>
                    <div className="text-2xl font-extrabold">
                        {totalAmount === 0 && <Skeleton className="h-8 w-16"/> || (
                        <>
                            <span className="text-sm">$ </span>
                            <span className='align-bottom'>{`${totalAmount}`.split('.')[0]}</span>
                            <span className="text-[0px]">.</span>
                            <span className="text-sm">{`${totalAmount}`.split('.')[1]}</span>
                        </>
                        )}
                    </div>
                    </h3>
                    <div className="flex flex-col gap-2">
                        {totalAmount != 0 && (
                            <>
                                <Elements 
                                    stripe={stripePromise}
                                    options={{
                                        mode: 'payment',
                                        currency: 'usd',
                                        payment_method_types: ['card'],
                                        amount: Math.round(totalAmount * 100),
                                        appearance: {
                                            theme: 'stripe',
                                            variables: {
                                                colorPrimary: '#4F46E5',
                                            },
                                        },
                                    }}
                                >
                                    <ExpressCheckoutButton amount={totalAmount} cart={cart} />
                                </Elements>
                                <div className="text-center text-sm text-gray-500">or</div>
                                <TransitionLinkBackNav className="flex" href="/cart/checkout">
                                    <Button className="flex-1 text-md" size="lg">Checkout with Card</Button>
                                </TransitionLinkBackNav>
                            </>
                        ) || (
                            <div className='flex'>
                                <Button className="flex-1 text-md" size="lg" variant="disabled">Checkout</Button>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-around *:inline *:h-8 *:w-auto *:px-3 *:py-1 *:border *:rounded-sm p-2 background-card my-2 rounded-xl border-[#88888888]'>
                    <SiVisa />
                    <SiMastercard />
                    <SiDiscover />
                    <FaApplePay />
                    <SiGooglepay />
                    <SiKlarna />
                    </div>
                </div>
                </div>
            </main>
        );
    } else {
        return (
            <main className="max-w-6xl mx-auto pt-0 p-4 pr-0 flex flex-col items-center justify-center h-full">
                <div className="text-center">
                    <h3 className="text-xl mb-4">Your Cart is Empty...</h3>
                    <Link href="/">
                        <Button className="flex-1 text-md" size="lg">Continue Shopping</Button>
                    </Link>
                </div>
            </main>
        );
    }
}
