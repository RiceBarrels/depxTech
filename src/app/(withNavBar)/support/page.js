"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// clerk
import { useUser } from "@clerk/nextjs";

export default function Support() {
  const [isCrispLoaded, setIsCrispLoaded] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "bf92da02-d496-4b70-ad25-eddbbd8cc9e4";

    (function() {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    const checkCrispLoaded = () => {
      if (window.$crisp && window.$crisp.is) {
        setIsCrispLoaded(true);
        // Attempt to style Crisp elements after Crisp is loaded
        const styleCrispElements = () => {
          const originalButton = document.querySelector('.cc-157aw');
          const originalContainer = document.querySelector('.cc-1no03');
          const chat = document.querySelector('.cc-rfbfu');
          if (originalButton && originalContainer && chat) {
            originalButton.style.setProperty('display', 'none', 'important');
            originalContainer.style.setProperty('width', '100%', 'important');
            originalContainer.style.setProperty('left', '0', 'important');
            originalContainer.style.setProperty('top', '0', 'important');
            originalContainer.style.setProperty('bottom', '0', 'important');
            originalContainer.style.setProperty('right', '0', 'important');
            chat.style.setProperty('height', 'calc(100% - 150px)', 'important');
          } else {
            // If elements not found, retry after a short delay
            setTimeout(styleCrispElements, 100);
          }
        };
        styleCrispElements();
      } else {
        setTimeout(checkCrispLoaded, 500);
      }
    };

    checkCrispLoaded();
  }, []);

  useEffect(() => {
    if (isCrispLoaded && isSignedIn && user) {
      window.$crisp.push(["set", "user:email", user.emailAddresses[0]?.emailAddress]);
    }
  }, [isCrispLoaded, isSignedIn, user]);

  const handleChatNow = () => {
    if (isCrispLoaded) {
      window.$crisp.push(["do", "chat:open"]);
      setIsChatOpen(true);
    }
  };

  //close chat
  const closeChat = () => {
    window.$crisp.push(["do", "chat:close"]);
    setIsChatOpen(false);
  };

  return (
    <div className="h-[calc(100dvh-48px)]">
      <h1 className="my-5">Support</h1>
      <div className="background-card py-8 rounded-2xl px-4">
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
      
    </div>
  );
}
