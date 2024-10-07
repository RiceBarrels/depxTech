"use server"
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

async function getData() {
    const res = await fetch('https://api.depxtech.com/search?limit=50&filter_sellBySelf=1');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function Recommends() {  // Default value for items
    
    const items = await getData()
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
        <>
            <h3 className="ml-3 text-xl mt-8">Recommends</h3>
            <div className="flex flex-wrap w-full h-min-20 items-start mt-3">
                {!items || items.length === 0 ? (
                    loading
                ) : (
                    items.map((item) => {
                        // Parse the imgs field
                        const images = item.imgs ? JSON.parse(item.imgs) : [];

                        return (
                            // make the div bellow golden ratio
                            <Drawer key={item.id} className="">
                                <DrawerTrigger asChild>
                                    <div href={"products/" + item.id} className="flex flex-col bg-[var(--background-end-rgb)] rounded-xl m-1 w-[calc(50%-0.5rem)] min-h-72 md:w-[25%] space-y-2 justify-center items-center">
                                        {images.length === 0 ? (
                                            <Skeleton className="relative w-[100%] pb-[100%] rounded-xl" />
                                        ) : (
                                            <div className="relative w-[100%] pb-[100%]">
                                                <Image src={"https://src.depxtech.com/"+images[0]} width="500" height="500" alt={item.id} className="absolute top-0 left-0 w-full h-full object-contain rounded-xl" />
                                            </div>
                                        )}
                                        <div className="space-y-1 p-1 w-full">
                                            <p className="text-md h-12 space-y-1 ml-0.5 overflow-hidden line-clamp-2 whitespace-normal text-ellipsis">{item.title}</p>
                                            <div className="text-lg text-right font-extrabold">
                                                <span className="text-sm font-bold align-top">$ </span>
                                                {item.price}
                                            </div>
                                        </div>
                                    </div>
                                </DrawerTrigger>
                                
                                <DrawerContent className="h-[95dvh] border-[0.5px] border-[#88888850] z-[1003]">
                                    <DrawerHeader className="flex">
                                        <DrawerClose ><GrClose className="active:bg-[#88888850]" size={24}/></DrawerClose>
                                        <div className="flex-1">
                                            <DrawerTitle>{item.title}</DrawerTitle>
                                            <DrawerDescription>Let me see this item in the database...</DrawerDescription>
                                        </div>
                                        <Link href={"./products/" + item.id} className="flex justify-center items-center"><Maximize className="active:bg-[#88888850]" size={24} /></Link>
                                    </DrawerHeader>

                                    <div className="flex-1 flex-col flex overflow-y-scroll">
                                        {images.length === 0 ? (
                                            <Skeleton className="relative w-[100%] pb-[100%] rounded-xl" />
                                        ) : (
                                            <Carousel slideSize="100%" height="100vw" className="flex-1" loop withIndicators>
                                                {images.map((image) => {
                                                    return <CarouselSlide key={image}><Image src={"https://src.depxtech.com/"+image} width="500" height="500" alt={item.id} className="absolute top-0 left-0 w-full h-full object-contain rounded-xl" /></CarouselSlide>
                                                })}
                                            </Carousel>
                                        )}
                                        <div className="space-y-1 p-1 px-4 w-full select-text">
                                            <h3 className="">{item.title}</h3>
                                            <div className="text-sm">{item.available} available | {item.solds} sold</div>
                                            <div className="text-3xl text-right font-extrabold">
                                                <span className="text-sm align-top">$ </span>
                                                <span>{item.price.split('.')[0]}</span>
                                                <span className="text-[0px]">.</span>
                                                <span className="text-sm align-top">{item.price.split('.')[1]}</span>
                                            </div>
                                            <h3 className="">Description:</h3>
                                            <p className="">{item.des}</p>
                                        </div>
                                    </div>

                                    <DrawerFooter className="flex flex-row items-center border-t-[0.5px] border-t-[#88888850]">
                                        <AddItem item={item} images={images}/>
                                        <button className="flex-1 button py-2">Buy Now</button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        );
                    })
                )}
            </div>
        </>
    );
}
