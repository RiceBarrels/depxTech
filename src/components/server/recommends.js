"use client"
import "@/components/server/recommends.css";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { GrClose } from "react-icons/gr";
import { Maximize } from "lucide-react";
import '@mantine/carousel/styles.css';
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import AddItem from "../client/addItem";
import { TransitionLinkBackNav } from "../client/pageTransition";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Move getData outside component
async function getData() {
    const res = await fetch('https://api.depxtech.com/search?limit=50&filter_sellBySelf=1');
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

// Add animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.9,
        y: 20 
    },
    show: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.5
        }
    }
};

// Add a new function to generate blur data URL (you might want to move this to a utilities file)
function generateBlurDataURL() {
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/svg" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>`;
}

export default function Recommends() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData()
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const loading = (
        <>
            <div className="flex flex-col bg-[var(--background-end-rgb)] rounded-xl w-[188px] h-[260px] m-3 space-y-2">
                <Skeleton className="pt-[94%] w-[94%] rounded-xl" />
                <div className="space-y-1 mt-1 w-[94%] h-[22%]">
                    <div className="space-y-1 h-[69%]">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-4 w-[36%]" />
                </div>
            </div>
            <div className="flex flex-col bg-[var(--background-end-rgb)] rounded-xl w-[188px] h-[260px] m-3 space-y-2">
                <Skeleton className="pt-[94%] w-[94%] rounded-xl" />
                <div className="space-y-1 mt-1 w-[94%] h-[22%]">
                    <div className="space-y-1 h-[69%]">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-4 w-[36%]" />
                </div>
            </div>
            <div className="flex flex-col bg-[var(--background-end-rgb)] rounded-xl w-[188px] h-[260px] m-3 space-y-2">
                <Skeleton className="pt-[94%] w-[94%] rounded-xl" />
                <div className="space-y-1 mt-1 w-[94%] h-[22%]">
                    <div className="space-y-1 h-[69%]">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-4 w-[36%]" />
                </div>
            </div>
            <div className="flex flex-col bg-[var(--background-end-rgb)] rounded-xl w-[188px] h-[260px] m-3 space-y-2">
                <Skeleton className="pt-[94%] w-[94%] rounded-xl" />
                <div className="space-y-1 mt-1 w-[94%] h-[22%]">
                    <div className="space-y-1 h-[69%]">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-4 w-[36%]" />
                </div>
            </div>
        </>
    );

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            <motion.h3 
                className="ml-3 text-xl mt-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recommends
            </motion.h3>
            <div className="flex flex-wrap w-full h-min-20 items-start mt-3">
                {isLoading || !items || items.length === 0 ? (
                    loading
                ) : (
                    items.map((item) => {
                        // Parse the imgs field
                        const images = item.imgs ? JSON.parse(item.imgs) : [];

                        return (
                            <TransitionLinkBackNav 
                                key={item.id} 
                                href={"./products/" + item.title} 
                                prefetch={true} 
                                className="
                                    flex flex-col bg-[var(--background-end-rgb)] rounded-xl m-1 w-[calc(50%-0.5rem)] min-h-72 md:w-[25%] space-y-2 justify-center items-center
                                    hover:scale-105 active:scale-95 active:duration-100 transition-all duration-300
                                "
                            >
                                {images.length === 0 ? 
                                    (
                                        <Skeleton className="relative w-[100%] pb-[100%] rounded-xl" />
                                    ) : (
                                        <div className="relative w-[100%] pb-[100%]">
                                            <Image 
                                                src={`https://src.depxtech.com/${images[0]}`} 
                                                width={500} 
                                                height={500} 
                                                alt={item.title || 'Product image'}
                                                className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
                                                loading="lazy"
                                                placeholder="blur"
                                                blurDataURL={generateBlurDataURL()}
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                quality={60} // Lower initial quality
                                            />
                                        </div>
                                    )
                                }
                                <div className="space-y-1 p-1 w-full">
                                    <p className="text-md h-12 space-y-1 ml-0.5 overflow-hidden line-clamp-2 whitespace-normal text-ellipsis">{item.title}</p>
                                    <div className="text-lg text-right font-extrabold">
                                        <span className="text-sm font-bold align-top">$ </span>
                                        {item.price}
                                    </div>
                                </div>
                            </TransitionLinkBackNav>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}
