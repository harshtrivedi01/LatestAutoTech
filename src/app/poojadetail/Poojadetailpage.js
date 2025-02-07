
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { useEffect, useState } from "react";

const slides = [
    { image: "img", text: "Pooja Anytime Anywhere" },
    { image: "img", text: "Pooja Anytime Anywhere" },
    { image: "img", text: "Pooja Anytime Anywhere" },
  ];

export default function Poojadetailpage (){
    const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleDotClick = (i) => {
    setIndex(i);
    setAutoPlay(false); // Stop autoplay on manual navigation
  };
    return (
        <>
  <div className="relative w-full h-[496px] overflow-hidden rounded-lg">
      {/* Slide Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute  flex justify-center items-center   text-white text-center text-6xl font-bold w-full  bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
             
             <li className="h-[200px]">
    <div className=" flex bg-white  rounded-lg shadow-sm">
  <a href="#">
    <img className="w-full h-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
  </a>
  <div className="p-5">
  <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-start  dark:text-white">Saturday ‘City of Mahakaal’ Special</h5>
    </a>
    <p className="border-b-2 border-[#BA1A1A] w-60 my-2"></p>
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-start text-gray-900 dark:text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
    <a href="/poojadetail" 
    className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Participate
    
    </a>
  </div>
</div>

    </li>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator (Clickable) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-orange-400 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
        </>
    )
}
