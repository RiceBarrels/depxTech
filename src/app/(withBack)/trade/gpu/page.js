import Recommends from "@/components/server/recommends";
import GPUSelect from "@/components/client/GPUSelect";

export default async function gputrade() {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();

    return (
        <>
            <GPUSelect data={data} />
        </>
    );
}
