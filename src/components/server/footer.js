import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer(){
    return (
        <div>
            <Separator />
            <div className="flex justify-center items-center w-full">
                <div className="inline-flex flex-wrap items-start m-auto w-5/6 *:inline-block *:box-border">
                    <div className="w-64 background-card rounded-xl p-3 px-5 *:block *:mb-1.5 m-3">
                        <h3 className="mb-3">About DepxTech</h3>
                        <Link href="about">About Us</Link>
                        <Link href="blog">Blog</Link>
                        <Link href="deephuo">WTH is DeepHuo?</Link>
                    </div>
                    <div className="w-64 background-card rounded-xl p-3 px-5 *:block *:mb-2 m-3">
                        <h3 className="mb-3">Buying & Selling</h3>
                        <Link href="trade">Trade GPU</Link>
                        <Link href="trade">Trade CPU</Link>
                        <Link href="trade">Trade RAM</Link>
                        <Link href="/">Buy Something</Link>
                        <Link href="/">Return Policy</Link>
                    </div>
                    <div className="w-64 background-card rounded-xl p-3 px-5 *:block *:mb-2 m-3">
                        <h3 className="mb-3">Help</h3>
                        <Link href="help">Help Center</Link>
                        <Link href="support">Chat Now</Link>
                        <small>Mon-Sun 8-22 EDT(NY)</small>
                        <small>Email: support@depxtech.com</small>
                    </div>
                    <div className="w-64 background-card rounded-xl p-3 px-5 *:block *:mb-2 m-3">
                        <h3 className="mb-3">Help</h3>
                        <Link href="help">Help Center</Link>
                        <Link href="support">Chat Now</Link>
                        <small>Mon-Sun 8-22 EDT(NY)</small>
                        <small>Email: support@depxtech.com</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
