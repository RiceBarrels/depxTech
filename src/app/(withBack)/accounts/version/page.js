"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import pkg from '../../../../../package.json';

export default function Version() {
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
            <b>Version</b> {pkg.version}
            <br/>
            <b>Next.js</b> {pkg.dependencies.next}
            <hr className="m-3"/>
            <b>Copyright</b> © 2024 DepxTech.com. All rights reserved.
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
