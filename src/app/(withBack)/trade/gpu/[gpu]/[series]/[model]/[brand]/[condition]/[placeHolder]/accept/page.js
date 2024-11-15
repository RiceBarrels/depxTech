import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AcceptClient from './client'
// head for this page 
export const metadata = {
    title: 'Accept Trade-In',
    description: 'Accept your trade in request',
    index: false,
}


export default async function Accept({ params, searchParams }) {
    // fetch name of the gpu
    const tradeInData = await fetch(`https://src.depxtech.com/json/trade-in`);
    const data = await tradeInData.json();
    console.log('data:', data);
    
    // Validate the data structure exists before accessing nested properties
    if (!data?.GPU?.[params.gpu]?.[params.series.replace('%20', ' ')]?.[params.model]?.name) {
        return (
            <div className="flex flex-col items-center justify-center p-4 h-full">
                <h1 className="text-xl font-bold mb-4">Invalid GPU Configuration</h1>
                <p className="text-gray-600 mb-4">
                    The requested GPU configuration could not be found.
                </p>
                <Link href="/trade" className="text-blue-500 hover:underline">
                    Return to Trade-In
                </Link>
            </div>
        );
    }

    const gpuDetails = {
        gpu: params.gpu,
        series: params.series,
        model: params.model,
        brand: params.brand,
        condition: params.condition,
        placeHolder: params.placeHolder,
        gpuName: data.GPU[params.gpu][params.series.replace('%20', ' ')][params.model].name,
        price: data.GPU[params.gpu][params.series.replace('%20', ' ')][params.model][params.condition]
    }
    console.log('gpuDetails:', gpuDetails);
    const user = await currentUser();
    const email = searchParams.email;
    
    if (!user) {
        redirect('/sign-in?redirect_url=' + encodeURIComponent('/trade/gpu/' + params.gpu + '/' + params.series + '/' + params.model + '/' + params.brand + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email));
    }
    
    // Serialize the user object
    const serializedUser = {
        id: user.id,
        emailAddresses: [{ emailAddress: user.emailAddresses[0].emailAddress }],
        firstName: user.firstName,
        lastName: user.lastName
    };
    
    // Verify email matches
    if (email && email !== user.emailAddresses[0].emailAddress) {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl font-bold mb-4">Please sign in with the correct email</h1>
                <p className="text-gray-600 mb-4">
                    The email address used for this trade-in request ({email}) doesn't match your signed-in account.
                </p>
                <Link 
                    href={"/sign-in?redirect_url=" + encodeURIComponent('/trade/gpu/' + params.gpu + '/' + params.series + '/' + params.model + '/' + params.brand + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email)}
                    className="text-blue-500 hover:underline"
                >
                    Sign in with correct email
                </Link>
            </div>
        );
    }

    return <AcceptClient params={gpuDetails} user={serializedUser} />;
}
