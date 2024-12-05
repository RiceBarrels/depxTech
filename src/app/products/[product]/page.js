// @/app/(withBack)/products/[product]/page.js
"use server"
import CustomBackNav from "@/components/ui/customBackNav";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AddItem from "@/components/client/addItem";
import { Button } from "@/components/ui/button"
import { TransitionLinkBackNav } from "@/components/client/pageTransition";
import Recommends from "@/components/server/recommends";

async function getData(productName) {
    const url = `https://api.DepxTech.com/read?filter_title=${productName}&limit=1`;
    const res = await fetch(url);
   
    if (!res.ok) {
      console.log("error: " + url);
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
}

// Add the blur data URL generator function
function generateBlurDataURL() {
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/svg" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>`;
}

export default async function ProductDetails({ params }) {
    try {
        const { product } = await params;
        const items = await getData(product);

        return (
            <div className="flex flex-col justify-between items-center background-default h-[calc(100vh)]">
                <CustomBackNav>{product.replaceAll('%20', ' ').replaceAll('%26', '&').replaceAll('%5B', '[').replaceAll('%5D', ']').replaceAll('%27', "'").replaceAll('%22', '"').replaceAll('%3A', ':').replaceAll('%2F', '/').replaceAll('%3F', '?')}</CustomBackNav>
                <div className="flex flex-wrap flex-1 w-full items-start my-3">
                    {!items || items.length === 0 ? (
                        loading
                    ) : (
                        items.map((item) => {
                            const images = item.imgs ? JSON.parse(item.imgs) : [];

                            return (
                                <div key={item.id} className="flex flex-col flex-1 min-h-72 max-h-[calc(100vh-77px)] overflow-y-scroll pb-16">
                                    <div className="flex flex-col rounded-xl md:flex md:gap-6 md:p-6 bg-[var(--background-end-rgb)] m-1 w-[calc(100%-0.5rem)] md:w-[100%] md:flex-row">
                                        {/* Left side - Images */}
                                        <div className="md:flex-1">
                                            {images.length === 0 ? (
                                                <Skeleton className="relative w-[100%] pb-[100%] rounded-xl aspect-square" />
                                            ) : (
                                                <Carousel className="w-full aspect-square">
                                                    <CarouselContent>
                                                        {images.map((image) => (
                                                            <CarouselItem key={image} className="relative aspect-square">
                                                                <Image 
                                                                    src={`https://src.depxtech.com/${image}`} 
                                                                    fill
                                                                    alt={item.title || 'Product image'} 
                                                                    className="object-contain rounded-xl" 
                                                                    placeholder="blur" 
                                                                    blurDataURL={generateBlurDataURL()} 
                                                                    sizes="(max-width: 768px) 100vw, 50vw" 
                                                                    quality={85} 
                                                                    priority
                                                                />
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    <CarouselPrevious className="left-4" />
                                                    <CarouselNext className="right-4" />
                                                </Carousel>
                                            )}
                                        </div>

                                        {/* Right side - Details */}
                                        <div className="space-y-4 pt-1 px-4 w-full select-text md:flex-1 flex flex-col">
                                            <h3 className="text-2xl font-bold">{item.title}</h3>
                                            <div className="text-sm">{item.available} available | {item.solds} sold</div>
                                            <div className="text-3xl text-right font-extrabold">
                                                <span className="text-sm align-top">$ </span>
                                                <span>{item.price.split('.')[0]}</span>
                                                <span className="text-[0px]">.</span>
                                                <span className="text-sm align-top">{item.price.split('.')[1]}</span>
                                            </div>

                                            <div className="hidden md:flex justify-center items-center w-full bottom-0 backdrop-blur-md py-2 px-2 l-0 translate-x-0 border-b-[0.5px] border-[#88888850]">
                                                <AddItem item={item} images={images} className="flex-1"/>
                                                {/* <TransitionLinkBackNav href={"/checkout/" + item.id + "/checkout"} className="flex-1 ml-4">
                                                    <Button className="button py-2 w-full">Buy Now</Button>
                                                </TransitionLinkBackNav> */}
                                            </div>

                                            <h3 className="font-semibold">Description:</h3>
                                            <p className="opacity-75 whitespace-pre-line">{item.des}</p>

                                            <div className="flex md:hidden justify-center items-start w-[calc(100vw-0.5rem)] fixed bg-[#88888820] bottom-[0dvh] backdrop-blur-md py-2 px-2 l-0 -translate-x-4 border-t-[0.5px] border-[#88888850] z-50">
                                                <AddItem item={item} images={images} className="flex-1"/>
                                                {/* <TransitionLinkBackNav href={"/checkout/" + item.id + "/checkout"} className="flex-1 ml-4">
                                                    <Button className="button py-2 w-full">Buy Now</Button>
                                                </TransitionLinkBackNav> */}
                                            </div>
                                        </div>
                                    </div>
                                    <Recommends />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        return <p>Failed to load product details.</p>;
    }
}
