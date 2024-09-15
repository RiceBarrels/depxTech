"use client"

import { motion } from "framer-motion";


export default function loadingWithNav(){
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BackNav />
            <div className="content h-[calc(100vh-45px)]">
                
            </div>
        </motion.div>
    )
}