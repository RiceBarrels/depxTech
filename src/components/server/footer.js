"use client"
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer(){
    const footerRef = useRef(null);
    const cardsRef = useRef(null);
    const mobileRef = useRef(null);
    const copyrightRef = useRef(null);

    const isFooterInView = useInView(footerRef, { once: true });
    const isCardsInView = useInView(cardsRef, { once: true });
    const isMobileInView = useInView(mobileRef, { once: true });
    const isCopyrightInView = useInView(copyrightRef, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        hover: { 
            scale: 1.05,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    return (
        <motion.div 
            ref={footerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100 
            }}
            className="mt-12"
        >
            <Separator />
            <motion.div 
                ref={cardsRef}
                variants={containerVariants}
                initial="hidden"
                animate={isCardsInView ? "visible" : "hidden"}
                className="hidden sm:block columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4"
            >
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid"
                >
                    <h3 className="mb-3">About DepxTech</h3>
                    <Link href="about" className="block mb-1.5">About Us</Link>
                    <Link href="blog" className="block mb-1.5">Blog</Link>
                    <Link href="deephuo" className="block mb-1.5">WTH is DeepHuo?</Link>
                </motion.div>
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid"
                >
                    <h3 className="mb-3">Buying & Selling</h3>
                    <Link href="trade" className="block mb-2">Trade GPU</Link>
                    <Link href="trade" className="block mb-2">Trade CPU</Link>
                    <Link href="trade" className="block mb-2">Trade RAM</Link>
                    <Link href="/" className="block mb-2">Buy Something</Link>
                    <Link href="/refund-policy" className="block mb-2">Return Policy</Link>
                </motion.div>
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid"
                >
                    <h3 className="mb-3">Help</h3>
                    <Link href="help" className="block mb-2">Help Center</Link>
                    <Link href="support" className="block mb-2">Chat Now</Link>
                    <small className="block mb-2">Mon-Sun 8-22 EDT(NY)</small>
                    <small className="block mb-2">Email: support@depxtech.com</small>
                </motion.div>
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid"
                >
                    <h3 className="mb-3">Socials</h3>
                    <Link href="https://www.facebook.com/depxtech" className="block mb-2">Facebook</Link>
                    <Link href="https://www.instagram.com/depxtech" className="block mb-2">Instagram</Link>
                    <Link href="https://www.youtube.com/@depxtech" className="block mb-2">Youtube</Link>
                </motion.div>
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                    className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid"
                >
                    <h3 className="mb-3">Terms & Conditions & Privacy Policy</h3>
                    <Link href="/privacy-policy" className="block mb-2">Privacy Policy</Link>
                    <Link href="/terms-of-service" className="block mb-2">Terms of Service</Link>
                    <Link href="/refund-policy" className="block mb-2">Refund Policy</Link>
                    <Link href="/shipping-policy" className="block mb-2">Shipping Policy</Link>
                </motion.div>
            </motion.div>

            <div className="sm:hidden mx-4">
                <motion.div
                    ref={mobileRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isMobileInView ? { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }
                    } : { opacity: 0, x: -50 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>About DepxTech</AccordionTrigger>
                            <AccordionContent>
                                <Link href="about" className="block mb-1.5">About Us</Link>
                                <Link href="blog" className="block mb-1.5">Blog</Link>
                                <Link href="deephuo" className="block mb-1.5">WTH is DeepHuo?</Link>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Buying & Selling</AccordionTrigger>
                            <AccordionContent>
                                <Link href="trade" className="block mb-2">Trade GPU</Link>
                                <Link href="trade" className="block mb-2">Trade CPU</Link>
                                <Link href="trade" className="block mb-2">Trade RAM</Link>
                                <Link href="/" className="block mb-2">Buy Something</Link>
                                <Link href="/refund-policy" className="block mb-2">Return Policy</Link>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Help</AccordionTrigger>
                            <AccordionContent>
                                <Link href="help" className="block mb-2">Help Center</Link>
                                <Link href="support" className="block mb-2">Chat Now</Link>
                                <small className="block mb-2">Mon-Sun 8-22 EDT(NY)</small>
                                <small className="block mb-2">Email: support@depxtech.com</small>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Socials</AccordionTrigger>
                            <AccordionContent>
                                <Link href="https://www.facebook.com/depxtech" className="block mb-2">Facebook</Link>
                                <Link href="https://www.instagram.com/depxtech" className="block mb-2">Instagram</Link>
                                <Link href="https://www.youtube.com/@depxtech" className="block mb-2">Youtube</Link>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Terms & Conditions & Privacy Policy</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/privacy-policy" className="block mb-2">Privacy Policy</Link>
                                <Link href="/terms-of-service" className="block mb-2">Terms of Service</Link>
                                <Link href="/refund-policy" className="block mb-2">Refund Policy</Link>
                                <Link href="/shipping-policy" className="block mb-2">Shipping Policy</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </div>

            <motion.div 
                ref={copyrightRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isCopyrightInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        delay: 0.2
                    }
                } : { opacity: 0, y: 20 }}
                className="text-center p-4"
            >
                <small>Copyright © 2024 DepxTech. All rights reserved.</small>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center p-4"
            >
                <small>Powered by <Link href="https://www.depxtech.com">DepxTech</Link> Our Self</small>
            </motion.div>
            <div className="h-20"/>
        </motion.div>
    );
}
