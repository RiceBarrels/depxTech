import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AcceptClient from './client'

export const metadata = {
    title: 'Accept CPU Trade-In',
    description: 'Accept your CPU trade in request',
    index: false,
}

export default async function Accept({ params, searchParams }) {
    const response = await fetch('https://src.depxtech.com/json/trade-in');
    const data = await response.json();

    console.log("data: ", data?.CPU?.[params.brand]?.[params.series.replace('%20', ' ')]?.[parseInt(params.model)]);
    
    if (!data?.CPU?.[params.brand]?.[params.series.replace('%20', ' ')]?.[parseInt(params.model)]) {
        return (
            <div className="flex flex-col items-center justify-center p-4 h-full">
                <h1 className="text-xl font-bold mb-4">Invalid CPU Configuration</h1>
                <p className="text-gray-600 mb-4">
                    The requested CPU configuration could not be found.
                </p>
                <Link href="/trade" className="text-blue-500 hover:underline">
                    Return to Trade-In
                </Link>
            </div>
        );
    }

    const series = params.series.replace('%20', ' ');
    const condition = params.condition.toLowerCase();
    const modelData = data.CPU[params.brand][series][params.model];

    const cpuDetails = {
        brand: params.brand,
        series: series,
        model: params.model,
        condition: condition,
        placeHolder: params.placeHolder,
        cpuName: modelData.name,
        price: modelData[condition]
    };

    const user = await currentUser();
    const email = searchParams.email;

    if (!user) {
        redirect('/sign-in?redirect_url=' + encodeURIComponent('/trade/cpu/' + params.brand + '/' + params.series + '/' + params.model + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email));
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
                    href={"/sign-in?redirect_url=" + encodeURIComponent('/trade/cpu/' + params.brand + '/' + params.series + '/' + params.model + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email)}
                    className="text-blue-500 hover:underline"
                >
                    Sign in with correct email
                </Link>
            </div>
        );
    }

    return <AcceptClient params={cpuDetails} user={serializedUser} />;
} 