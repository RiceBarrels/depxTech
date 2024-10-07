"use client"

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Image from "next/image";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartElement, setCartElement] = useState(<div></div>);
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

        async function loadCart() {
            setLoading(true);
            const { data, error } = await client
                .from('userdata')
                .select('cart');

            if (!error) {
                setCart(data[0].cart);
                console.log(data[0].cart);
            }
        }

        loadCart();
    }, [user]);

    useEffect(() => {
        async function loadAmountAndElement() {
            let total = 0;
            let cartItems = [];
            setCartElement(<div>Loading...</div>);
            for (let i = 0; i < cart.length; i++) {
                const response = await fetch(`https://api.depxtech.com/read?filter_id=${cart[i].itemId}`);
                const item = await response.json();
                const images = item[0].imgs ? JSON.parse(item[0].imgs) : [];
                const selfPrice = Math.round(item[0].price * parseInt(cart[i].quantity) * 100)/100;
                total += selfPrice;
                cartItems.push(
                    <div key={i} className="flex items-center mb-2 gap-x-3">
                      <Image 
                        src={`https://src.depxtech.com/${images[0]}`} 
                        width="84" 
                        height="84" 
                        alt={item.id} 
                        className="w-24 h-24 object-contain rounded-xl bg-[#77777720]"
                      />
                      <div className="flex flex-1 flex-col">
                        <h3 className="text-ellipsis">
                          {item[0].title}
                        </h3>
                        <span>x{cart[i].quantity}</span>
                      </div>

                      <div className="text-2xl text-right font-extrabold">
                          <span className="text-sm">$ </span>
                          <span className='align-bottom'>{`${selfPrice}`.split('.')[0]}</span>
                          <span className="text-[0px]">.</span>
                          <span className="text-sm">{`${selfPrice}`.split('.')[1]}</span>
                      </div>
                    </div>
                );
            }
            setTotalAmount(total);
            setCartElement(cartItems);
        }

        if (cart.length > 0) {
          loadAmountAndElement();
            setLoading(false);
        }
    }, [cart]);

    return (
        <main className="max-w-6xl mx-auto p-10 m-10">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>
              <div className="flex flex-col">
                {cartElement}
              </div>
              <h3 className="mt-12 flex text-2xl">
                Total:
                <div className="flex-1 text-right">
                  {totalAmount == 0 && "Calculating payment..."}
                  {totalAmount !== 0 && (
                    <div className="text-2xl text-right font-extrabold">
                        <span className="text-sm">$ </span>
                        <span className='align-bottom'>{`${totalAmount}`.split('.')[0]}</span>
                        <span className="text-[0px]">.</span>
                        <span className="text-sm">{`${totalAmount}`.split('.')[1]}</span>
                    </div>
                  )}
                </div>
              </h3>
            </div>

            {totalAmount > 0 && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(totalAmount),
                        currency: "usd",
                    }}
                >
                    <CheckoutPage amount={totalAmount} cart={cart} />
                </Elements>
            )}
        </main>
    );
}
