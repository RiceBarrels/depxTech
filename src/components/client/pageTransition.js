"use client";
import Link from "next/link";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// This component is used to wrap links with transition animations
export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleTransition = async (e) => {
    e.preventDefault();
    const mainContant = document.querySelector("#mainContant");
    const loader = document.getElementById("transition-loader");

    loader?.classList.add("slideIn");
    loader?.classList.remove("noTiming");
    mainContant?.classList.add("mainSlideOut");
    mainContant?.classList.remove("noTiming");
    await sleep(300);

    startTransition(() => {
      router.push(href);
    });
    await sleep(10);

    loader?.classList.add("noTiming");
    mainContant?.classList.add("noTiming");
    await sleep(1);
    loader?.classList.remove("slideIn");
    mainContant?.classList.remove("mainSlideOut");
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};

export const TransitionLinkBackNav = ({ children, href, ...props }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleTransition = async (e) => {
    e.preventDefault();
    const mainContant = document.querySelector("#mainContant");
    const loader = document.getElementById("transition-loader");

    loader?.classList.add("backNavSlide");
    await sleep(10);
    loader?.classList.add("slideIn");
    loader?.classList.remove("noTiming");
    mainContant?.classList.add("mainSlideOut");
    mainContant?.classList.remove("noTiming");
    await sleep(300);

    startTransition(() => {
      router.push(href);
    });
    await sleep(10);

    loader?.classList.add("noTiming");
    mainContant?.classList.add("noTiming");
    await sleep(1);
    loader?.classList.remove("backNavSlide");
    loader?.classList.remove("slideIn");
    mainContant?.classList.remove("mainSlideOut");
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
