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
import { motion } from 'framer-motion';

export default function Home() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]); // State to store the rendered cart items
    const [editing, setEditing] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
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
        if (!cart.length) return; // Don't proceed if the cart is empty

        async function loadAmountAndCartItems() {
            setLoading(true); // Start loading while fetching items
            let total = 0;

            const itemPromises = cart.map(cartItem =>
                fetch(`https://api.depxtech.com/read?filter_id=${cartItem.itemId}`).then(response => response.json())
            );

            const items = await Promise.all(itemPromises); // Wait for all item requests to resolve

            const renderedCartItems = items.map((item, index) => {
                const cartItem = cart[index];
                const images = item[0].imgs ? JSON.parse(item[0].imgs) : [];
                const selfPrice = Math.round(item[0].price * parseInt(cartItem.quantity) * 100) / 100;
                total += selfPrice;

                return (
                    <motion.div 
                        key={index} 
                        className='flex'
                        initial={{ transform: firstTime ? 'scale(0.5)' : 'scale(1)' }}
                        animate={{ transform: 'scale(1)' }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <motion.div
                            className='flex justify-center items-center'
                            animate={{ opacity: editing ? 1 : 0, width: editing ? "48px" : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            X
                        </motion.div>
                        <div className="flex flex-1 items-center mb-4 gap-x-3 background-card p-2 rounded-2xl">
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
                                <div className='flex flex-row'>
                                    <div className="text-2xl text-left font-extrabold flex-1">
                                        <span className="text-sm">$ </span>
                                        <span className='align-bottom'>{`${selfPrice}`.split('.')[0]}</span>
                                        <span className="text-[0px]">.</span>
                                        <span className="text-sm">{`${selfPrice}`.split('.')[1] || "00"}</span>
                                    </div>
                                    <div className='align-bottom'>x{cartItem.quantity}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            });

            setTotalAmount(Math.round(total * 100) / 100);
            setCartItems(renderedCartItems); // Store the rendered items in state
            setLoading(false); // Stop loading
        }

        loadAmountAndCartItems();
    }, [cart, editing, firstTime]);    
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
                    {cartItems}
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
                    {totalAmount != 0 && <TransitionLinkBackNav className="flex" href="/cart/checkout"><Button className="flex-1 text-md" size="lg">Checkout</Button></TransitionLinkBackNav> || <div className='flex'><Button className="flex-1 text-md" size="lg" variant="disabled">Checkout</Button></div>}
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
