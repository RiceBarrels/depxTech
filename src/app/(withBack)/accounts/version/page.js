"use client";
import { motion } from "framer-motion";
import { FaDivide } from "react-icons/fa";
import { Box } from "@mui/material";
import { useRouter } from 'next/navigation'

export default function version() {
  const router = useRouter();


  return (
    <>
      
      <div className="flex justify-center items-center h-full">
        <motion.div
          className="background-card rounded-xl text-center p-4"
          style={{ width: "328px"}}
          initial={{ rotate: 90, scale: 0, boxShadow: "0 0 0px var(--primaryColor)" }}
          animate={{ rotate: 0, scale: 1, boxShadow: "0 0 128px var(--primaryColor)" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <h2>App Version</h2>
          <br/>
          <div>
            Version 0.0.1 (Beta)
            <br/>
            Next.js Version 14.2.5
            <hr className="m-3"/>
            Copyright © 2024 DeepHuo.com. All rights reserved.
            <hr className="mt-3"/>
            <button className="pt-3 w-full cursor-pointer" onClick={() => router.back()}>
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
