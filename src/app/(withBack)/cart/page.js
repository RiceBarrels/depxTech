"use server";

import Image from "next/image";
import getData from "@/components/server/getData";
import { FaShippingFast } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
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
import Link from "next/link";
import Recommends from "@/components/server/recommends";

export default async function Cart() {
  let cartItems = [
    {
      "isItemCombo": false,
      "quantity": 2,
      "id": 4
    },
    {
      "isItemCombo": false,
      "quantity": 1,
      "id": 5
    }
  ];

  let totalPrice = 0;

  const itemsData = await Promise.all(
    cartItems.map(async (cartItem) => {
      const item = cartItem.id;
      const quantity = cartItem.quantity;
      const itemData = await getData(`https://api.depxtech.com/read?filter_id=${item}`);
      totalPrice += parseFloat(itemData[0].price) * quantity;
      return { ...itemData[0], quantity };
    })
  );

  return (
    <div className="">
      <div className="flex-1 space-y-2">
        {itemsData.map((itemData, i) => {
          const images = itemData.imgs ? JSON.parse(itemData.imgs) : [];
          return (
            <div key={i} className="flex flex-col space-y-2 m-3 p-3 background-card rounded-2xl">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={"https://src.depxtech.com/" + images[0]}
                    alt={itemData.title}
                    width={100}
                    height={100}
                  />
                  <h3 className="font-bold">{itemData.title}</h3>
                </div>
              </div>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="flex items-center space-x-3">
                    <FaShippingFast className="" size={24}/>
                    {/* display get it by (today + 3 to 4 business days in this format mmm dd - mmm dd) */}
                    <span className="text-sm font-bold">
                      Get it by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} for $0
                      <br />
                      <span className="text-sm font-normal">With Free Insurance by XCover</span>
                    </span>

                    <span className="flex flex-1 justify-end">
                      <IoMdInformationCircleOutline size={24}/>
                    </span>
                  </div>
                </DrawerTrigger>

                                
                  <DrawerContent className="h-[40dvh] border-[0.5px] border-[#88888850]">
                    <DrawerHeader className="flex">
                      <DrawerClose><GrClose className="active:bg-[#88888850]" size={24}/></DrawerClose>
                        <div className="flex-1">
                          <DrawerTitle>Shipping Policy</DrawerTitle>
                          <DrawerDescription>From FAQ page</DrawerDescription>
                        </div>
                      <GrClose className="opacity-0" size={24}/>
                    </DrawerHeader>

                    <p className="m-8">
                      Shipping dates and prices can change during the checkout process. Get final calculations at checkout.
                    </p>
                </DrawerContent>
              </Drawer>


              <div className="flex items-center space-x-4 py-2">
                <span className="text-sm">Quantity: {itemData.quantity}</span>
                <Drawer>
                  <DrawerTrigger asChild><span className="text-sm underline">Edit</span>
                  </DrawerTrigger>

                  <DrawerContent className="h-[70dvh] border-[0.5px] border-[#88888850]">
                    <DrawerHeader className="flex">
                      <DrawerClose><GrClose className="active:bg-[#88888850]" size={24}/></DrawerClose>
                        <div className="flex-1">
                          <DrawerTitle>Edit {itemData.title}</DrawerTitle>
                          <DrawerDescription>What you wanna change?</DrawerDescription>
                        </div>
                      <GrClose className="opacity-0" size={24}/>
                    </DrawerHeader>
                    
                  </DrawerContent>
                </Drawer>
                <span className="text-sm underline">Delete</span>
                <span className="flex-1 text-right text-sm font-bold">${parseFloat(itemData.price) * itemData.quantity}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="m-6 space-y-0.5 text-[#888888] text-sm">
        <div className="flex space-x-4">
          <span className="flex-1">Subtotal</span><span>${totalPrice}</span>
        </div>
        <div className="flex space-x-4">
          <span className="flex-1">Estimated Tax</span><span>$0.00</span>
        </div>
        <div className="flex space-x-4">
          <span className="flex-1">Shipping Fee</span><span>Free</span>
        </div>
        <div className="flex space-x-4 text-lg text-color font-black m-1 my-3">
          <span className="flex-1">Cart Total</span><span>${totalPrice}</span>
        </div>
        <div className="py-4">
          <button className="flex space-x-4 text-lg text-color button font-black w-full items-center justify-center p-2">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Recommends />
    </div>
  );
}
