import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { OrderReceiptEmail } from '@/components/OrderReceiptEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { payment_intent } = await request.json();
    
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    
    if (!paymentIntent) {
      return NextResponse.json(
        { error: "Payment intent not found" },
        { status: 404 }
      );
    }

    const orderDetails = JSON.parse(paymentIntent.metadata.order_details);
    
    console.log('Order details:', orderDetails);
    console.log('Shipping details:', orderDetails.shipping_address);
    console.log('Customer email:', orderDetails.shipping_address.email);
    
    // Fetch item details for each item in the cart
    const itemsWithDetails = await Promise.all(
      orderDetails.items.map(async (item) => {
        const response = await fetch(
          `https://api.depxtech.com/read?filter_id=${item.itemId}`
        );
        const itemData = await response.json();
        return {
          ...item,
          title: itemData[0].title,
          price: itemData[0].price,
          image: itemData[0].imgs ? JSON.parse(itemData[0].imgs)[0] : null
        };
      })
    );

    const completeOrderDetails = {
      ...orderDetails,
      items: itemsWithDetails,
      payment_intent_id: payment_intent,
      created_at: new Date().toISOString()
    };

    // Send order confirmation emails
    try {
      if (orderDetails.shipping_address.email) {
        await resend.emails.send({
          from: 'DepxTech <orders@depxtech.com>',
          to: orderDetails.shipping_address.email,
          subject: 'Order Confirmation - DepxTech',
          react: OrderReceiptEmail({ 
            orderDetails: completeOrderDetails,
            userEmail: orderDetails.shipping_address.email
          })
        });

        await resend.emails.send({
          from: 'DepxTech <orders@depxtech.com>',
          to: 'support@depxtech.com',
          subject: `New Order - ${payment_intent}`,
          react: OrderReceiptEmail({ 
            orderDetails: completeOrderDetails,
            userEmail: orderDetails.shipping_address.email
          })
        });
      } else {
        console.error('No customer email found in order details');
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue with the order process even if email fails
    }
    
    return NextResponse.json({ orderDetails: completeOrderDetails });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 