import BottomNav from "@/components/ui/bottomNav";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";
import Footer from "@/components/server/footer";

export const metadata = {
  title: "DepxTech Custom PCs & Sell PC components",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection."
};

export default function withNavBar({children}){
    return (
        <>
            <div className="px-4 h-12 flex items-center relative z-[1002] bg-[var(--background-end-rgb)]">
                <h3>DepxTech</h3>
                <div className="flex-1"/>
                <TransitionLinkBackNav href="/cart"><MdOutlineShoppingBag size={24} /></TransitionLinkBackNav>
            </div>
            <div id="mainContant" className="flex align-center justify-center background-default">
                <div className="content h-[calc(100dvh-48.9px-1.5rem-3rem)] lg:max-w-[1200px]">
                    {children}
                    <Footer/>
                </div>
            </div>
            <BottomNav/>
        </>
    );
}