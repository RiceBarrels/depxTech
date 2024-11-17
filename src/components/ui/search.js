"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { TransitionLinkBackNav } from "../client/pageTransition";

// Animation variants
const itemVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  show: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.5
    }
  }
};

// Blur data URL generator
function generateBlurDataURL() {
  return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/svg" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23f0f0f0"/></svg>`;
}

export default function Search() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 1000);

  useEffect(() => {
    if (searchInput.length >= 2) {
      setIsTyping(true);
      setLoading(false);
    }
  }, [searchInput]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.length < 2) {
        setSearchResults([]);
        setIsTyping(false);
        return;
      }

      setIsTyping(false);
      setLoading(true);
      
      try {
        const response = await fetch(`https://api.depxtech.com/search?q=${debouncedSearch}&limit=10&filter_sellBySelf=1`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    <div className="fixed top-[48px] w-[100vw] z-[102]">
      <motion.div 
        className={"background-card rounded-b-3xl p-2 text-center w-full fixed z-[102] border-[#88888850] border-t-0 transition-all duration-100" + (isSearchActive ? " pt-4" : "pt-0")}
        animate={{boxShadow: isSearchActive ? "" : "0 0 12px 2px #88888888"}}
        onClick={() => document.getElementById("search-input").focus()}
      >
        <motion.input 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent rounded-full px-4 py-2 outline-none"
          id="search-input"
          transition={{ duration: 0.2, ease:"easeInOut" }}
          animate={{ transform: isSearchActive ? "scale(1.02)" : "" }}
          onFocus={() => setIsSearchActive(true)} 
          onBlur={() => {
            setTimeout(() => setIsSearchActive(false), 200);
          }} 
        />
      </motion.div>
  
      <motion.div
        animate={{ 
          top: isSearchActive ? "0px" : "-70vh",
          boxShadow: isSearchActive ? "0 0 12px 2px #88888888" : "0 0 0 1px #787878",
          opacity: isSearchActive ? 1 : 0
        }}
        transition={{ duration: 0.3, ease:"easeOut" }}
        style={{ top: "-45vh", width: "100vw", height: "45vh", position: "fixed", zIndex: 101 }}
        className="w-full background-card rounded-b-3xl overflow-auto pt-24"
      >
        {isTyping ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Typing</span>
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="text-gray-400"
              >
                ...
              </motion.div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin text-2xl">⚡</div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="divide-y divide-[#88888888]">
            {searchResults.map((result) => {
              const images = result.imgs ? JSON.parse(result.imgs) : [];
              
              return (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  className="w-full"
                >
                  <TransitionLinkBackNav
                    href={`/products/${result.title}`}
                    className="flex items-center p-4 hover:bg-gray-100/5 transition-colors"
                  >
                    <div className="w-16 h-16 relative flex-shrink-0">
                      {images.length === 0 ? (
                        <div className="w-full h-full bg-gray-200 rounded-md" />
                      ) : (
                        <Image 
                          src={`https://src.depxtech.com/${images[0]}`}
                          fill
                          alt={result.title || 'Product image'}
                          className="object-contain rounded-md"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL()}
                          sizes="(max-width: 768px) 64px, 64px"
                          quality={60}
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {result.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {result.available} available | {result.solds} sold
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-right">
                      <p className="text-lg font-bold">
                        <span className="text-sm font-medium align-top">$</span>
                        {result.price}
                      </p>
                    </div>
                  </TransitionLinkBackNav>
                </motion.div>
              );
            })}
          </div>
        ) : searchInput.length >= 2 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No results found</p>
          </div>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ backdropFilter: "blur(0)"}}
        animate={{ 
          display: isSearchActive ? "block" : "none", 
          backdropFilter: isSearchActive ? "blur(4px)" : "blur(0)",
          opacity: isSearchActive ? 1 : 0
        }}
        transition={{ duration: 0.25 }}
        style={{ top: 0, width: "100vw", height: "100vh", position: "fixed", zIndex: 100 }}
      />
    </div>
  );
}
