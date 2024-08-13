import BottomNav from "@/components/ui/bottomNav";

export const metadata = {
  title: "DeepHuo Custom PCs",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection."
};

export default function withNavBar({children}){
    return (
        <>
            <div className="h-3 w-full background-card rounded-b-xl fixed top-0" />
            <div className="content">
                {children}
            </div>
            <BottomNav/>
        </>
    );
}