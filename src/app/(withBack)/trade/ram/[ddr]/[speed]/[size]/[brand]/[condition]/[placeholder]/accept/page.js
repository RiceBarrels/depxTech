import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AcceptClient from './client'

export const metadata = {
    title: 'Accept RAM Trade-In',
    description: 'Accept your RAM trade in request',
    index: false,
}

export default async function Accept({ params, searchParams }) {
    const [
        { ddr, speed, size, brand, condition, placeHolder },
        tradeInResponse
    ] = await Promise.all([
        params,
        fetch(`https://src.depxtech.com/json/trade-in`)
    ]);
    
    const data = await tradeInResponse.json();
    
    if (!data?.RAM?.[ddr]?.[size]?.[speed]) {
        console.log("data", data);
        console.log("Invalid RAM Configuration", data?.RAM?.[ddr]?.[size]?.[speed]);
        return (
            <div className="flex flex-col items-center justify-center p-4 h-full">
                <h1 className="text-xl font-bold mb-4">Invalid RAM Configuration</h1>
                <p className="text-gray-600 mb-4">
                    The requested RAM configuration could not be found.
                </p>
                <Link href="/trade" className="text-blue-500 hover:underline">
                    Return to Trade-In
                </Link>
            </div>
        );
    }

    const ramDetails = {
        ddr,
        speed,
        size,
        brand,
        condition,
        placeHolder,
        price: data.RAM[ddr][size][speed][condition.toLowerCase()]
    }

    const user = await currentUser();
    const email = searchParams.email;
    
    if (!user) {
        redirect('/sign-in?redirect_url=' + encodeURIComponent('/trade/ram/' + ddr + '/' + speed + '/' + size + '/' + brand + '/' + condition + '/' + placeHolder + '/accept?email=' + email));
    }
    
    const serializedUser = {
        id: user.id,
        emailAddresses: [{ emailAddress: user.emailAddresses[0].emailAddress }],
        firstName: user.firstName,
        lastName: user.lastName
    };
    
    if (email && email !== user.emailAddresses[0].emailAddress) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl font-bold mb-4">Please sign in with the correct email</h1>
                <p className="text-gray-600 mb-4">
                    The email address used for this trade-in request ({email}) doesn't match your signed-in account.
                </p>
                <Link 
                    href={"/sign-in?redirect_url=" + encodeURIComponent('/trade/ram/' + ddr + '/' + speed + '/' + size + '/' + brand + '/' + condition + '/' + placeHolder + '/accept?email=' + email)}
                    className="text-blue-500 hover:underline"
                >
                    Sign in with correct email
                </Link>
            </div>
        );
    }

    return <AcceptClient params={ramDetails} user={serializedUser} speed={data.RAM[ddr][size][speed].name} />;
} 
