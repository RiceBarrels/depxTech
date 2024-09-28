"use client"

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  
  export default function Home() {
    const [cart, setCart] = useState([]);
    // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
    const { user } = useUser();
    // The `useSession()` hook will be used to get the Clerk session object
    const { session } = useSession();
    const amount = 0.99;
    const [loading, setLoading] = useState(true)
    const items = [];

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
    // Create a `client` object for accessing Supabase data using the Clerk token
    const client = createClerkSupabaseClient()
  
    // This `useEffect` will wait for the User object to be loaded before requesting
    // the cart for the logged in user
    useEffect(() => {
      if (!user) return
  
      async function loadCart() {
        setLoading(true);
        const { data, error } = await client
        .from('userdata')
        .select('cart');
        setLoading(false);

        if (!error) setCart(data);
        console.log(cart);
      }
  
      loadCart();
    }, [user])


  
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${amount}</span>
          </h2>
        </div>
  
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </main>
    );
  }