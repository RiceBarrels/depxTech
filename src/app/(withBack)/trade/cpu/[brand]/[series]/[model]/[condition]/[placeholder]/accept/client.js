'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function AcceptClient({ params, user }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { session } = useSession();
    const MotionButton = motion(Button);
    toast.success('Loading...');

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
            }
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const supabase = createClerkSupabaseClient();

            const tradeIn = {
                id: `TI-${Date.now()}-${user.id}-${Math.random().toString(36).substring(2, 15)}`,
                created_at: new Date().toISOString(),
                status: 'shipping',
                brand: params.brand,
                series: params.series,
                model: params.model,
                condition: params.condition,
                price: params.price,
                gpuName: `${params.model}`,
                shipping_info: {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    phone: e.target.phone.value
                }
            };

            // First, check if user exists
            const { data: existingUser, error: checkError } = await supabase
                .from('userdata')
                .select('*')
                .eq('user_id', user.id)
                .single();

            let result;
            if (!existingUser) {
                result = await supabase
                    .from('userdata')
                    .insert({
                        user_id: user.id,
                        'trade-in': [tradeIn]
                    })
                    .select()
                    .single();
            } else {
                const updatedTradeIns = [...(existingUser['trade-in'] || []), tradeIn];
                result = await supabase
                    .from('userdata')
                    .update({
                        'trade-in': updatedTradeIns
                    })
                    .eq('user_id', user.id)
                    .select()
                    .single();
            }

            if (result.error) {
                throw new Error(result.error.message);
            }

            toast.success('Trade-in request submitted successfully!');
            router.push('/accounts/trade-ins');

        } catch (error) {
            console.error('Error submitting trade-in:', error);
            toast.error(`Failed to submit trade-in request: ${error.message || 'Unknown error occurred'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className='w-full max-w-md shadow-2xl shadow-pink-500/10 border border-pink-500/20 py-4'>
                    <CardHeader>
                        <CardTitle>Let&apos;s get you started For Shipping</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {['name', 'email', 'phone', 'country'].map((field, index) => (
                                <motion.div
                                    key={field}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Label htmlFor={field} className="text-sm mb-1">
                                        {field.charAt(0).toUpperCase() + field.slice(1)} <span className='text-xs text-red-500'>*</span>
                                    </Label>
                                    <Input 
                                        id={field} 
                                        name={field}
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} 
                                        placeholder={`Enter your ${field}`} 
                                        required
                                        disabled={field === 'country'}
                                        defaultValue={field === 'email' ? user?.emailAddresses[0]?.emailAddress : field === 'country' ? "United States" : ""}
                                    />
                                </motion.div>
                            ))}
                        </CardContent>

                        <CardFooter className='flex justify-between'>
                            <Link href={"/trade/cpu/" + params.brand + "/" + params.series + "/" + params.model + "/" + params.condition + "/" + params.placeHolder}>
                                <Button
                                    type="button"
                                    variant="outline"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="transition-transform"
                                >
                                    Cancel Trade In
                                </Button>
                            </Link>
                            <MotionButton
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="transition-transform"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin mr-2">⚡</div>
                                        Processing...
                                    </div>
                                ) : (
                                    'Submit Trade'
                                )}
                            </MotionButton>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
} 