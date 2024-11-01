import { createClerkSupabaseClient } from '@/components/client/createClerkSupabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request) {
  // Wait for headers to be ready
  await headers();
  
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { orderDetails } = await request.json();
    const client = createClerkSupabaseClient();
    
    // Get existing orders and cart
    const { data, error: fetchError } = await client
      .from('userdata')
      .select('orders, cart')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // Insert new user if not exists
        const { error: insertError } = await client
          .from('userdata')
          .insert({ 
            user_id: userId, 
            orders: [orderDetails],
            cart: [] 
          });

        if (insertError) {
          throw insertError;
        }
      } else {
        throw fetchError;
      }
    } else {
      // Check for duplicate order
      const existingOrders = data.orders || [];
      const isDuplicate = existingOrders.some(
        order => order.payment_intent_id === orderDetails.payment_intent_id
      );

      if (isDuplicate) {
        return NextResponse.json(
          { error: 'Duplicate order' },
          { status: 400 }
        );
      }

      // Update existing user's orders and clear cart
      const { error: updateError } = await client
        .from('userdata')
        .update({ 
          orders: [...existingOrders, orderDetails],
          cart: [] 
        })
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing order:', error);
    return NextResponse.json(
      { error: 'Failed to store order' },
      { status: 500 }
    );
  }
} 