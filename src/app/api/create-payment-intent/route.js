import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, cart, shipping, customer_email } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      shipping: shipping,
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_details: JSON.stringify({
          items: cart,
          shipping_address: {
            ...shipping.address,
            first_name: shipping.name.split(' ')[0],
            last_name: shipping.name.split(' ')[1] || '',
            phone: shipping.phone,
            email: customer_email
          },
          total_amount: amount / 100,
          status: 'preparing'
        })
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
