import Image from "next/image";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { TbSettings2 } from "react-icons/tb";
import { BsJournalText } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { GrCircleQuestion } from "react-icons/gr";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi"
import Recommends from "@/components/server/recommends";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";

export default async function Accounts() {
  const { userId } = auth();
  const user = await currentUser();
  let userImage;
  let userName = "Guest";
  let authUtility = (
    <>
      <TransitionLinkBackNav class="w-max button flex-1 mx-4 py-2" href="./signIn">Sign In</TransitionLinkBackNav>
      <TransitionLinkBackNav class="w-max button-secondary flex-1 mr-4 py-2" href="./signUp">Sign Up</TransitionLinkBackNav>
    </>
  );

  console.log(user)

  if (userId){
    if(user.hasImage == true){
      userImage = user.imageUrl;
    }

    if (user.username == null){
      userName = `${user.firstName} ${user.lastName}`;
    } else {
      userName = user.username;
    }

    authUtility = (
      <>
        <SignOutButton class="w-max button flex-1 mx-4 py-2" redirectUrl="./accounts"/>
      </>
    );
  }
  return (
    <>
      <div class="flex p-4 my-8 m-2 rounded-2xl background-card justify-center items-center">
        <img class="rounded-full" width={64} src={userImage}/>
        &nbsp;&nbsp;
        <div class="flex-1">
          <h3 class="">{userName}</h3>
          {user && <div class="text-xs flex">User ID:&nbsp;<span class="truncate flex-1">{userId}</span></div>}
          {!user && <div class="text-xs flex"><TransitionLinkBackNav className="underline" href="./signIn">Sign In</TransitionLinkBackNav>&nbsp;or&nbsp;<TransitionLinkBackNav className="underline" href="./signIn">Register</TransitionLinkBackNav> </div>}
        </div>
        &nbsp;&nbsp;
        {user &&
          <TransitionLinkBackNav href="profile" >
            <TbSettings2 class="rotate-90" size={24}/>
          </TransitionLinkBackNav>
        }
      </div>

      <div className="background-card rounded-t-2xl rounded-b-md m-2 p-4 flex flex-col font-bold">
        <space/>
        <TransitionLinkBackNav href="accounts/orders" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <BsJournalText class="mx-2" size={20}/>
          <small class="mx-2 ">My Orders</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/myReviews" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <FiStar class="mx-2" size={20}/>
          <small class="mx-2">My Reviews</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/address" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <HiOutlineLocationMarker class="mx-2" size={20}/>
          <small class="mx-2">My Address</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/coupons" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <RiCoupon3Line class="mx-2" size={20}/>
          <small class="mx-2">Coupons & Offers</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <space/>
      </div>

      <div className="background-card rounded-t-md rounded-b-2xl m-2 p-2 py-4 flex flex-col font-bold">
        <space/>
        <TransitionLinkBackNav href="accounts/about" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <GrCircleQuestion class="mx-2" size={20}/>
          <small class="mx-2">About Us</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/version" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <IoMdInformationCircleOutline class="mx-2" size={20}/>
          <small class="mx-2">App Version</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/customerService" class="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <RiCustomerServiceLine class="mx-2" size={20}/>
          <small class="mx-2">Customer Service</small>
          <space/>
          <IoIosArrowForward class="mx-1" size={14} />
        </TransitionLinkBackNav>
        <space/>
      </div>

        <div
            className="flex"
        >
            {authUtility}
        </div>

      <Recommends />
    </>
  );
}

