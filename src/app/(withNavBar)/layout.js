import BottomNav from "@/components/ui/bottomNav";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";

export const metadata = {
  title: "DeepHuo Custom PCs",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection."
};

export default function withNavBar({children}){
    return (
        <>
            <div className="px-4 h-12 flex items-center relative z-[102]">
                <h3>DepxTech</h3>
                <div className="flex-1"/>
                <Link href="/cart"><MdOutlineShoppingBag size={24} /></Link>
            </div>
            <div className="content h-[calc(100dvh-48.9px-1.5rem-3rem)]">
                {children}
            </div>
            <BottomNav/>
        </>
    );
}