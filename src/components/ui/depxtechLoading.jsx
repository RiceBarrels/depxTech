"use client"
import { motion } from "framer-motion"
export default function DepxtechLoading(){
    return (
        <div className="flex justify-center items-center h-screen">
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.h1 
                    className="text-4xl font-extrabold"
                    animate={{
                        color: ['#3B82F6', '#60A5FA', '#93C5FD', '#3B82F6'],
                        textShadow: [
                            '0 0 7px #3B82F6',
                            '0 0 10px #60A5FA',
                            '0 0 21px #93C5FD',
                            '0 0 42px #3B82F6',
                            '0 0 82px #3B82F6',
                            '0 0 92px #3B82F6',
                            '0 0 102px #3B82F6',
                            '0 0 151px #3B82F6',
                        ],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    DepxTech
                </motion.h1>
            </motion.div>
        </div>
    );
}