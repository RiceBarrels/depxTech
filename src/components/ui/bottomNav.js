"use client"
import "@/components/nav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiAccountCircleLine, RiAccountCircleFill } from "react-icons/ri";
import { PiShoppingCartSimple, PiShoppingCartSimpleFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { RiExchangeLine,RiExchangeFill } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useRef } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const popSoundRef = useRef(null);

  useEffect(() => {
    // Preload the audio
    popSoundRef.current = new Audio("/popEffect.mp3");
  }, []);

  const playPopSound = () => {
    // if (popSoundRef.current) {
    //   popSoundRef.current.currentTime = 0; // Rewind to start
    //   popSoundRef.current.play();
    // }
  }

  return (
    <nav className="p-1 pb-5 z-[1001]">
      <div className="flex-1"/>

      <Link href={"/"} className={pathname == "/" ? "active" : ""} onClick={playPopSound}>
        {pathname == "/" || pathname.includes("/create") ? <GoHomeFill/> : <GoHome/>}
        <span>Home</span>
      </Link>

      <div className="flex-1"/>

      <Link href={"/trade"} className={pathname.includes("/trade") ? "active" : ""} onClick={playPopSound}>
        {pathname.includes("/trade") ? <RiExchangeFill/> : <RiExchangeLine/>}
        <span>Trade In</span>
      </Link>

      <div className="flex-1"/>

      <Link href="/accounts" className={pathname.includes("/accounts") ? "active" : ""} onClick={playPopSound}>
        {pathname.includes("/accounts") ? <RiAccountCircleFill/> : <RiAccountCircleLine/>}
        <span>Accounts</span>
      </Link>

      <div className="flex-1"/>
    </nav>
  );
}