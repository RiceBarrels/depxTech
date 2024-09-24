"use client"

import { FaBox , FaBoxOpen , FaTruck , FaCalendarCheck } from "react-icons/fa";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Recommends from "@/components/server/recommends";
import { motion } from "framer-motion";

export default function order() {

  let all = (
    <motion.div className="flex flex-col my-10 w-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex px-10 w-full">
        <FaBox size={"10vh"} color="#777"/>
        <p className="text-lg ml-3 text-center flex-1">You don&apos;t have any order.</p>
      </div>
    </motion.div>
  );

  let prepareing = (
    <motion.div className="flex flex-col my-10 w-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex px-10 w-full">
        <FaBoxOpen size={"10vh"} color="#777"/>
        <p className="text-lg ml-3 text-center flex-1">There is no prepareing order.</p>
      </div>
    </motion.div>
  );

  let shipped = (
    <motion.div className="flex flex-col my-10 w-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex px-10 w-full">
        <FaTruck size={"10vh"} color="#777"/>
        <p className="text-lg ml-3 text-center flex-1">There is no order being shipped.</p>
      </div>
    </motion.div>
  );

  let arived = (
    <motion.div className="flex flex-col my-10 w-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex px-10 w-full">
        <FaCalendarCheck size={"10vh"} color="#777"/>
        <p className="text-lg ml-3 text-center flex-1">You don&apos;t have any order arived.</p>
      </div>
    </motion.div>
  );

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 background-card rounded-none rounded-b-xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="prepareing">Prepareing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="arived">Arived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{all}</TabsContent>
        <TabsContent value="prepareing">{prepareing}</TabsContent>
        <TabsContent value="shipped">{shipped}</TabsContent>
        <TabsContent value="arived">{arived}</TabsContent>
      </Tabs>
      {/* <Recommends /> */}
      {/* this is a server component */}
    </>
  );
}

