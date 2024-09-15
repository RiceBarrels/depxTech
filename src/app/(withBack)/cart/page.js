"use server"

import Image from 'next/image';
import { createClerkSupabaseClientSsr } from './client'
import getData from '@/components/server/getData';
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return (
      <div className='flex flex-col h-[calc(100vh-45px)]'>
        <h1>Cart</h1>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-center m-4 p-4 background-card rounded-xl'>
            <p className='mb-3'>Please Sign In to view your cart.</p>
            <Link href="/signIn"><Button>Sign In / Register</Button></Link>
          </div>
        </div>
      </div>
    )
  } else {
    // Use the custom Supabase client you created
    const client = createClerkSupabaseClientSsr()
  
    // Query the 'userdata' table to render the list of tasks
    const { data, error } = await client
      .from('userdata')
      .select('cart');
    if (error) {
      throw error
    }
  
    // Extract the cart items directly if they are already objects
    const cart = data[0].cart
  
    // Fetch item details for each cart item
    const cartWithDetails = await Promise.all(cart.map(async (item) => {
      const itemDetails = await getData(`https://api.depxtech.com/read?filter_id=${item.itemId}`);
      // string to json
      const itemImages = itemDetails[0].imgs ? JSON.parse(itemDetails[0].imgs) : [];
      return {
        ...item,
        title: itemDetails[0].title,
        des: itemDetails[0].des,
        imgs: itemImages,
        price: itemDetails[0].price
      }
    }));
  
    console.log("cartWithDetails", JSON.stringify(cartWithDetails, null, 2));
  
    return (
      <div>
        <h1>Cart {cart.length >= 1 && <span className='text-xl'>({cart.length})</span>}</h1>
  
        {cart.length >= 1 &&
          <div className='flex flex-col mt-4'>
            {cartWithDetails.map((item, index) => (
              <div key={`item${index}`} className='flex flex-col m-2 mb-4 p-2 background-card rounded-xl'>
                <div className='flex gap-x-4'>
                  <Image 
                    src={`https://src.depxtech.com/${item.imgs[0]}`} 
                    width="84" 
                    height="84" 
                    alt={item.id} 
                    className="w-24 h-24 object-contain rounded-xl bg-[#77777720]"
                  />
                  <div className='flex flex-col justify-center'>
                    <h3 className='font-semibold text-lg h-14 overflow-hidden whitespace-normal text-ellipsis'>{item.title}</h3>
                    <space />
                    <div className='flex justify-end'>
                      <div className="text-2xl text-right font-extrabold">
                          <span className="text-sm">$ </span>
                          <span className='align-bottom'>{item.price.split('.')[0]}</span>
                          <span className="text-[0px]">.</span>
                          <span className="text-sm">{item.price.split('.')[1]}</span>
                      </div>
  
                      <space/>
  
                      <div>
                        <span className='align-bottom'>x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border-t-[#66666630] border-t-[2px] mt-2'>
                  
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}
