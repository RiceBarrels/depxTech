'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser, useSession } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const { user } = useUser();
  const { session } = useSession();

  useEffect(() => {
    if (!user || !payment_intent || !session) {
      console.log('Missing required data:', { user: !!user, payment_intent: !!payment_intent, session: !!session });
      return;
    }

    async function storeOrder() {
      try {
        // First verify the payment and get order details
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_intent })
        });

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const { orderDetails } = await response.json();

        // Then store the order in Supabase
        const { error } = await fetch('/api/store-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderDetails })
        }).then(res => res.json());

        if (error) {
          throw new Error(error);
        }

        // Redirect to orders page
        router.push('/accounts/orders');
      } catch (error) {
        console.error('Error in payment process:', error);
        router.push('/error');
      }
    }

    storeOrder();
  }, [user, payment_intent, session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
