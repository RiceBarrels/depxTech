"use server"
import { Card, CardContent } from "@/components/ui/card"
import TradeInButton from "@/components/client/TradeInButton";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function gpuSell({params}) {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in?redirect_url=' + encodeURIComponent('/trade/gpu/' + params.gpu + '/' + params.series + '/' + params.model + '/' + params.brand + '/' + params.condition + '/' + params.placeHolder));
    }
    
    const gpuDetails = {
        gpu: params.gpu,
        brand: params.brand,
        series: params.series.replace('%20',' '),
        model: data.GPU[params.gpu][params.series.replace('%20',' ')][params.model].name,
        modelId: params.model,
        condition: params.condition.toLowerCase().replace('%20',' '),
        price: data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')],
        placeHolder: params.placeHolder
    };

    return (
        <div className="text-center mt-8 flex justify-center">
            <Card className="w-[95vw]">
                <CardContent className="p-4">
                    <h2>{params.gpu} {params.brand} {data.GPU[params.gpu][params.series.replace('%20',' ')][params.model].name}</h2>
                    <h1 className="mt-6">${Math.round(data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]*90/100*100)/100} + ${Math.round(data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]*10/100*100)/100}</h1>
                    <h2 className="mt-6">Get it Now For:</h2>
                    <h1 className="text-6xl">${data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]}.00</h1>
                    <small>(In USD)</small>
                    <br/><br/><br/>
                    <TradeInButton gpuDetails={gpuDetails} firstName={user.firstName} to={user.emailAddresses[0].emailAddress} />
                </CardContent>
            </Card>
        </div>
    )
}
