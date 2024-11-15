import BackNav from "@/components/ui/backNav";
import "@/components/backNavSettings.css"
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "DepxTech Custom PCs",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection."
};

export default function withNavBar({children}){
    return (
        <div id="mainContant">
            <BackNav/>
            <div className="content h-[calc(100dvh-45px)]">
                {children}
                <Toaster />
            </div>
        </div>
    );
}