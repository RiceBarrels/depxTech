"use server"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card"

export default async function gpuSell({params}) {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();
    console.log(params);
    console.log()
    return (
        <div className="text-center mt-8 flex justify-center">
            <Card className="w-[95vw]">
                <CardContent className="p-4">
                    <h2>{[params.gpu]} {[params.brand]} {data.GPU[params.gpu][params.series.replace('%20',' ')][params.model].name}</h2>
                    <h1 className="mt-6">${Math.round(data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]*90/100*100)/100} + ${Math.round(data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]*10/100*100)/100}</h1>
                    <h2 className="mt-6">Get it Now For:</h2>
                    <h1 className="text-6xl">${data.GPU[params.gpu][params.series.replace('%20',' ')][params.model][params.condition.toLowerCase().replace('%20',' ')]}.00</h1>
                    <small>(In USD)</small>
                    <br/><br/><br/>
                    <Button>Trade In</Button>
                </CardContent>
            </Card>
            
        </div>
    )
}