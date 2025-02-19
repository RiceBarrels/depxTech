'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { TbSettings2 } from "react-icons/tb";
import { BsJournalText } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { RiCoupon3Line, RiExchange2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { GrCircleQuestion } from "react-icons/gr";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi"
import Recommends from "@/components/server/recommends";
import { TransitionLinkBackNav } from "@/components/client/pageTransition";
import { useState, useEffect } from "react";
import DepxTechLoading from "@/components/ui/depxtechLoading";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCopy } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FaExchangeAlt, FaStackExchange, FaUserCircle } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
const CopyModal = ({ userId, isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="background-card p-6 rounded-2xl max-w-md w-full shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">User ID</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <IoCloseOutline size={24} />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <code className="flex-1 p-3 rounded-lg background-card-secondary overflow-auto">
                {userId}
              </code>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-lg background-card-secondary"
              >
                <IoMdCopy size={20} />
              </motion.button>
            </div>

            <AnimatePresence>
              {copySuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-500 text-sm text-center"
                >
                  Copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Accounts() {
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      if (user.hasImage) {
        setUserImage(user.imageUrl);
      }
      
      setUserName(user.username || `${user.firstName} ${user.lastName}`);
    }
  }, [user, isLoaded]);

  const authUtility = userId ? (
    <SignOutButton class="w-max button flex-1 mx-4 py-2" redirectUrl="./accounts"/>
  ) : (
    <>
      <TransitionLinkBackNav class="w-max button flex-1 mx-4 py-2" href="./signIn">Sign In</TransitionLinkBackNav>
      <TransitionLinkBackNav class="w-max button-secondary flex-1 mr-4 py-2" href="./signUp">Sign Up</TransitionLinkBackNav>
    </>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const profileCardVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      scale: 1.02,
      x: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  if (!isLoaded) {
    return <div className="h-[calc(100dvh-45px)] flex justify-center items-center">
      <DepxTechLoading />
    </div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="overflow-hidden"
    >
      {userId ? (
        <motion.div 
          variants={profileCardVariants}
        className="flex p-4 my-8 m-2 rounded-2xl background-card justify-center items-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div className="w-16 h-16 flex items-center justify-center">
          {userImage ? (
            <motion.img 
              className="rounded-full w-16 h-16 object-cover"
              src={userImage}
              alt={`${userName}'s avatar`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            />
          ) : (
            <motion.div
              initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
              <FaUserCircle size={64} className="opacity-50" />
            </motion.div>
          )}
        </motion.div>
        &nbsp;&nbsp;
        <div className="flex-1">
          <h3 className="">{userName}</h3>
          {userId && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              ID: {userId.slice(0, 8)}...
            </motion.button>
          )}
        </div>
        &nbsp;&nbsp;
        {user &&
          <TransitionLinkBackNav href="profile" >
            <TbSettings2 className="rotate-90" size={24}/>
          </TransitionLinkBackNav>
        }
        </motion.div>
      ) : (
          <TransitionLinkBackNav href="signIn?redirect_url=/accounts" className="w-full py-[12px] px-1 card-feedback rounded-xl">

<motion.div 
          variants={profileCardVariants}
        className="flex p-4 my-8 m-2 rounded-2xl background-card justify-center items-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div className="w-16 h-16 flex items-center justify-center">
          {userImage ? (
            <motion.img 
              className="rounded-full w-16 h-16 object-cover"
              src={userImage}
              alt={`${userName}'s avatar`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            />
          ) : (
            <motion.div
              initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
              <FaUserCircle size={64} className="opacity-50" />
            </motion.div>
          )}
        </motion.div>
        &nbsp;&nbsp;
        <div className="flex-1">
          <h3 className="">{userName}</h3>
          {userId && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              ID: {userId.slice(0, 8)}...
            </motion.button>
          )}
        </div>
        &nbsp;&nbsp;
        {user &&
          <TransitionLinkBackNav href="profile" >
            <TbSettings2 className="rotate-90" size={24}/>
          </TransitionLinkBackNav>
        }
        </motion.div>
          </TransitionLinkBackNav>
      )}

      <CopyModal 
        userId={userId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <motion.div 
        variants={cardVariants}
        className="background-card rounded-t-2xl rounded-b-md m-2 p-4 flex flex-col font-bold"
      >
        <div className="flex-1"/>
        <motion.div
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <TransitionLinkBackNav href="accounts/orders" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <BsJournalText className="mx-2" size={20}/>
            </motion.div>
            <small className="mx-2">My Orders</small>
            <div className="flex-1"/>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <IoIosArrowForward className="mx-1" size={14} />
            </motion.div>
          </TransitionLinkBackNav>
        </motion.div>
        <TransitionLinkBackNav href="accounts/myReviews" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <FiStar className="mx-2" size={20}/>
          <small className="mx-2">My Reviews</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/address" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <HiOutlineLocationMarker className="mx-2" size={20}/>
          <small className="mx-2">My Address</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/coupons" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <RiCoupon3Line className="mx-2" size={20}/>
          <small className="mx-2">My Coupons & Offers</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="accounts/trade-ins" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <RiExchange2Line className="mx-2" size={20}/>
          <small className="mx-2">My Trade Ins</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <div className="flex-1"/>
      </motion.div>

      <motion.div 
        variants={cardVariants}
        className="background-card rounded-t-md rounded-b-2xl m-2 p-2 py-4 flex flex-col font-bold"
      >
        <div className="flex-1"/>
        <motion.div
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <TransitionLinkBackNav href="accounts/about" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <GrCircleQuestion className="mx-2" size={20}/>
            </motion.div>
            <small className="mx-2">About Us</small>
            <div className="flex-1"/>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <IoIosArrowForward className="mx-1" size={14} />
            </motion.div>
          </TransitionLinkBackNav>
        </motion.div>
        <TransitionLinkBackNav href="accounts/version" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <IoMdInformationCircleOutline className="mx-2" size={20}/>
          <small className="mx-2">App Version</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <TransitionLinkBackNav href="support" className="flex w-full py-[12px] px-1 card-feedback rounded-xl">
          <RiCustomerServiceLine className="mx-2" size={20}/>
          <small className="mx-2">Customer Service</small>
          <div className="flex-1"/>
          <IoIosArrowForward className="mx-1" size={14} />
        </TransitionLinkBackNav>
        <div className="flex-1"/>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {authUtility}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 100,
            damping: 12
          }
        }}
        viewport={{ once: true }}
      >
        <Recommends />
      </motion.div>
    </motion.div>
  );
}

