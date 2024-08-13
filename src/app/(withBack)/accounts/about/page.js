"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1}}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl tracking-tight text-transparent md:text-7xl"
      >
        <div>Build your PCs</div>the fun and easiest way
      </motion.h1>
      <motion.div
        style={{
          background: "#fff",
          boxShadow: "0px 0px 12px #fff,0px 0px 12px #fff,0px 0px 16px #fff",
          height: "2px",
          marginBottom: "14px",
          zIndex: 2
        }}
        initial={{ width: "0px", y: "0.01" }}
        whileInView={{ width: "100%", y: "0.01" }}
        transition={{
          delay: 1.3,
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
      <motion.p
        initial={{ rotate: -25, opacity: 0, y: 50, x: 100, scale: 0.75 }}
        whileInView={{ rotate: 0, opacity: 1, y: 0, x: 0, scale: 1 }}
        transition={{
          delay: 0,
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="text-center text-lg bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent"
      >
        "Choosen by you, created by us."
      </motion.p>
      <br/>
      <motion.p
        initial={{ rotate: 25, opacity: 0, y: 50, x: -100, scale: 0.75 }}
        whileInView={{rotate: 0, opacity: 1, y: 0, x: 0, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
          ease: "easeInOut"
        }}
        className="text-center text-lg bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent"
      >
        A platform that provides<br/> Hardware specifically for gamers.
      </motion.p>
    </LampContainer>
  );
}
