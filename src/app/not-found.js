import BackNav from "@/components/ui/backNav";
import "@/components/backNavSettings.css"
import "@/app/globals.css"
import Link from "next/link";

export default function notFound(){
    return (
        <>
            <BackNav />
            <div className="content flex flex-col h-full w-full">
                <h1 className="text-5xl">404</h1>
                <h3>Page Not Found</h3>
                <Link className="background-card px-4 py-2 text-lg font-bold mt-3 rounded-2xl" href="/">Go Back to Home</Link>
            </div>
            
        </>
    );
}