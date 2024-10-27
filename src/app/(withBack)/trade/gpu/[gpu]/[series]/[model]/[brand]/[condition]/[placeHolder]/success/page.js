"use client"
import { Card, CardContent } from "@/components/ui/card"
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Success() {
    return (
        <div className="text-center mt-8 flex justify-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[95vw]">
                    <CardContent className="p-4 flex flex-col items-center">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Successfully Sent
                        </motion.h1>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5
                            }}
                        >
                            <FaCheck className="w-16 h-16 text-green-500 my-8" />
                        </motion.div>
                        <motion.p 
                            className="text-lg font-semibold mb-6"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Your trade-in request has been sent successfully!
                        </motion.p>
                        <motion.p
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            Please check your email for the confirmation.
                        </motion.p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}