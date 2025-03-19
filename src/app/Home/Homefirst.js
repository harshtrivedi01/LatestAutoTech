'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Homefirst = ({ sliderList = [] }) => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || sliderList.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderList.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [autoPlay, sliderList.length]);

  const handleDotClick = (i) => {
    setIndex(i);
    setAutoPlay(false); // Stop autoplay on manual navigation
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      // Swiped left (Next)
      setIndex((prev) => (prev + 1) % sliderList.length);
      setAutoPlay(false);
    } else if (info.offset.x > 100) {
      // Swiped right (Prev)
      setIndex((prev) => (prev - 1 + sliderList.length) % sliderList.length);
      setAutoPlay(false);
    }
  };

  if (sliderList.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No slides available at the moment.</p>
      </div>
    );
  }

  return (
<div className="container mx-auto flex justify-center">
  <div className="relative w-full max-w-7xl h-[596px] sm:min-h-[550px] xs:min-h-[500px] overflow-hidden rounded-lg">
  
    {/* Slide Animation */}
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute flex justify-center items-center text-white text-center font-bold w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${sliderList[index]?.slider || '/images/sliderbackground.jpg'})`
        }}
      >
        <div className="bg-black/40 py-16 sm:py-10 xs:py-6 rounded-lg w-full h-full flex flex-col items-center justify-center">
          <p className="text-4xl sm:text-3xl xs:text-2xl leading-tight px-3" data-translate>
            {sliderList[index]?.banner_content || "Pooja Anytime Anywhere"}
          </p>
          <br />
          <p className="text-lg sm:text-base xs:text-sm text-center w-11/12 sm:w-3/4" data-translate>
            {sliderList[index]?.description ||
              "Join the divine Kumbh experience and book Pooja online seamlessly with the Punyasetu App – your gateway to spiritual bliss!"}
          </p>
          <br />
          <Link href="/poojabooking">
            <button
              type="button"
              data-translate
              className="text-white font-bold rounded-full text-lg sm:text-base xs:text-sm px-10 py-3 sm:px-8 sm:py-2 xs:px-6 xs:py-1"
              style={{ backgroundColor: "#FA8128" }}
            >
              {sliderList[index]?.button_name || "Book Now"}
            </button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  
    {/* Dots Indicator */}
    <div className="absolute bottom-8 xs:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {sliderList.map((_, i) => (
        <button
          key={i}
          onClick={() => handleDotClick(i)}
          className={`w-3 h-3 xs:w-2 xs:h-2 rounded-full transition-all ${
            index === i ? "bg-orange-400 scale-125" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
  </div>
  
  );
};

export default Homefirst;
