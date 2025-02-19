"use client";

import DepxtechLoading from '@/components/ui/depxtechLoading';
import { useSession, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { session } = useSession();

  useEffect(() => {
    if (!user) return;

    const client = createClient(
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
      }
    );

    async function loadCoupons() {
      setLoading(true);
      const { data, error } = await client
        .from('userdata')
        .select('coupons')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Insert the user if not found
        const { error: insertError } = await client
          .from('userdata')
          .insert({ user_id: user.id, coupons: [] });

        if (insertError) {
          console.error('Error inserting user:', insertError);
          setLoading(false);
          return;
        }

        setCoupons([]);
      } else if (!error && data) {
        setCoupons(data.coupons || []);
      }

      setLoading(false);
    }

    loadCoupons();
  }, [user, session]);

  if (!user) {
    return (
      <div>
        <h3>You are not logged in</h3>
        <Link href="/signIn?redirect_url=/accounts/coupons"><Button>Sign in</Button></Link>
      </div>
    );
  }

  if (loading) {
    return <div><DepxtechLoading /></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Coupons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon, index) => (
          <div 
            key={index}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{coupon.name}</h2>
            <p className="text-gray-600 mb-2">{coupon.des}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Code: {coupon.id}</span>
              <span className="text-sm text-gray-500">Quantity: {coupon.quantity}</span>
            </div>
          </div>
        ))}
        {coupons.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            You don't have any coupons yet.
          </div>
        )}
      </div>
    </div>
  );
}
