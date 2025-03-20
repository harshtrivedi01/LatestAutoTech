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
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [autoPlay, sliderList.length]);

  const handleDotClick = (i) => {
    setIndex(i);
    setAutoPlay(false);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      setIndex((prev) => (prev + 1) % sliderList.length);
      setAutoPlay(false);
    } else if (info.offset.x > 100) {
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

  // Set redirect URL based on module_category_id
  const getRedirectUrl = (module_category_id) => {
    // You can customize this logic however you want
    switch (module_category_id) {
      case 17:
        return "/poojabooking";
      case 4:
        return "/poojabox";
      default:
        return "/"; // fallback to home
    }
  };

  return (
    <div className="container lg:mx-auto px-0 sm:px-4 flex justify-center">
      <div className="p-0 relative w-full h-[496px] sm:min-h-[450px] xs:min-h-[400px] overflow-hidden rounded-lg">

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
            className="absolute flex justify-center items-center text-white text-center font-bold w-full h-full"
          >
            <Link href={getRedirectUrl(sliderList[index]?.module_category_id)} passHref>
              <img
                src={sliderList[index]?.slider || "/images/sliderbackground.jpg"}
                alt="slider image"
                className="w-full h-full object-contain cursor-pointer"
              />
            </Link>
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
