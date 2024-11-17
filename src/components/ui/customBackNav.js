"use client"
import "@/components/backNav.css"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";

export default function CustomBackNav({children}){
    const router = useRouter();

    return (
        <div className="background-default w-[calc(100vw)]">
            <div className="backNav rounded-b-xl">
                {/* back button */}
                <button className="flex justify-center items-center px-2" onClick={() => router.back()}>
                    <IoIosArrowBack size={24} /> Back
                </button>
                <motion.div 
                    className="flex justify-center text-left flex-1 truncate px-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    {/* display the page name using navigation */}
                    {children}
                </motion.div>
                <div className="w-[70px]" />
            </div>
        </div>
    );
}