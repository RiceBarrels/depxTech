'use client';
import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { GrClose } from "react-icons/gr";
import { Button } from '@/components/ui/button';
import { MdOutlineWrongLocation } from 'react-icons/md';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

export default function ManageAddress({className=""}) {
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [addressFields, setAddressFields] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        city: '',
        country: 'United States',
        line1: '',
        line2: '',
        postal_code: '',
        state: '',
        default: false
    });
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

    // Load addresses for the logged-in user
    useEffect(() => {
        if (!user) return;

        async function loadAddresses() {
            setLoading(true);
            const { data, error } = await client
                .from('userdata')
                .select('address')
                .eq('user_id', user.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // Insert the user if not found
                const { error: insertError } = await client
                    .from('userdata')
                    .insert({ user_id: user.id, address: [] });

                if (insertError) {
                    console.error('Error inserting user:', insertError);
                    setLoading(false);
                    return;
                }

                setAddresses([]);
            } else if (!error && data) {
                setAddresses(data.address || []);
            }

            setLoading(false);
        }

        loadAddresses();
    }, [user]);

    // Function to add a new address
    async function addAddress(e) {
        e.preventDefault();

        // Validate required fields
        if (!addressFields.first_name || !addressFields.last_name || !addressFields.phone_number || !addressFields.city || !addressFields.state || !addressFields.postal_code || !addressFields.country || !addressFields.line1) {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedAddresses = [...addresses, addressFields]; // Store new address as an object

        await client
            .from('userdata')
            .update({ address: updatedAddresses })
            .eq('user_id', user.id);

        setAddresses(updatedAddresses);
        setAddressFields({
            first_name: '',
            last_name: '',
            phone_number: '',
            city: '',
            country: 'United States',
            line1: '',
            line2: '',
            postal_code: '',
            state: ''
        }); // Clear the form after submission
        console.log("Successfully updated");
        console.log(updatedAddresses)
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle address delete
    async function deleteAddress(index) {
        // Fetch the updated address list from the database
        const { data: { address: updatedAddresses } } = await client
        .from('userdata')
        .select('address')
        .eq('user_id', user.id)
        .single()

        console.log("test");
        console.log(updatedAddresses[index].default);

        // Check if the current address is the default one
        if (updatedAddresses[index].default === true) {
            // Find the first non-deleted address and set it as default
            for (let i = 0; i < updatedAddresses.length; i++) {
                if (i !== index && !updatedAddresses[i].default) {
                    updatedAddresses[i].default = true;
                    break;
                }
            }
        }

        // Remove the address at the given index
        updatedAddresses.splice(index, 1)
        console.log(index)

        // Update the address in the database
        await client
        .from('userdata')
        .update({ address: updatedAddresses })
        .eq('user_id', user.id)

        // Update the local state
        setAddresses(updatedAddresses)
        console.log(updatedAddresses)
    }

      
    // Handle default address change
    async function handleDefaultAddressChange(index){
        const updatedAddresses = [...addresses];

        for(let i = 0; i < updatedAddresses.length ; i++) {
            if(updatedAddresses[i].default === true){
                updatedAddresses[i].default = false;
                break;
            }
        }
        updatedAddresses[index].default = true;

        // Update the address in the database
        await client
         .from('userdata')
         .update({ address: updatedAddresses })
         .eq('user_id', user.id)
        
        // Update the local state
        setAddresses(updatedAddresses)
        console.log(updatedAddresses)
    }

    if (!loading && addresses.length === 0) return (
        <div className='flex flex-col justify-center items-center h-full'>
            <MdOutlineWrongLocation size="50vmin" color='#888888' />
            <p className='my-3 mt-8 font-extrabold'>No address found.</p>
            <Drawer className="">
                <DrawerTrigger asChild>
                    <Button className="w-full" 
                        onClick={()=>setAddressFields({
                            first_name: '',
                            last_name: '',
                            phone_number: '',
                            city: '',
                            country: 'United States',
                            line1: '',
                            line2: '',
                            postal_code: '',
                            state: '',
                            default: true
                        })}
                    >
                        Add Address
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="flex-col flex h-[90dvh] border-[0.5px] border-[#88888850]">
                    <DrawerHeader className="flex">
                        <DrawerClose><GrClose className="active:bg-[#88888850]" size={24} /></DrawerClose>
                        <div className="flex-1">
                            <DrawerTitle>Addresses</DrawerTitle>
                            <DrawerDescription>Add your first Address.</DrawerDescription>
                        </div>
                        <div className='size-6'></div>
                    </DrawerHeader>

                    <div className='flex flex-col m-3 flex-1'>
                        {/* Form to add a new address */}
                        <form onSubmit={addAddress} className="flex flex-col space-y-2 overflow-y-auto h-[calc(90dvh-160px)]">
                            <div>
                                <h3 className='mb-2'>Basics / Contact Info</h3>
                                <div className='mx-4'>
                                    <Label htmlFor="first-name">First Name <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        placeholder="First Name"
                                        value={addressFields.first_name}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="last_name">Last Name <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={addressFields.last_name}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="phone_number">Phone Number <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        value={addressFields.phone_number}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                </div>
                                <Separator className="my-8" />
                                <h3 className='mb-2'>Address</h3>
                                <div className='mx-4'>
                                    <Label htmlFor="postal_code">Address Line 1 <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="line1"
                                        name="line1"
                                        placeholder="Address Line 1"
                                        value={addressFields.line1}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Address Line 2 <small className='text-[#888888]'>(Optional)</small></Label>
                                    <Input
                                        type="text"
                                        id="line2"
                                        name="line2"
                                        placeholder="Address Line 2 (Optional)"
                                        value={addressFields.line2}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">City <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={addressFields.city}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">State/Province <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="state"
                                        name="state"
                                        placeholder="State"
                                        value={addressFields.state}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Postal Code <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="postal_code"
                                        name="postal_code"
                                        placeholder="Postal Code"
                                        value={addressFields.postal_code}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Country <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="Country"
                                        value={addressFields.country}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                </div>
                            </div>
                            <DrawerClose className='fixed bottom-0 w-[calc(100vw-1.5rem)] background-card '>
                                <Separator />
                                <Button type="submit" className="button my-2 w-full">Save</Button>
                            </DrawerClose>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )

    else if (!loading && addresses.length > 0) return (
        <div className='flex flex-col items-center m-3 gap-y-4'>
            <div className='rounded-xl background-card flex flex-col p-3 w-full gap-y-16'>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <h3>{address.first_name} {address.last_name} <small className='font-normal mx-3'>{address.phone_number}</small></h3>
                        {address.line1}, {address.line2} <br />{address.city}, {address.state} {address.postal_code}, {address.country}
                        <Separator className="my-3"/>
                        <div className='flex h-5 items-center space-x-4'>
                            <Checkbox id="default" checked={address.default === true} onCheckedChange={()=>handleDefaultAddressChange(index)} disabled={address.default === true}/>
                            <Label htmlFor="default">Default</Label>
                            <div className='flex-1'/>
                            <Button variant="ghost" className="p-0 h-auto" onClick={() => deleteAddress(index)}>Delete</Button>
                            <Separator orientation="vertical"/>
                            <Button variant="ghost" className="p-0 h-auto" onClick={() => {navigator.clipboard.writeText(`Name: ${address.first_name} ${address.last_name}\nPhone: ${address.phone_number}\nAddress: ${address.line1}, ${address.line2}, ${address.city} ${address.state} ${address.postal_code}, ${address.country}`)}}>Copy</Button>
                            <Separator orientation="vertical"/>
                            <Drawer className="">
                                 <DrawerTrigger asChild>
                                    <Button variant="ghost" className="p-0 h-auto" 
                                        onClick={() => setAddressFields({
                                            first_name: address.first_name,
                                            last_name: address.last_name,
                                            phone_number: address.phone_number,
                                            city: address.city,
                                            country: address.country,
                                            line1: address.line1,
                                            line2: address.line2,
                                            postal_code: address.postal_code,
                                            state: address.state,
                                            default: address.default
                                        })}
                                    >
                                        Edit
                                    </Button>
                                </DrawerTrigger>

                                <DrawerContent className="flex-col flex h-[90dvh] border-[0.5px] border-[#88888850]">
                                    <DrawerHeader className="flex">
                                        <DrawerClose><GrClose className="active:bg-[#88888850]" size={24} /></DrawerClose>
                                        <div className="flex-1">
                                            <DrawerTitle>Addresses</DrawerTitle>
                                            <DrawerDescription>Add a New Address.</DrawerDescription>
                                        </div>
                                        <div className='size-6'></div>
                                    </DrawerHeader>

                                    <div className='flex flex-col m-3 flex-1'>
                                        {/* Form to add a new address */}
                                        <form onSubmit={addAddress} className="flex flex-col space-y-2 overflow-y-auto h-[calc(90dvh-160px)]">
                                            <div>
                                                <h3 className='mb-2'>Basics / Contact Info</h3>
                                                <div className='mx-4'>
                                                    <Label htmlFor="first-name">First Name <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        placeholder="First Name"
                                                        value={addressFields.first_name}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="last_name">Last Name <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        placeholder="Last Name"
                                                        value={addressFields.last_name}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="phone_number">Phone Number <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="phone_number"
                                                        name="phone_number"
                                                        placeholder="Phone Number"
                                                        value={addressFields.phone_number}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                </div>
                                                <Separator className="my-8" />
                                                <h3 className='mb-2'>Address</h3>
                                                <div className='mx-4'>
                                                    <Label htmlFor="postal_code">Address Line 1 <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="line1"
                                                        name="line1"
                                                        placeholder="Address Line 1"
                                                        value={addressFields.line1}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="postal_code">Address Line 2 <small className='text-[#888888]'>(Optional)</small></Label>
                                                    <Input
                                                        type="text"
                                                        id="line2"
                                                        name="line2"
                                                        placeholder="Address Line 2 (Optional)"
                                                        value={addressFields.line2}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="postal_code">City <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        placeholder="City"
                                                        value={addressFields.city}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="postal_code">State/Province <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        placeholder="State"
                                                        value={addressFields.state}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="postal_code">Postal Code <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="postal_code"
                                                        name="postal_code"
                                                        placeholder="Postal Code"
                                                        value={addressFields.postal_code}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                    <Label htmlFor="postal_code">Country <span className='text-red-500'>*</span></Label>
                                                    <Input
                                                        required
                                                        type="text"
                                                        id="country"
                                                        name="country"
                                                        placeholder="Country"
                                                        value={addressFields.country}
                                                        onChange={handleInputChange}
                                                        className="mb-4"
                                                    />
                                                </div>
                                            </div>
                                            <DrawerClose className='fixed bottom-0 w-[calc(100vw-1.5rem)] background-card '>
                                                <Separator />
                                                <Button type="submit" className="button my-2 w-full" onClick={() => setTimeout(()=>deleteAddress(index),250)}>Save</Button>
                                            </DrawerClose>
                                        </form>
                                    </div>
                                </DrawerContent>
                                </Drawer>
                        </div>
                    </div>
                ))}
            </div>
            {/* Drawer to manage addresses */}
            <Drawer className="">
                <DrawerTrigger asChild>
                    <Button className="w-4/5" 
                        onClick={()=>setAddressFields({
                            first_name: '',
                            last_name: '',
                            phone_number: '',
                            city: '',
                            country: 'United States',
                            line1: '',
                            line2: '',
                            postal_code: '',
                            state: '',
                            default: false
                        })}
                    >
                        Add Address
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="flex-col flex h-[90dvh] border-[0.5px] border-[#88888850]">
                    <DrawerHeader className="flex">
                        <DrawerClose><GrClose className="active:bg-[#88888850]" size={24} /></DrawerClose>
                        <div className="flex-1">
                            <DrawerTitle>Addresses</DrawerTitle>
                            <DrawerDescription>Add a New Address.</DrawerDescription>
                        </div>
                        <div className='size-6'></div>
                    </DrawerHeader>

                    <div className='flex flex-col m-3 flex-1'>
                        {/* Form to add a new address */}
                        <form onSubmit={addAddress} className="flex flex-col space-y-2 overflow-y-auto h-[calc(90dvh-160px)]">
                            <div>
                                <h3 className='mb-2'>Basics / Contact Info</h3>
                                <div className='mx-4'>
                                    <Label htmlFor="first-name">First Name <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        placeholder="First Name"
                                        value={addressFields.first_name}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="last_name">Last Name <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={addressFields.last_name}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="phone_number">Phone Number <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        value={addressFields.phone_number}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                </div>
                                <Separator className="my-8" />
                                <h3 className='mb-2'>Address</h3>
                                <div className='mx-4'>
                                    <Label htmlFor="postal_code">Address Line 1 <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="line1"
                                        name="line1"
                                        placeholder="Address Line 1"
                                        value={addressFields.line1}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Address Line 2 <small className='text-[#888888]'>(Optional)</small></Label>
                                    <Input
                                        type="text"
                                        id="line2"
                                        name="line2"
                                        placeholder="Address Line 2 (Optional)"
                                        value={addressFields.line2}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">City <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={addressFields.city}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">State/Province <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="state"
                                        name="state"
                                        placeholder="State"
                                        value={addressFields.state}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Postal Code <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="postal_code"
                                        name="postal_code"
                                        placeholder="Postal Code"
                                        value={addressFields.postal_code}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                    <Label htmlFor="postal_code">Country <span className='text-red-500'>*</span></Label>
                                    <Input
                                        required
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="Country"
                                        value={addressFields.country}
                                        onChange={handleInputChange}
                                        className="mb-4"
                                    />
                                </div>
                            </div>
                            <DrawerClose className='fixed bottom-0 w-[calc(100vw-1.5rem)] background-card '>
                                <Separator />
                                <Button type="submit" className="button my-2 w-full">Save</Button>
                            </DrawerClose>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
