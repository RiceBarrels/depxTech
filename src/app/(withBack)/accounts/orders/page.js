"use client"

import { useEffect, useState } from 'react';
import { useUser, useSession } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { FaBox, FaBoxOpen, FaTruck, FaCalendarCheck } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Orders() {
  const [orders, setOrders] = useState([]);
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

    async function loadOrders() {
      const client = createClerkSupabaseClient();
      const { data, error } = await client
        .from('userdata')
        .select('orders')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setOrders(data.orders || []);
      }
      setLoading(false);
    }

    loadOrders();
  }, [user, session]);

  const renderOrders = (status) => {
    const filteredOrders = status === 'all' 
      ? orders 
      : orders.filter(order => order.status === status);

    if (filteredOrders.length === 0) {
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
            {status === 'preparing' && <FaBoxOpen size={"10vh"} color="#777"/>}
            {status === 'shipped' && <FaTruck size={"10vh"} color="#777"/>}
            {status === 'arrived' && <FaCalendarCheck size={"10vh"} color="#777"/>}
            <p className="text-lg ml-3 text-center flex-1">
              No {status === 'all' ? '' : status} orders found.
            </p>
          </div>
        </motion.div>
      );
    }

    return filteredOrders.map((order, index) => (
      <motion.div 
        key={order.payment_intent_id}
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
            <p className="text-sm text-gray-500">Order ID: {order.payment_intent_id}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-xl font-bold">
            ${order.total_amount}
          </div>
        </div>
        <div className="space-y-4">
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-4">
              <div className="flex-1">
                <p>{item.title}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="w-20 h-20">
                <Image src={`https://src.depxtech.com/${item.image}`} alt={item.title} width={80} height={80} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ));
  };

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 background-card rounded-none rounded-b-xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="prepareing">Prepareing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="arived">Arived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderOrders('all')}</TabsContent>
        <TabsContent value="prepareing">{renderOrders('preparing')}</TabsContent>
        <TabsContent value="shipped">{renderOrders('shipped')}</TabsContent>
        <TabsContent value="arived">{renderOrders('arrived')}</TabsContent>
      </Tabs>
      {/* <Recommends /> */}
      {/* this is a server component */}
    </>
  );
}

