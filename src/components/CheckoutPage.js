"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useUser } from '@clerk/nextjs'


const CheckoutPage = ({ amount,cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount), cart: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !isLoaded || !isSignedIn) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
        receipt_email: email,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const paymentElementOptions = {

  };

  const handleNextStep = async () => {
    const addressElement = elements.getElement('address');
  
    const {complete, value} = await addressElement.getValue();
  
    if (complete) {
      // Allow user to proceed to the next step
      // Optionally, use value to store the address details
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 rounded-md">
      <AddressElement 

        options={{
          mode: "shipping",
          autocomplete: {
            mode: "automatic",
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_SECRET,
          }
        }}
        onChange={(event) => {
          if (event.complete) {
            // Extract potentially complete address
            const address = event.value.address;
          }
        }} 
      />
      <label className="block text-gray-700 text-sm font-medium ml-1 mb-1 w-full text-left" htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="p-3 rounded-sm border-[1px solid] outline-2 text-[#000000] w-full mb-4"
      />
      {clientSecret && <PaymentElement options={paymentElementOptions} />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
