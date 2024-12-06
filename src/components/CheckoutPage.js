"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import AddAddress from "./client/AddressElement";
import { FaCaretRight } from "react-icons/fa6";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { GrClose } from "react-icons/gr";
import { Button } from "./ui/button";
import { TransitionLinkBackNav } from "./client/pageTransition";
import { useRouter } from 'next/navigation';

const CheckoutForm = ({ stripe, elements, amount, cart }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = React.useState();
  const { isLoaded, isSignedIn, user } = useUser();
  const { session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isElementReady, setIsElementReady] = useState(false);
  const router = useRouter();

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

  // Load addresses for the logged-in user
  useEffect(() => {
      if (!user) return;

      async function loadAddresses() {
          setLoading(true);
          const { data, error } = await client
              .from('userdata')
              .select('address')
              .eq('user_id', user.id)
              .single();

          if (error && error.code === 'PGRST116') {
              // Redirect to address page if no addresses found
              router.push('/accounts/address');
              return;
          } else if (!error && data) {
              if (!data.address || data.address.length === 0) {
                  // Redirect if address array is empty
                  router.push('/accounts/address');
                  return;
              }
              setAddresses(data.address || []);
              let defaultFound = false;
              for(let i=0; i<data.address.length; i++) {
                  if(data.address[i].default) {
                      data.address[i].index = i;
                      setSelectedAddress(data.address[i]);
                      defaultFound = true;
                      break;
                  }
              }
              if (!defaultFound && data.address.length > 0) {
                  data.address[0].index = 0;
                  setSelectedAddress(data.address[0]);
              }
          }

          setLoading(false);
      }

      loadAddresses();
  }, [user, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (!selectedAddress || !email) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount: convertToSubcurrency(amount), 
        cart: cart,
        shipping: {
          name: `${selectedAddress.first_name} ${selectedAddress.last_name}`,
          address: {
            line1: selectedAddress.line1,
            line2: selectedAddress.line2 || '',
            city: selectedAddress.city,
            state: selectedAddress.state,
            postal_code: selectedAddress.postal_code,
            country: selectedAddress.country
          },
          phone: selectedAddress.phone_number
        },
        customer_email: email
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error creating payment intent:', data.error);
          return;
        }
        setClientSecret(data.clientSecret);
      });
  }, [amount, selectedAddress, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements || !isLoaded || !isSignedIn || !selectedAddress || !isElementReady || !clientSecret) {
        throw new Error("Required fields are missing");
      }

      // Submit the form first
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
          receipt_email: email
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentElement = () => {
    if (!stripe || !elements || !clientSecret) return null;

    return (
      <PaymentElement 
        onReady={() => {
          console.log('PaymentElement is ready');
          setIsElementReady(true);
        }}
        onDestroy={() => {
          console.log('PaymentElement was destroyed');
          setIsElementReady(false);
        }}
      />
    );
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
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    }
  };

  function setAddress(index){
    let updatedAddress = addresses[index];
    updatedAddress.index = index;
    setSelectedAddress(updatedAddress);
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 rounded-md">
      {addresses.length === 0 && selectedAddress === null && <AddAddress className="w-full"/>}
      {addresses.length != 0 && selectedAddress != null && 
        <Drawer className="">
          <DrawerTrigger asChild>
            <div className='rounded-xl flex background-card p-3 w-full mb-4'>
              <div className="flex-1">
                <h3>{selectedAddress.first_name} {selectedAddress.last_name} <small className='font-normal mx-3'>{selectedAddress.phone_number}</small></h3>
                {selectedAddress.line1}, {selectedAddress.line2} <br />{selectedAddress.city}, {selectedAddress.state} {selectedAddress.postal_code}, {selectedAddress.country}
              </div>
              <div className="flex justify-center items-center">
                <FaCaretRight />
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[80dvh]">
            <DrawerHeader className="flex">
                <DrawerClose><GrClose className="active:bg-[#88888850]" size={24} /></DrawerClose>
                <div className="flex-1">
                    <DrawerTitle>Select Address</DrawerTitle>
                    <DrawerDescription>Select an address from the database.</DrawerDescription>
                </div>
                <div className='size-6'></div>
            </DrawerHeader>
            <div className="flex flex-col h-full">
              <div className="flex flex-col flex-1">
                {addresses.map((address, index) => (
                  <DrawerClose className="text-left" key={index} onClick={() => setAddress(index)}>
                    <div className={'rounded-xl flex bg-[#88888805] p-3 mb-4 m-2 cursor-pointer ' + (index === selectedAddress.index && 'border-4 border-blue-700')}>
                      <div className="flex-1">
                        <h3>{address.first_name} {address.last_name} <small className='font-normal mx-3'>{address.phone_number}</small></h3>
                        {address.line1}, {address.line2} <br />{address.city}, {address.state} {address.postal_code}, {address.country}
                      </div>
                    </div>
                  </DrawerClose>
                ))}
              </div>
              <div className="flex justify-end">
                <TransitionLinkBackNav className="flex-1 m-2 mb-4" href="../accounts/address"><Button className="w-full">Edit Addresses / Add Address</Button></TransitionLinkBackNav>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      }
      <label className="block text-gray-700 text-sm font-medium ml-1 mb-1 w-full text-left" htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="p-3 rounded-sm border-[1px solid] outline-2 text-[#000000] w-full mb-4"
      />

      <PaymentElement 
        id="payment-element"
        options={paymentElementOptions} 
        onReady={() => setIsElementReady(true)}
        onDestroy={() => setIsElementReady(false)}
      />

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      <Button
        disabled={!stripe || !elements || !clientSecret || loading || addresses.length === 0 || !isElementReady}
        className="w-full mt-10 relative"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent" />
          </div>
        )}
        <span className={loading ? 'opacity-0' : ''}>
          {addresses.length !== 0 ? `Pay $${amount}` : "Please Enter a Shipping Address"}
        </span>
      </Button>
    </form>
  );
};

const CheckoutPage = (props) => {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm 
          stripe={stripe} 
          elements={elements} 
          {...props}
        />
      )}
    </ElementsConsumer>
  );
};

export default CheckoutPage;
