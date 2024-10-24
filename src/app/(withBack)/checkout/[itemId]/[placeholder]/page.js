"use client"
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from 'react'
import Image from "next/image";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout({params}) {
    const cart = [{itemId: params.itemId, quantity: 1}];
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartElement, setCartElement] = useState(<div>Loading...</div>);
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function loadAmountAndElement() {
            let total = 0;
            let cartItems = [];
            let des = "";
            
            for (let i = 0; i < cart.length; i++) {
                try {
                    const response = await fetch(`https://api.depxtech.com/read?filter_id=${cart[i].itemId}`);
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        const item = data[0];
                        const images = item.imgs ? JSON.parse(item.imgs) : [];
                        const selfPrice = Math.round(item.price * parseInt(cart[i].quantity) * 100) / 100;
                        total += selfPrice;
                        des += `* ${item.title} x${cart[i].quantity}\n`;
                        
                        cartItems.push(
                            <div key={i} className="flex items-center mb-2 gap-x-3">
                                <Image 
                                    src={`https://src.depxtech.com/${images[0] || ''}`} 
                                    width="84" 
                                    height="84" 
                                    alt={item.id} 
                                    className="w-24 h-24 object-contain rounded-xl bg-[#77777720]"
                                />
                                <div className="flex flex-1 flex-col">
                                    <h3 className="text-ellipsis">
                                        {item.title}
                                    </h3>
                                    <span>x{cart[i].quantity}</span>
                                </div>
                                <div className="text-2xl text-right font-extrabold">
                                    <span className="text-sm">$ </span>
                                    <span className='align-bottom'>{`${selfPrice}`.split('.')[0]}</span>
                                    <span className="text-[0px]">.</span>
                                    <span className="text-sm">{`${selfPrice}`.split('.')[1]}</span>
                                </div>
                            </div>
                        );
                    }
                } catch (error) {
                    console.error("Error fetching item data:", error);
                }
            }
            
            setTotalAmount(total);
            setCartElement(cartItems);
            setDescription(`Items:\n\n${des}`);
            setLoading(false);
        }

        if (cart.length > 0) {
            loadAmountAndElement();
        }
    }, [cart]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-6xl mx-auto p-10 m-10">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>
                <div className="flex flex-col">
                    {cartElement}
                </div>
                <h3 className="mt-12 flex text-2xl">
                    Total:
                    <div className="flex-1 text-right">
                        {totalAmount === 0 ? "Calculating payment..." : (
                            <div className="text-2xl text-right font-extrabold">
                                <span className="text-sm">$ </span>
                                <span className='align-bottom'>{`${totalAmount}`.split('.')[0]}</span>
                                <span className="text-[0px]">.</span>
                                <span className="text-sm">{`${totalAmount}`.split('.')[1]}</span>
                            </div>
                        )}
                    </div>
                </h3>
            </div>

            {totalAmount > 0 && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(totalAmount),
                        currency: "usd",
                    }}
                >
                    <CheckoutPage amount={totalAmount} cart={cart} description={description} />
                </Elements>
            )}
        </main>
    );
}