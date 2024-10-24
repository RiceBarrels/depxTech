import Image from "next/image";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";
import { Vortex } from "@/components/ui/vortex";
import { BiSolidCheckShield } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
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

import { IoIosArrowForward } from "react-icons/io";
import Support from "@/app/(withNavBar)/support/page";

export default function Trade() {
  const tradableItems = (
    <div className="flex justify-center items-center flex-col m-2 md:flex-row md:flex-wrap md:justify-start">
      <TransitionLinkBackNav href="trade/gpu" className="background-card display flex justify-center items-center h-16 w-full rounded-xl m-4 my-2 md:w-80">
        <div className="flex-1 m-2 ml-3">
          <h2 className="text-[0.9rem] font-bold">GPU (Graphics Card)</h2>
          <p className="text-[0.9rem] text-[#888888]">Up to $1200</p>
        </div>
        <img className="w-12 mr-2" src="./img/gputradein.png"/>
      </TransitionLinkBackNav>
      <TransitionLinkBackNav href="trade/cpu" className="background-card display flex justify-center items-center h-16 w-full rounded-xl m-4 my-2 md:w-80">
        <div className="flex-1 m-2 ml-3">
          <h2 className="text-[0.9rem] font-bold">CPU (Processor)</h2>
          <p className="text-[0.9rem] text-[#888888]">Up to $300</p>
        </div>
        <img className="w-12 mr-2" src="./img/cputradein.png"/>
      </TransitionLinkBackNav>
      <TransitionLinkBackNav href="trade/ram" className="background-card display flex justify-center items-center h-16 w-full rounded-xl m-4 my-2 md:w-80">
        <div className="flex-1 m-2 ml-3">
          <h2 className="text-[0.9rem] font-bold">RAM (Random Access Memory)</h2>
          <p className="text-[0.9rem] text-[#888888]">Up to $30</p>
        </div>
        <img className="w-12 mr-2" src="./img/ramtradein.png"/>
      </TransitionLinkBackNav>
    </div>
  );
  return (
    <>
      <div className="w-full mx-auto h-[50vh] md:h-[65vh] overflow-hidden background-card rounded-b-xl">
        <Vortex
          backgroundColor="#00000000"
          className="w-full h-full "
        >
          <div className="flex flex-col w-full h-full justify-center items-center">

            <h1 className="text-2xl md:text-6xl font-extrabold text-left px-6 pt-6 w-full">
              Turn your <span className="bg-[#4257f590] px-1 rounded-md">PCs</span> in to <span className="bg-[#42f55a90] px-1 rounded-md">Cash</span>
            </h1>
            <p className="text-sm md:text-2xl pt-3 md:pt-6 text-left pl-8 w-full">
              Use your <span className="bg-[#4257f590] px-1 rounded-md">Trade-ins</span> and turn it in to <span className="bg-[#42f55a90] px-1 rounded-md">Cash</span>.<br/> Submit offer with in just <span className="bg-[#e342f590] px-1 rounded-md">3 mins.</span>
            </p>
            <div className="flex justify-center items-center w-full flex-col sm:flex-row gap-4 mt-6 flex-1">
              <div className="flex justify-center items-center w-full px-4">
                <BiSolidCheckShield className="size-16 backdrop-blur-sm p-3.5 rounded-xl bg-[#88888825] border-[#88888840] border-[1px] mr-2" color="#00d9ff95"/>
                <div className="flex-1 size-16">
                  <h3>Get an Offer</h3>
                  <p className="leading-[1] text-sm">See an offer from an expert refurbisher in about 3 minutes.</p>
                </div>
              </div>
              <div className="flex justify-center items-center w-full px-4">
                <FaBoxOpen className="size-16 backdrop-blur-sm p-3.5 rounded-xl bg-[#88888825] border-[#88888840] border-[1px] mr-2" color="#96600290"/>
                <div className="flex-1 size-16">
                  <h3>Free Shipping</h3>
                  <p className="leading-[1] text-sm">Get a shipping box and shipping fee on your PC components for free.</p>
                </div>
              </div>
              <div className="flex justify-center items-center w-full px-4">
                <FaMoneyBillTransfer className="size-16 backdrop-blur-sm p-3.5 rounded-xl bg-[#88888825] border-[#88888840] border-[1px] mr-2" color="#49ff1790"/>
                <div className="flex-1 size-16">
                  <h3>Get Paid</h3>
                  <p className="leading-[1] text-sm">Receive a direct deposit with in 5 days.</p>
                </div>
              </div>
            </div>
          </div>
        </Vortex>
      </div>
     <h1 className="text-2xl md:text-6xl m-6" id="#trade">Trade anything from your PC.</h1>
      {tradableItems}
        <Drawer className="border-0">
          <DrawerTrigger asChild>
            <div className="p-6 px-7 border-y-[0.5px] border-[#88888850] my-6 flex items-center">
              FAQ / Support
              <div className="flex-1"/>
            <IoIosArrowForward size={14} />
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[90dvh] border-0">
            <DrawerHeader>
              <DrawerTitle>FAQ / Support</DrawerTitle>
              <DrawerDescription>Got a question? Let me find ya the cheat sheet!</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto">
              <Support />
            </div>

            <DrawerClose className="w-full">
              <button className="button-secondary button w-[95%] h-14 mb-2 text-lg">Close</button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
     <div className="h-16"/>


     <div className="fixed bottom-[63px] w-full background-card h-16 flex justify-center items-center z-50 border-t-[0.5px] border-[#88888850]">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="button w-[95%] h-14 text-lg">Trade In</button>
          </DrawerTrigger>
          <DrawerContent className="h-[90dvh]">
            <DrawerHeader>
              <DrawerTitle>Trade In</DrawerTitle>
              <DrawerDescription>Got an old trash tech? We will take it!</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto">
              <h2 className="m-2">What are you Trading?</h2>
                {tradableItems}
            </div>

            <DrawerClose className="w-full">
              <button className="button-secondary button w-[95%] h-14 mb-2 text-lg">Close</button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
     </div>
    </>
  );
}

