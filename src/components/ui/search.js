"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Search() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchFocus = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <div className="fixed top-[48px] w-[100vw] z-[102]">
        <div className="background-card rounded-b-3xl p-2 pt-0 text-center w-full relative z-[102] border-[0.5px] border-[#88888850] border-t-0">
            <motion.input 
                placeholder="Search..." 
                animate={{ border: isSearchActive ? "1px solid var(--foreground-rgb)" : "1px solid #787878" }}
                transition={{ duration: 0.2, ease:"easeOut" }}
                onFocus={searchFocus} 
                onBlur={searchFocus} 
                style={{zIndex:102, width:"100%", background: "#00000000", borderRadius: "100px", border: "1px solid #787878", padding: "4px 12px 4px 12px"}} 
            />
        </div>
    
        <motion.div
            animate={{ top: isSearchActive ? "0px" : "-40vh" }}
            transition={{ duration: 0.3, ease:"easeOut" }}
            style={{ top: "-50vh", width: "100vw", height: "40vh", position: "fixed", zIndex: 101 }}
            className="w-full background-card rounded-b-xl"
        >

        </motion.div>

        <motion.div
            initial={{ backdropFilter: "blur(0)"}}
            animate={{ display: isSearchActive ? "block" : "none", backdropFilter: isSearchActive ? "blur(4px)" : "blur(0)" }}
            transition={{ duration: 0.25 }}
            style={{ top: 0, width: "100vw", height: "100vh", position: "fixed", zIndex: 100, opacity: 1}}
        >
        </motion.div>
    </div>
  );
}
