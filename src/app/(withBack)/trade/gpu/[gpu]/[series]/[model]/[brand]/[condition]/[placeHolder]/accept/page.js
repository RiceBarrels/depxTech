import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

// head for this page 
export const metadata = {
    title: 'Accept',
    description: 'Accept your trade in request',
    index: false,
}

//no index



export default async function Accept({ params, searchParams }) {
    // /trade/gpu/${gpuDetails.gpu}/${gpuDetails.series}/${gpuDetails.modelId}/${gpuDetails.brand}/${gpuDetails.condition}/${gpuDetails.placeHolder}/accept?email=${to} url goes like this
    const user = await currentUser();
    const email = searchParams.email;
    
    if (!user) {
        redirect('/sign-in?redirect_url=' + encodeURIComponent('/trade/gpu/' + params.gpu + '/' + params.series + '/' + params.model + '/' + params.brand + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email));
    }
    
    return (
        <div>
            {/* check if email is the same as user email */}
            {email === user.emailAddresses[0].emailAddress ? (
                <div>
                    <h1>Let&apos;s get you started</h1>
                    <Link href={"/trade/gpu/" + params.gpu + "/" + params.series + "/" + params.model + "/" + params.brand + "/" + params.condition + "/" + params.placeHolder + "/accept/start"}>Start</Link>
                </div>
            ) : (
                <div>
                    <h1>Please sign in with the email you used to send the trade in request</h1>
                    <Link href={"/sign-in?redirect_url=" + encodeURIComponent('/trade/gpu/' + params.gpu + '/' + params.series + '/' + params.model + '/' + params.brand + '/' + params.condition + '/' + params.placeHolder + '/accept?email=' + email)}>Sign In</Link>
                </div>
            )}
        </div>
    )
}
