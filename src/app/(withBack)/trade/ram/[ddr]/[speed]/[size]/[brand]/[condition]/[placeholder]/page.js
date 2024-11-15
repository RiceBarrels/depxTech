"use server"
import RamTradeInCard from "@/components/client/RamTradeInCard"
import { currentUser } from '@clerk/nextjs/server'

export default async function ramSell({params}) {
    const [
        { ddr, size, speed, brand, condition: rawCondition, placeHolder },
        user
    ] = await Promise.all([
        params,
        currentUser()
    ]);
    
    const condition = rawCondition.toLowerCase().replace('%20',' ');
    let serializedUser = null;

    try {
        const response = await fetch('https://src.depxtech.com/json/trade-in');
        const data = await response.json();
        
        const ramData = data.RAM[ddr][size][speed];
        const price = ramData?.[condition] || 0;

        if (user) {
            serializedUser = {
                firstName: user.firstName,
                emailAddresses: [{ emailAddress: user.emailAddresses[0].emailAddress }]
            };
        }

        const ramDetails = {
            ddr,
            brand,
            speed: ramData.name,
            speedId: speed,
            size,
            condition,
            price,
            placeHolder
        };

        const pricing = {
            totalPrice: price,
            deposit: Math.round(price * 0.1 * 100) / 100,
            remaining: Math.round(price * 0.9 * 100) / 100
        };

        return (
            <RamTradeInCard 
                ramDetails={ramDetails} 
                user={serializedUser} 
                pricing={pricing} 
            />
        );
    } catch (error) {
        console.error('Error processing RAM details:', error);
        return <div>Error loading RAM details. Please try again later.</div>;
    }
}
