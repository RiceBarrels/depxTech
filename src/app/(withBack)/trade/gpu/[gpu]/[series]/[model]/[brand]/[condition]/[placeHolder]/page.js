"use server"
import GpuTradeInCard from "@/components/client/GpuTradeInCard"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function gpuSell({params}) {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();
    const user = await currentUser();
    let serializedUser = null;
    
    try {
        const series = params.series.replace('%20',' ');
        const condition = params.condition.toLowerCase().replace('%20',' ');
        
        // Find the correct model in the array
        const seriesArray = data.GPU?.[params.gpu]?.[series] || [];
        const modelData = seriesArray.find(item => item.name === decodeURIComponent(params.model));
        const price = modelData?.[condition] || 0;
        
        const gpuDetails = {
            gpu: params.gpu,
            brand: params.brand,
            series: series,
            model: modelData?.name || 'Unknown Model',
            modelId: params.model,
            condition: condition,
            price: price,
            placeHolder: params.placeHolder
        };

        const pricing = {
            totalPrice: price,
            deposit: Math.round(price * 0.1 * 100) / 100,
            remaining: Math.round(price * 0.9 * 100) / 100
        };

        if (user) {
            serializedUser = {
                firstName: user.firstName,
                emailAddresses: [{ emailAddress: user.emailAddresses[0].emailAddress }]
            };
        }

        return (
            <GpuTradeInCard 
                gpuDetails={gpuDetails} 
                user={serializedUser} 
                pricing={pricing} 
            />
        );
    } catch (error) {
        console.error('Error processing GPU details:', error);
        return <div>Error loading GPU details. Please try again later.</div>;
    }
}
