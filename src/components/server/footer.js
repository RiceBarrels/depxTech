"use client"
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer(){
    return (
        <div className="mt-12">
            <Separator />
            <div className="hidden sm:block columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
                <div className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid">
                    <h3 className="mb-3">About DepxTech</h3>
                    <Link href="about" className="block mb-1.5">About Us</Link>
                    <Link href="blog" className="block mb-1.5">Blog</Link>
                    <Link href="deephuo" className="block mb-1.5">WTH is DeepHuo?</Link>
                </div>
                <div className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid">
                    <h3 className="mb-3">Buying & Selling</h3>
                    <Link href="trade" className="block mb-2">Trade GPU</Link>
                    <Link href="trade" className="block mb-2">Trade CPU</Link>
                    <Link href="trade" className="block mb-2">Trade RAM</Link>
                    <Link href="/" className="block mb-2">Buy Something</Link>
                    <Link href="/" className="block mb-2">Return Policy</Link>
                </div>
                <div className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid">
                    <h3 className="mb-3">Help</h3>
                    <Link href="help" className="block mb-2">Help Center</Link>
                    <Link href="support" className="block mb-2">Chat Now</Link>
                    <small className="block mb-2">Mon-Sun 8-22 EDT(NY)</small>
                    <small className="block mb-2">Email: support@depxtech.com</small>
                </div>
                <div className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid">
                    <h3 className="mb-3">Socials</h3>
                    <Link href="https://www.facebook.com/depxtech" className="block mb-2">Facebook</Link>
                    <Link href="https://www.instagram.com/depxtech" className="block mb-2">Instagram</Link>
                    <Link href="https://www.youtube.com/@depxtech" className="block mb-2">Youtube</Link>
                </div>
                <div className="w-full background-card rounded-xl p-3 px-5 mb-4 break-inside-avoid">
                    <h3 className="mb-3">Terms & Conditions & Privacy Policy</h3>
                    <Link href="/" className="block mb-2">Privacy Policy</Link>
                    <Link href="/" className="block mb-2">Terms of Service</Link>
                    <Link href="/" className="block mb-2">Refund Policy</Link>
                    <Link href="/" className="block mb-2">Shipping Policy</Link>
                </div>
            </div>
            <div className="sm:hidden mx-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>About DepxTech</AccordionTrigger>
                        <AccordionContent>
                            <Link href="about" className="block mb-1.5">About Us</Link>
                            <Link href="blog" className="block mb-1.5">Blog</Link>
                            <Link href="deephuo" className="block mb-1.5">WTH is DeepHuo?</Link>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Buying & Selling</AccordionTrigger>
                        <AccordionContent>
                            <Link href="trade" className="block mb-2">Trade GPU</Link>
                            <Link href="trade" className="block mb-2">Trade CPU</Link>
                            <Link href="trade" className="block mb-2">Trade RAM</Link>
                            <Link href="/" className="block mb-2">Buy Something</Link>
                            <Link href="/" className="block mb-2">Return Policy</Link>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Help</AccordionTrigger>
                        <AccordionContent>
                            <Link href="help" className="block mb-2">Help Center</Link>
                            <Link href="support" className="block mb-2">Chat Now</Link>
                            <small className="block mb-2">Mon-Sun 8-22 EDT(NY)</small>
                            <small className="block mb-2">Email: support@depxtech.com</small>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Socials</AccordionTrigger>
                        <AccordionContent>
                            <Link href="https://www.facebook.com/depxtech" className="block mb-2">Facebook</Link>
                            <Link href="https://www.instagram.com/depxtech" className="block mb-2">Instagram</Link>
                            <Link href="https://www.youtube.com/@depxtech" className="block mb-2">Youtube</Link>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Terms & Conditions & Privacy Policy</AccordionTrigger>
                        <AccordionContent>
                            <Link href="/" className="block mb-2">Privacy Policy</Link>
                            <Link href="/" className="block mb-2">Terms of Service</Link>
                            <Link href="/" className="block mb-2">Refund Policy</Link>
                            <Link href="/" className="block mb-2">Shipping Policy</Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
