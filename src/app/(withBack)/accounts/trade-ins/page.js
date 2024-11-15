"use client"

import { useEffect, useState } from 'react';
import { useUser, useSession } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { FaBox, FaBoxOpen, FaTruck, FaCheck } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function TradeIns() {
  const [tradeIns, setTradeIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            });

            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      },
    );
  }

  useEffect(() => {
    if (!user) return;

    async function loadTradeIns() {
      const client = createClerkSupabaseClient();
      const { data, error } = await client
        .from('userdata')
        .select('trade-in')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setTradeIns(data['trade-in'] || []);
      }
      setLoading(false);
    }

    loadTradeIns();
  }, [user, session]);

  const renderTradeIns = (status) => {
    const filteredTradeIns = status === 'all' 
      ? tradeIns 
      : tradeIns.filter(tradeIn => tradeIn.status === status);

    if (filteredTradeIns.length === 0) {
      return (
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
            {status === 'all' && <FaBox size={"10vh"} color="#777"/>}
            {status === 'shipping' && <FaBoxOpen size={"10vh"} color="#777"/>}
            {status === 'waiting' && <FaTruck size={"10vh"} color="#777"/>}
            {status === 'completed' && <FaCheck size={"10vh"} color="#777"/>}
            <p className="text-lg ml-3 text-center flex-1">
              No {status === 'all' ? '' : status} trade-ins found.
            </p>
          </div>
        </motion.div>
      );
    }

    return filteredTradeIns.map((tradeIn, index) => (
      <motion.div 
        key={tradeIn.id}
        className="background-card p-4 rounded-xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.1
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Trade-In ID: {tradeIn.id}</p>
            <p className="text-sm text-gray-500">
              {new Date(tradeIn.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-xl font-bold text-primary">
            ${tradeIn.price}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{tradeIn.gpu} {tradeIn.brand}</h3>
              <p className="text-base opacity-80">{tradeIn.gpuName}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {tradeIn.condition} Condition
                </span>
                <span className="text-sm text-gray-500">
                  Status: {tradeIn.status}
                </span>
              </div>
            </div>
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <FaBox size={32} className="text-gray-400" />
            </div>
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 background-card rounded-none rounded-b-xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderTradeIns('all')}</TabsContent>
        <TabsContent value="shipping">{renderTradeIns('shipping')}</TabsContent>
        <TabsContent value="waiting">{renderTradeIns('waiting')}</TabsContent>
        <TabsContent value="completed">{renderTradeIns('completed')}</TabsContent>
      </Tabs>
    </>
  );
}
