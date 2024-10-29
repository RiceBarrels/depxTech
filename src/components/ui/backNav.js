"use client"
import "@/components/backNav.css"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { motion } from "framer-motion";

export default function BackNav(){
    const router = useRouter();
    const pathname= usePathname();
    const [pageName, setPageName] = useState('');

    const handleNavigation = useCallback(() => {
        // Set the page name based on the current route
        const path = pathname;
        const name = path.split('/').pop();
        setPageName(name.charAt(0).toUpperCase() + name.slice(1));
    }, [pathname]);

    useEffect(() => {
        handleNavigation();
    }, [handleNavigation]);

    return (
        <div className="background-default">
            <div className="backNav rounded-b-xl">
                {/* back button */}
                <button className="flex justify-center items-center pl-2" onClick={() => router.back()}>
                    <IoIosArrowBack size={24} /> Back
                </button>
                <motion.div className="flex justify-center items-center flex-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    {/* display the page name using navigation */}
                    {pageName.replace('-'," ")}
                </motion.div>
                <div className="w-[70px]" />
            </div>
        </div>
    );
}