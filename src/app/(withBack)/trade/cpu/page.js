import CPUSelect from "@/components/client/CPUSelect"

export const metadata = {
    title: 'CPU Trade In',
    description: 'Trade in your CPU',
}

export default async function cputrade() {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();

    return <CPUSelect data={data} />;
}
