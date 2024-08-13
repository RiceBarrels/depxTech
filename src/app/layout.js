import '@mantine/core/styles.css';
import "./globals.css";
import "./authStyle.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeepHuo Custom PCs",
  description: "Unleash true power with cheaper money. Whether you’re a gamer, creator, or professional, we engineer your system to perfection.",
  appleWebApp: {
    title: "DeepHuo",
    statusBarStyle: 'black-translucent',
    
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children, nav }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <ClerkProvider>
            {/* <div className="background-default"> */}
              {children}
            {/* </div> */}
          </ClerkProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
