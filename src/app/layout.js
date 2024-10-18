import '@mantine/core/styles.css';
import "./globals.css";
import "./authStyle.css";
import "@/components/client/pageTransition.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { MantineProvider } from "@mantine/core";
import { IoIosArrowBack } from 'react-icons/io';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DepxTech Custom PCs",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection."
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
}

export default function RootLayout({ children, nav }) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="favicon" href="/apple-icon?<generated>" />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <ClerkProvider>
            {/* <div className="background-default"> */}
              {children}
              <div id="transition-loader" className="bg-[var(--background-start-rgb)]" >
                <div className="flex h-[45px] background-card items-center rounded-b-xl">
                    {/* back button */}
                    <button className="flex justify-center items-center pl-2"><IoIosArrowBack size={24} /> Back</button>
                    <div className="flex justify-center items-center flex-1"/>
                    <button className="flex justify-center items-center pl-2 opacity-0"><IoIosArrowBack size={24} /> Back</button>
                </div>
              </div>
          </ClerkProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
