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
    

    async function createTask(e) {
        if (quantity === ""){
            setQuantity('1')
        }
        e.preventDefault();
        const updatedCarts = [...carts, { type, itemId, quantity }];
        await client
            .from('userdata')
            .update({ cart: updatedCarts })
            .eq('user_id', user.id);
        setCarts(updatedCarts);
    }

    const images = item.imgs ? JSON.parse(item.imgs) : [];

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="flex-1 button-secondary py-2">Add to Cart</button>
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
                            <div className='flex'>
                                <Image src={"https://src.DepxTech.com/"+images[0]} width="500" height="500" alt={item.id} className="w-1/3 h-1/3 object-contain rounded-xl" />
                                <div>
                                    <small>Quantity:</small>
                                    <Input 
                                        autoFocus
                                        type="number"
                                        name="quantity"
                                        placeholder="quantity"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        defaultValue="1"
                                    />
                                </div>
                            </div>
                    </div>
                    <DrawerFooter className='flex'>
                    <button onClick={createTask} className="w-full button py-2"><DrawerClose className="w-full">Add to Cart</DrawerClose></button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
