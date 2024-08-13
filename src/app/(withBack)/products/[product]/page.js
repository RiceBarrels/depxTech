// @/app/(withBack)/products/[product]/page.js
"use server"
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
async function getData(params) {
    const url = `https://api.deephuo.com/read?filter_id=${params.product}&limit=1`;
    const res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log("error: " + url)
    }
    return res.json();
}

export default async function ProductDetails({ params }) {
    try {
        const items = await getData(params);
        return (
            <>
                <div className="flex flex-wrap w-full h-min-20 items-start mt-3">
                    {!items || items.length === 0 ? (
                        loading
                    ) : (
                        items.map((item) => {
                            // Parse the imgs field
                            const images = item.imgs ? JSON.parse(item.imgs) : [];

                            return (
                                // make the div bellow golden ratio
                                <div href={"item/" + item.id} className="flex flex-col md:flex-row bg-[var(--background-end-rgb)] rounded-xl m-1 w-[calc(100%-0.5rem)] min-h-72 md:w-[100%] space-y-2 justify-center items-center">
                                    {images.length === 0 ? (
                                        <Skeleton className="relative w-[100%] pb-[100%] rounded-xl" />
                                    ) : (
                                        <div className="relative w-[100%] pb-[100%]">
                                            <img src={images[0]} alt={item.id} className="absolute top-0 left-0 w-full h-full object-contain rounded-xl" />
                                        </div>
                                    )}
                                    <div className="space-y-1 p-1 w-full">
                                        <h1 className="">{item.title}</h1>
                                        <p>{item.des}</p>
                                        <div className="text-lg text-right font-extrabold">
                                            <span className="text-sm font-bold align-top">$ </span>
                                            {item.price}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </>
        );
    } catch (error) {
        console.error(error);
        return <p>Failed to load product details.</p>;
    }
}

