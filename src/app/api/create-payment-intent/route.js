import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, cart } = await request.json();

    // Validate the amount and cart
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount. Amount must be greater than 0." },
        { status: 400 }
      );
    }

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Invalid cart. Cart must be a non-empty array." },
        { status: 400 }
      );
    }

    // Calculate the total amount from the cart
    let calculatedAmount = 0;
    for (let i = 0; i < cart.length; i++) {
      const response = await fetch(`https://api.depxtech.com/read?filter_id=${cart[i].itemId}`);
      const itemPrice = await response.json();
      calculatedAmount += Math.round(itemPrice[0].price * parseInt(cart[i].quantity) * 100) / 100;
    }

    // Convert to subcurrency (e.g., cents for USD)
    const subcurrencyAmount = Math.round(calculatedAmount * 100);

    // Check if the provided amount matches the calculated amount
    if (amount !== subcurrencyAmount) {
      return NextResponse.json(
        { error: "Amount mismatch. Please check the cart and amount." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: subcurrencyAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
