"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// clerk
import { useUser } from "@clerk/nextjs";
import { BiLeftArrow } from "react-icons/bi";

export default function Support() {
  // State to track if Crisp chat is loaded
  const [isCrispLoaded, setIsCrispLoaded] = useState(false);
  // Get user information from Clerk
  const { isLoaded, isSignedIn, user } = useUser();
  // State to track if chat is open
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Initialize Crisp chat
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "bf92da02-d496-4b70-ad25-eddbbd8cc9e4";

    // Load Crisp chat script
    (function() {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    // Check if Crisp is loaded and style elements
    const checkCrispLoaded = () => {
      if (window.$crisp && window.$crisp.is) {
        closeChat();
        setIsCrispLoaded(true);
        // Attempt to style Crisp elements after Crisp is loaded
        const styleCrispElements = () => {
          // Select Crisp elements
          const originalButton = document.querySelector('.cc-157aw');
          const originalContainer = document.querySelector('.cc-1no03');
          const chat = document.querySelector('.cc-rfbfu');
          const chatBackground = document.querySelector('.cc-13yzx');
          const chatTexts = document.querySelectorAll('.cc-ygxd2');
          const chatHeader = document.querySelector('.cc-1o220');
          const chatFooter = document.querySelector('.cc-1nvun');
          const chatInput = document.querySelector('.cc-1icw9');
          if (originalButton && originalContainer && chat && chatBackground && chatTexts.length > 0 && chatHeader && chatFooter && chatInput) {
            // Style Crisp elements
            originalButton.style.setProperty('display', 'none', 'important');
            originalContainer.style.setProperty('width', '100%', 'important');
            originalContainer.style.setProperty('left', '0', 'important');
            originalContainer.style.setProperty('top', '0', 'important');
            originalContainer.style.setProperty('bottom', '0', 'important');
            originalContainer.style.setProperty('right', '0', 'important');
            chat.style.setProperty('height', 'calc(100% - 150px)', 'important');
            chatBackground.style.setProperty('background', 'var(--background-end-rgb)', 'important');
            chatTexts.forEach(chatText => {
              chatText.style.setProperty('color', 'var(--foreground-rgb)', 'important');
            });
            chatHeader.style.setProperty('color', 'var(--foreground-rgb)', 'important');
            chatHeader.style.setProperty('background', 'var(--background-end-rgb)', 'important');
            chatFooter.style.setProperty('color', 'var(--foreground-rgb)', 'important');
            chatFooter.style.setProperty('background', 'var(--background-end-rgb)', 'important');
            chatInput.style.setProperty('color', 'var(--foreground-rgb)', 'important');
          } else {
            // If elements not found, retry after a short delay
            setTimeout(styleCrispElements, 100);
          }
        };
        styleCrispElements();
      } else {
        // If Crisp is not loaded, check again after 500ms
        setTimeout(checkCrispLoaded, 500);
      }
    };

    checkCrispLoaded();
  }, []);

  // Set user email in Crisp when user is signed in and Crisp is loaded
  useEffect(() => {
    if (isCrispLoaded && isSignedIn && user) {
      window.$crisp.push(["set", "user:email", user.emailAddresses[0]?.emailAddress]);
    }
  }, [isCrispLoaded, isSignedIn, user]);

  // Handle opening the chat
  const handleChatNow = () => {
    if (isCrispLoaded) {
      window.$crisp.push(["do", "chat:open"]);
      setIsChatOpen(true);

      // Style Crisp elements
      styleCrispElements();
    }
  };

  // Function to style Crisp elements
  const styleCrispElements = () => {
    const originalButton = document.querySelector('.cc-157aw');
    const originalContainer = document.querySelector('.cc-1no03');
    const chat = document.querySelector('.cc-rfbfu');
    const chatBackground = document.querySelector('.cc-13yzx');
    const chatTexts = document.querySelectorAll('.cc-ygxd2');
    const chatHeader = document.querySelector('.cc-1o220');
    const chatFooter = document.querySelector('.cc-1nvun');
    const chatInput = document.querySelector('.cc-1icw9');
    if (originalButton && originalContainer && chat && chatBackground && chatTexts.length > 0 && chatHeader && chatFooter && chatInput) {
      // Apply styles to Crisp elements
      originalButton.style.setProperty('display', 'none', 'important');
      originalContainer.style.setProperty('width', '100%', 'important');
      originalContainer.style.setProperty('left', '0', 'important');
      originalContainer.style.setProperty('top', '0', 'important');
      originalContainer.style.setProperty('bottom', '0', 'important');
      originalContainer.style.setProperty('right', '0', 'important');
      chat.style.setProperty('height', 'calc(100% - 150px)', 'important');
      chatBackground.style.setProperty('background', 'var(--background-end-rgb)', 'important');
      chatTexts.forEach(chatText => {
        chatText.style.setProperty('color', 'var(--foreground-rgb)', 'important');
      });
      chatHeader.style.setProperty('color', 'var(--foreground-rgb)', 'important');
      chatHeader.style.setProperty('background', 'var(--background-end-rgb)', 'important');
      chatFooter.style.setProperty('color', 'var(--foreground-rgb)', 'important');
      chatFooter.style.setProperty('background', 'var(--background-end-rgb)', 'important');
      chatInput.style.setProperty('color', 'var(--foreground-rgb)', 'important');
    } else {
      // If elements not found, retry after a short delay
      setTimeout(styleCrispElements, 100);
    }
  };

  // Function to close chat
  const closeChat = () => {
    window.$crisp.push(["do", "chat:close"]);
    setIsChatOpen(false);

    // Style Crisp elements after closing
    styleCrispElements();
  };

  // Handle window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setTimeout(() => styleCrispElements(), 100);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="h-[calc(100dvh-48px)]">
      <h1 className="my-5">Support</h1>
      <div className="background-card py-4 rounded-2xl px-4">
        <div
          className="text-md px-4 cursor-pointer py-4 active:bg-[#88888825]"
          onClick={handleChatNow}
        >
          {isCrispLoaded ? "Chat With Us" : "Getting Chat Ready..."}
        </div>
        <Link
          href="mailto:support@depxtech.com"
          className="text-md px-4 cursor-pointer border-t-[1px] border-[#88888825] py-4 block active:bg-[#88888825]"
        >
          Email Support
        </Link>
      </div>
      {isChatOpen && (
        <div className="fixed top-0 left-0 w-full h-10 background-card z-[1000001] flex items-center px-4">
          <span className="text-md cursor-pointer" onClick={closeChat}>
            Close
          </span>
        </div>
      )}
    </div>
  );
}
