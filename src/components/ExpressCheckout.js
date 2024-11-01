import { useStripe, useElements, PaymentRequestButton } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

export default function ExpressCheckout({ amount, cart, description }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'DepxTech Order',
        amount: amount * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
    });

    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100,
          cart: cart,
          shipping: {
            name: e.payerName,
            address: e.shippingAddress,
            phone: e.payerPhone
          },
          customer_email: e.payerEmail
        })
      });

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
          payment_method: e.paymentMethod.id,
        }
      });

      if (error) {
        e.complete('fail');
      } else {
        e.complete('success');
      }
    });

  }, [stripe, elements, amount, cart]);

  if (!paymentRequest) {
    return null;
  }

  return (
    <div className="mb-4">
      <PaymentRequestButton paymentRequest={paymentRequest} />
    </div>
  );
} 