"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TradeInButton({ gpuDetails, firstName, to }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleTradeIn = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: `New GPU Trade-In Request: ${gpuDetails.gpu} ${gpuDetails.brand}`,
                    gpuDetails: gpuDetails,
                    firstName: firstName,
                    to: to
                }),
            });

            if (!response.ok) throw new Error('Failed to send trade-in request');
            
            // Ensure placeHolder is defined, default to 'Sell-GPU' if not
            const placeHolder = gpuDetails.placeHolder || 'Sell-GPU';
            
            router.push(`/trade/gpu/${gpuDetails.gpu}/${gpuDetails.series}/${gpuDetails.modelId}/${gpuDetails.brand}/${gpuDetails.condition}/${placeHolder}/success`);
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to send trade-in request. Please try again. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Button disabled className="cursor-not-allowed">
                <div className="flex items-center justify-center">
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                    <span className="ml-2">Processing...</span>
                </div>
            </Button>
        );
    }

    return <Button onClick={handleTradeIn}>Trade In</Button>;
}
