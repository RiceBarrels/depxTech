'use client';
import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { GrClose } from "react-icons/gr";
import { Button } from '../ui/button';
import { TransitionLink, TransitionLinkBackNav } from './pageTransition';

export default function AddItem({ item, isIndividual = "0" }) {
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(isIndividual);
    const [itemId, setItemId] = useState(item.id);
    const [quantity, setQuantity] = useState('1');
    const [carts, setCarts] = useState([]);
    const { user } = useUser();
    const { session } = useSession();

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

        async function loadCarts() {
            setLoading(true);
            const { data, error } = await client
                .from('userdata')
                .select('cart')
                .eq('user_id', user.id)
                .single();

            if (error && error.code === 'PGRST116') { // User not found
                // Insert the user
                const { error: insertError } = await client
                    .from('userdata')
                    .insert({ user_id: user.id, cart: [] });

                if (insertError) {
                    console.error('Error inserting user:', insertError);
                    setLoading(false);
                    return;
                }

                setCarts([]);
            } else if (!error && data) {
                setCarts(data.cart || []);
            }

            setLoading(false);
        }

        loadCarts();
    }, [user]);

    async function createItemToCart(e) {
        e.preventDefault();

        // Check if the item is already in the cart
        const existingItemIndex = carts.findIndex(cartItem => 
            cartItem.itemId === itemId && cartItem.type === type
        );

        let updatedCarts;

        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            updatedCarts = [...carts];
            const newQuantity = parseInt(updatedCarts[existingItemIndex].quantity) + parseInt(quantity);

            // Ensure the new quantity does not exceed available items
            if (newQuantity <= item.available) {
                updatedCarts[existingItemIndex].quantity = newQuantity.toString();
            } else {
                alert(`You can only add up to ${item.available} items.`);
                updatedCarts[existingItemIndex].quantity = item.available.toString(); // Set to max available if user exceeds it
            }
        } else {
            // If the item is not in the cart, add it
            updatedCarts = [...carts, { type, itemId, quantity }];
        }

        // Update the cart in the database
        await client
            .from('userdata')
            .update({ cart: updatedCarts })
            .eq('user_id', user.id);

        // Update the state with the new cart
        setCarts(updatedCarts);
    }

    const images = item.imgs ? JSON.parse(item.imgs) : [];

    // Get current item quantity in the cart (default to 0 if not found)
    const currentItem = carts.find(cartItem => cartItem.itemId === itemId && cartItem.type === type);
    const currentQuantityInCart = currentItem ? parseInt(currentItem.quantity) : 0;

    return (
        <Drawer className="">
            <DrawerTrigger asChild>
                <Button className="flex-1 button-secondary py-2" disabled={!user}>
                    {user ? "Add to Cart" : "Sign In to use Cart"}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="flex-col flex h-[50dvh] border-[0.5px] border-[#88888850]">
                <DrawerHeader className="flex">
                    <DrawerClose><GrClose className="active:bg-[#88888850]" size={24}/></DrawerClose>
                    <div className="flex-1">
                        <DrawerTitle>{item.title}</DrawerTitle>
                        <DrawerDescription>Let me see this item in the database...</DrawerDescription>
                    </div>
                    <div className="flex justify-center items-center"><GrClose size={24} color="#00000000" /></div>
                </DrawerHeader>

                <div className='flex flex-col'>
                    <div className='flex justify-around'>
                        <Image src={"https://src.DepxTech.com/"+images[0]} width="500" height="500" alt={item.id} className="w-1/4 object-contain rounded-xl bg-[#88888820]" />
                        <div className="w-1/2">
                            <div className="text-2xl text-left font-extrabold">
                                <span className="text-sm align-top">$ </span>
                                <span>{item.price.split('.')[0]}</span>
                                <span className="text-[0px]">.</span>
                                <span className="text-sm align-top">{item.price.split('.')[1]}</span> Each
                            </div>
                            <p>Quantity <small>({item.available} left)</small>:</p>
                            <div className='flex items-center'>
                                <Input 
                                    type="number"
                                    name="quantity"
                                    placeholder="quantity"
                                    value={quantity}
                                    min="1"
                                    max={item.available}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (value > item.available) {
                                            setQuantity(item.available);
                                        } else if (value < 1) {
                                            setQuantity(1);
                                        } else {
                                            setQuantity(value);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (quantity > item.available) {
                                            alert(`Only ${item.available} items are available.`);
                                            setQuantity(item.available);
                                        }
                                    }}
                                    defaultValue="1"
                                    className="flex-1"
                                />
                                <div className="ml-2 text-sm">
                                    (In cart: {currentQuantityInCart})
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DrawerFooter className='flex'>
                    {quantity > 0 &&
                        <div className="text-2xl text-right font-extrabold">
                            +
                            <span className="text-sm align-top">$ </span>
                            <span>{("" + Math.round(quantity * item.price * 100) / 100).split('.')[0]}</span>
                            <span className="text-[0px]">.</span>
                            <span className="text-sm align-top">{("" + Math.round(quantity * item.price * 100) / 100).split('.')[1]}</span>
                        </div>
                    }
                    <TransitionLinkBackNav href="cart">
                        <Button onClick={createItemToCart} className="w-full button mb-2">
                            <DrawerClose className="w-full">Add to Cart</DrawerClose>
                        </Button>
                    </TransitionLinkBackNav>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
