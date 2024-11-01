import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExpressCheckoutButton({ amount, cart }) {
  const stripe = useStripe();
  const router = useRouter();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !amount) {
      console.log('Stripe or amount not ready:', { stripe: !!stripe, amount });
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'DepxTech Order',
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
      requestPayerPhone: true,
      disableWallets: ['link'], // Only disable link payments
    });

    // Debug the payment request creation
    console.log('Payment request created');

    pr.canMakePayment().then(result => {
      console.log('canMakePayment result:', result);
      // Only enable if Apple Pay or Google Pay is available
      if (result && (result.applePay || result.googlePay)) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Math.round(amount * 100),
            cart: cart,
            shipping: {
              name: e.shippingAddress.recipient,
              address: {
                line1: e.shippingAddress.addressLine[0],
                line2: e.shippingAddress.addressLine[1] || '',
                city: e.shippingAddress.city,
                state: e.shippingAddress.region,
                postal_code: e.shippingAddress.postalCode,
                country: e.shippingAddress.country
              },
              phone: e.payerPhone
            },
            customer_email: e.payerEmail
          }),
        });

        const { clientSecret } = await response.json();

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
          },
        );

        if (error) {
          console.error('Payment confirmation error:', error);
          e.complete('fail');
        } else {
          e.complete('success');
          router.push(`/payment-success?payment_intent=${paymentIntent.id}`);
        }
      } catch (error) {
        console.error('Payment failed:', error);
        e.complete('fail');
      }
    });

  }, [stripe, amount, cart, router]);

  if (!paymentRequest) {
    return null;
  }

  return (
    <PaymentRequestButtonElement 
      options={{
        paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'default', // 'default' | 'donate' | 'buy'
            theme: 'dark', // 'dark' | 'light' | 'light-outline'
            height: '48px'
          }
        }
      }}
    />
  );
} 