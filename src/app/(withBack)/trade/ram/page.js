import Recommends from "@/components/server/recommends";
import RAMSelect from "@/components/client/RAMSelect";

export const metadata = {
    title: 'RAM Trade In',
    description: 'Trade in your RAM',
}

export default async function ramtrade() {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();

    return (
        <>
            <RAMSelect data={data} />
        </>
    );
}
