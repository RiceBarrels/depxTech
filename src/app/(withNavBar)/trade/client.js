"use client"
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
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf } from "lucide-react";

export default function Trade() {
  const whyTradeRef = useRef(null);
  const testimonialsRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  const environmentRef = useRef(null);

  const whyTradeInView = useInView(whyTradeRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const environmentInView = useInView(environmentRef, { once: true, margin: "-100px" });

  const tradableItems = (
    <motion.div 
      className="flex justify-center items-center flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TransitionLinkBackNav 
        href="trade/gpu" 
        className="background-card hover:bg-[#88888815] w-full p-4 rounded-xl border-[1px] border-[#88888840] hover:border-blue-500/50 transition-all flex items-center group"
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">GPU (Graphics Card)</h2>
          <p className="text-sm text-[#888888]">Trade in value up to $1,200</p>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-12 h-12 object-contain" src="./img/gputradein.png" alt="GPU"/>
          <IoIosArrowForward className="text-[#888888] group-hover:text-blue-500 transition-colors" />
        </div>
      </TransitionLinkBackNav>

      <TransitionLinkBackNav 
        href="trade/cpu" 
        className="background-card hover:bg-[#88888815] w-full p-4 rounded-xl border-[1px] border-[#88888840] hover:border-blue-500/50 transition-all flex items-center group"
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">CPU (Processor)</h2>
          <p className="text-sm text-[#888888]">Trade in value up to $300</p>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-12 h-12 object-contain" src="./img/cputradein.png" alt="CPU"/>
          <IoIosArrowForward className="text-[#888888] group-hover:text-blue-500 transition-colors" />
        </div>
      </TransitionLinkBackNav>

      <TransitionLinkBackNav 
        href="trade/ram" 
        className="background-card hover:bg-[#88888815] w-full p-4 rounded-xl border-[1px] border-[#88888840] hover:border-blue-500/50 transition-all flex items-center group"
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">RAM (Memory)</h2>
          <p className="text-sm text-[#888888]">Trade in value up to $30</p>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-12 h-12 object-contain" src="./img/ramtradein.png" alt="RAM"/>
          <IoIosArrowForward className="text-[#888888] group-hover:text-blue-500 transition-colors" />
        </div>
      </TransitionLinkBackNav>
    </motion.div>
  );

  const whyTradeWithUs = (
    <motion.div 
      ref={whyTradeRef}
      className="px-6 py-8 background-card my-6 rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={whyTradeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className="text-2xl md:text-4xl mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-bold">
        Why Trade With Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={whyTradeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-4 background-card rounded-xl border-[1px] border-[#88888840] hover:border-blue-500/50 transition-colors"
          >
            <h3 className="text-xl mb-2 font-semibold">Best Value Guaranteed</h3>
            <p className="text-[#888888]">We match or beat competitor prices. Get the most value for your PC components.</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const testimonials = (
    <motion.div 
      ref={testimonialsRef}
      className="px-6 py-8 background-card my-6 rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl md:text-4xl mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-bold">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            initials: "JD",
            name: "John Doe",
            item: "RTX 3080",
            review: "Got an amazing deal for my RTX 3080. The process was smooth and payment was quick!"
          },
          {
            initials: "SM",
            name: "Sarah Miller",
            item: "Ryzen CPU",
            review: "Excellent service! They offered more than other sites for my processor. Will definitely use again."
          },
          {
            initials: "RJ",
            name: "Robert Johnson",
            item: "RAM Kit",
            review: "Fast and efficient process. The shipping was free and I got paid within days."
          }
        ].map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={testimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 background-card rounded-xl border-[1px] border-[#88888840] hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                {testimonial.initials}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-[#888888]">Traded {testimonial.item}</p>
              </div>
            </div>
            <p className="text-[#888888]">"{testimonial.review}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const tradingProcess = (
    <motion.div 
      className="px-6 py-8 background-card my-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-4xl mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-bold">How It Works</h2>
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold mr-4">1</div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Get Your Quote</h3>
            <p className="text-[#888888]">Select your component and answer a few questions about its condition. Get an instant quote in minutes.</p>
          </div>
        </div>
        {/* Add steps 2-4 with similar structure */}
      </div>
    </motion.div>
  );

  const statsSection = (
    <motion.div 
      ref={statsRef}
      className="px-6 py-12 my-6 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl"
      initial={{ opacity: 0 }}
      animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">10K+</h3>
            <p className="text-[#888888]">Components Traded</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.div 
        className="w-full mx-auto h-[50vh] md:h-[65vh] overflow-hidden background-card rounded-b-xl relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Vortex
          backgroundColor="#00000000"
          className="w-full h-full"
        >
          <div className="flex flex-col w-full h-full justify-center items-center backdrop-blur-sm bg-gradient-to-b from-transparent to-black/10">
            <motion.h1 
              className="text-2xl md:text-6xl font-extrabold text-left px-6 pt-6 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Turn your <span className="bg-[#4257f590] px-1 rounded-md">PCs</span> in to <span className="bg-[#42f55a90] px-1 rounded-md">Cash</span>
            </motion.h1>

            <motion.p 
              className="text-sm md:text-2xl pt-3 md:pt-6 text-left pl-8 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Use your <span className="bg-[#4257f590] px-1 rounded-md">Trade-ins</span> and turn it in to <span className="bg-[#42f55a90] px-1 rounded-md">Cash</span>.<br/> Submit offer with in just <span className="bg-[#e342f590] px-1 rounded-md">3 mins.</span>
            </motion.p>

            <motion.div 
              className="flex justify-center items-center w-full flex-col sm:flex-row gap-4 mt-6 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
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
            </motion.div>
          </div>
        </Vortex>
      </motion.div>
     <motion.h1 
        className="text-2xl md:text-6xl m-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        id="#trade"
      >
        Trade anything from your PC.
      </motion.h1>
      {tradableItems}
      {whyTradeWithUs}
      {tradingProcess}
      {statsSection}
      {testimonials}
      
      {/* Add environmental impact section */}
      <motion.div 
        ref={environmentRef}
        className="px-6 py-8 background-card my-6 rounded-xl border-[1px] border-green-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={environmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <Leaf className="size-16 text-green-500 mb-4"/>
        <h2 className="text-2xl md:text-4xl mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-bold">Environmental Impact</h2>
        <p className="text-[#888888] mb-4">By trading in your components, you're helping reduce e-waste and supporting sustainable tech practices.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Add 3 more stat boxes */}
        </div>
      </motion.div>

     <div className="h-16"/>

     <div className="fixed bottom-[73px] left-0 w-full background-card h-16 flex justify-center items-center z-50 border-t-[0.5px] border-[#88888850] backdrop-blur-md">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="button w-[95%] h-14 text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:opacity-90 transition-opacity">Trade In</button>
          </DrawerTrigger>
          <DrawerContent className="h-[90dvh] border-t-2 border-blue-500/20">
            <DrawerHeader className="border-b border-[#88888820] px-6">
              <DrawerTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  Trade In Your Components
                </span>
              </DrawerTitle>
              <DrawerDescription className="text-[#888888] text-lg">
                Get instant quotes for your PC parts
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Average Payout", value: "$420" },
                    { label: "Trade-ins Total", value: "1254" },
                    { label: "Processing Time", value: "< 24h" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 rounded-xl border border-[#88888840] backdrop-blur-sm">
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#888888]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Available Options */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaBoxOpen className="text-blue-500" />
                    Available Trade-in Options
                  </h2>
                  <div className="space-y-3">
                    {tradableItems}
                  </div>
                </div>
              </div>
            </div>

            <DrawerFooter className="border-t border-[#88888820] px-6 pb-6 pt-4 gap-4">
              <DrawerClose asChild>
                <button className="button w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:opacity-90 transition-all rounded-xl font-semibold">
                  Close
                </button>
              </DrawerClose>
              <p className="text-center text-sm text-[#888888]">
                Need help? <a href="/support" className="text-blue-500 hover:underline">Contact Support</a>
              </p>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
     </div>
    </>
  );
}

