'use client'

import { Card, CardContent } from "@/components/ui/card"
import TradeInButton from "@/components/client/TradeInButton"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CpuTradeInCard = ({ cpuDetails, user, pricing }) => {
    const { totalPrice, deposit, remaining } = pricing

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
                <Card className="mx-auto shadow-xl dark:bg-gray-800/50 backdrop-blur-sm border border-black/10 dark:border-white/10 overflow-hidden">
                    {/* Header Banner - Added wave effect */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0,
                            background: [
                                "linear-gradient(45deg, var(--primary) 0%, transparent 100%)",
                                "linear-gradient(45deg, transparent 0%, var(--primary) 100%)",
                                "linear-gradient(45deg, var(--primary) 0%, transparent 100%)",
                            ]
                        }}
                        transition={{ 
                            delay: 0.2, 
                            duration: 3,
                            background: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        className="p-6"
                    >
                        <h1 className="text-sm font-medium text-primary/80 uppercase tracking-wider">
                            CPU Trade-In Offer
                        </h1>
                    </motion.div>

                    <CardContent className="p-8 space-y-10">
                        {/* CPU Details Section - Added floating effect */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, -10, 0] }}
                            transition={{ 
                                delay: 0.4, 
                                y: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="space-y-6 pb-8 border-b border-black/10 dark:border-white/10"
                        >
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {cpuDetails.brand} {cpuDetails.model}
                                </h2>
                                <h3 className="text-2xl opacity-75">
                                    {cpuDetails.series}
                                </h3>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
                                    <span className="capitalize">{cpuDetails.condition} Condition</span>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                        </motion.div>
                        
                        {/* Payment Details Grid - Enhanced hover effects */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="grid md:grid-cols-2 gap-6"
                        >
                            {/* Payment Breakdown - Added glow effect on hover */}
                            <motion.div 
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)"
                                }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="space-y-4 rounded-xl bg-black/5 dark:bg-white/5 p-6 border border-black/5 dark:border-white/5"
                            >
                                <h3 className="text-lg font-semibold flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Payment Breakdown</span>
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-black/10 dark:border-white/10">
                                        <span className="opacity-80">Regular Price</span>
                                        <span className="font-semibold text-lg">${remaining}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-80">Added Value (+10%)</span>
                                        <span className="font-semibold text-lg text-primary">${deposit}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Total Price Card - Enhanced gradient animation */}
                            <motion.div 
                                whileHover={{ 
                                    scale: 1.02,
                                    rotate: [0, 1, -1, 0],
                                }}
                                transition={{ 
                                    rotate: {
                                        duration: 0.3,
                                        repeat: 1
                                    }
                                }}
                                className="rounded-xl p-6 shadow-lg relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(45deg, #FFD700, #FDB931, #FFD700, #FFA500)',
                                    backgroundSize: '300% 300%',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }
                                }}
                            >
                                {/* Shimmer effect overlay */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{
                                        backgroundPosition: ['200% 0', '-200% 0'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />
                                
                                {/* Content with enhanced styling */}
                                <div className="relative">
                                    <h2 className="text-lg font-semibold text-white">Total Trade-In Value</h2>
                                    <div className="mt-4">
                                        <span className="text-5xl font-bold text-white drop-shadow-sm">
                                            ${totalPrice}
                                        </span>
                                        <span className="ml-2 text-sm text-white">USD</span>
                                    </div>
                                </div>

                                {/* Additional decorative elements */}
                                <motion.div
                                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Action Button - Added pulse effect */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="pt-6"
                        >
                            {user ? (
                                <TradeInButton 
                                    details={cpuDetails} 
                                    firstName={user.firstName} 
                                    to={user.emailAddresses[0].emailAddress}
                                    type="cpu"
                                    className="w-full bg-primary hover:bg-primary/90py-5 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                />
                            ) : (
                                <Link 
                                    href={`/signIn?redirect_url=${encodeURIComponent(
                                        `/trade/cpu/${cpuDetails.brand}/${cpuDetails.series}/${cpuDetails.modelId}/${cpuDetails.condition}/${cpuDetails.placeHolder}`
                                    )}`}
                                >
                                    <Button className="w-full bg-primary hover:bg-primary/90 py-5 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                        Sign in to Continue
                                    </Button>
                                </Link>
                            )}

                            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <motion.div 
                                    className="flex items-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.0, duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Secure transaction
                                </motion.div>
                                <motion.div 
                                    className="flex items-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Instant offer
                                </motion.div>
                                <motion.div 
                                    className="flex items-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4, duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    Free shipping
                                </motion.div>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default CpuTradeInCard 