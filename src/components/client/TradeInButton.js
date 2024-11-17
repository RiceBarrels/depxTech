"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TradeInButton({ details, firstName, to, type = 'gpu', className }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const getTradeInPath = () => {
        switch(type.toLowerCase()) {
            case 'gpu':
                return `/trade/gpu/${details.gpu}/${details.series}/${details.modelId}/${details.brand}/${details.condition}/${details.placeHolder}/success`;
            case 'ram':
                return `/trade/ram/${details.ddr}/${details.speedId}/${details.size}/${details.brand}/${details.condition}/Sell-RAM/success`;
            case 'cpu':
                return `/trade/cpu/${details.brand}/${details.series}/${details.model}/${details.condition}/Sell-CPU/success`;
            default:
                throw new Error(`Unsupported trade-in type: ${type}`);
        }
    };

    const getSubject = () => {
        switch(type.toLowerCase()) {
            case 'gpu':
                return `New GPU Trade-In Request: ${details.gpu} ${details.brand}`;
            case 'ram':
                return `New RAM Trade-In Request: ${details.brand} ${details.ddr} ${details.speed || details.modelId}`;
            case 'cpu':
                return `New CPU Trade-In Request: ${details.brand} ${details.model}`;
            default:
                throw new Error(`Unsupported trade-in type: ${type}`);
        }
    };

    const handleTradeIn = async () => {
        setLoading(true);
        try {
            console.log('Sending trade-in details:', {
                subject: getSubject(),
                details,
                firstName,
                to,
                type
            });

            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: getSubject(),
                    details: details,
                    firstName: firstName,
                    to: to,
                    type: type
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send trade-in request: ${JSON.stringify(errorData)}`);
            }
            
            const placeHolder = details.placeHolder || `Sell-${type.toUpperCase()}`;
            
            router.push(getTradeInPath());
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to send trade-in request. Please try again. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Button disabled className={`cursor-not-allowed ${className}`}>
                <div className="flex items-center justify-center">
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                    <span className="ml-2">Processing...</span>
                </div>
            </Button>
        );
    }

    return (
        <Button 
            onClick={handleTradeIn} 
            className={className}
        >
            Trade In
        </Button>
    );
}
