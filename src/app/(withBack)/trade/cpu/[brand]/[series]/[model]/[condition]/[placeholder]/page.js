import { currentUser } from '@clerk/nextjs/server'
import CpuTradeInCard from "@/components/client/CpuTradeInCard"

export default async function cpuSell({params}) {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();
    const user = await currentUser();
    let serializedUser = null;
    
    try {
        const series = params.series.replace('%20',' ');
        const condition = params.condition.toLowerCase();
        
        // Find the correct model in the array
        const seriesArray = data.CPU[params.brand][series] || [];
        const modelData = seriesArray[params.model];
        const price = modelData?.[condition.toLowerCase()] || 0;

        if (user) {
            serializedUser = {
                firstName: user.firstName,
                emailAddresses: [{ emailAddress: user.emailAddresses[0].emailAddress }]
            };
        }

        const cpuDetails = {
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

        return (
            <CpuTradeInCard 
                cpuDetails={cpuDetails} 
                user={serializedUser} 
                pricing={pricing} 
            />
        );
    } catch (error) {
        console.error('Error processing CPU details:', error);
        return <div>Error loading CPU details. Please try again later.</div>;
    }
} 