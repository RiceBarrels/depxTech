'use client';
import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';

export default function test() {
  const [Carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [titles, setTitles] = useState({});
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

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;

    async function loadCarts() {
      setLoading(true);
      const { data, error } = await client
        .from('userdata')
        .select('cart')
        .eq('user_id', user.id)
        .single();
      if (!error && data) setCarts(data.cart || []);
      setLoading(false);
    }

    loadCarts();
  }, [user]);

  async function createTask(e) {
    e.preventDefault();
    const updatedCarts = [...Carts, { type, itemId, quantity }];
    await client
      .from('userdata')
      .update({ cart: updatedCarts })
      .eq('user_id', user.id);
    setCarts(updatedCarts);
    setType('');
    setItemId('');
    setQuantity('');
  }

  async function removeTask(index) {
    const updatedCarts = Carts.filter((_, i) => i !== index);
    await client
      .from('userdata')
      .update({ cart: updatedCarts })
      .eq('user_id', user.id);
    setCarts(updatedCarts);
  }

  return (
    <div>
      <h1>Carts {!loading && Carts.length !== 0 && <span className="text-xl">({Carts.length})</span>}</h1>

      {loading && <p>Loading...</p>}

      {!loading && Carts.length === 0 && <p>No item found</p>}

      <form onSubmit={createTask}>
        <Input
          autoFocus
          type="text"
          name="type"
          placeholder="type"
          onChange={(e) => setType(e.target.value)}
          value={type}
        />
        <Input
          autoFocus
          type="text"
          name="item"
          placeholder="item"
          onChange={(e) => setItemId(e.target.value)}
          value={itemId}
        />
        <Input
          autoFocus
          type="text"
          name="quantity"
          placeholder="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
