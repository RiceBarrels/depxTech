import { suppressHydrationWarnings } from '@/lib/suppressHydrationWarnings';
import ClientOnly from '@/components/client/ClientOnly';
import BottomNav from "@/components/ui/bottomNav";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";
import Footer from "@/components/server/footer";
import Link from "next/link";
import DepxTechLoading from "@/components/ui/depxtechLoading";

// Call the suppression function at the top level
suppressHydrationWarnings();

export const metadata = {
  title: "DepxTech Custom PCs & Sell PC components",
  description: "Unleash true power with less money. Whether you're a gamer, creator, or professional, we engineer your system to perfection."
};

export default function withNavBar({children, loading}){
    if (loading) return <DepxTechLoading />;
    
    return (
        <>
            <div className="px-4 h-12 flex items-center relative z-[1002] bg-[var(--background-end-rgb)]">
                <Link href="/"><h3>DepxTech</h3></Link>
                <div className="flex-1"/>
                <TransitionLinkBackNav href="/cart"><MdOutlineShoppingBag size={24} /></TransitionLinkBackNav>
            </div>
            <div id="mainContant" className="flex align-center justify-center background-default">
                <ClientOnly>
                    <div className="content h-[calc(100dvh-48.9px-1.5rem-3rem)] lg:max-w-[1200px]">
                        <div className="min-h-[calc(100dvh-48.9px-1.5rem-3rem)]">
                            {children}
                        </div>
                        <Footer/>
                    </div>
                </ClientOnly>
            </div>
            <BottomNav/>
        </>
    );
}

export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric);
    // Send to your analytics platform
  }
}
