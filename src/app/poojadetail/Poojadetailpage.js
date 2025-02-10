"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Section } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
];

export default function Poojadetailpage() {
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
    <section className="poojadetail">
    <div className="container">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Left Side - Image Slider */}
      <div className="md:col-span-1 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full flex justify-center items-center text-white text-center text-3xl font-bold bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          >
            <div className="h-[200px] w-full">
              <img
                className="w-full h-full rounded-xl"
                src="/images/BANNER.jpg"
                alt="Pooja Banner"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side - Content */}
      <div className="md:col-span-2 text-center md:text-left">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] dark:text-white">
          Saturday ‘City of Mahakaal’ Special
        </h5>

        <p className="border-b-2 border-[#BA1A1A] mx-auto md:mx-20 my-2 w-1/2"></p>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path
        </h5>

        <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">
          For mental and physical strength to destroy negativity in life.
        </p>

        <a
          href="#"
          className="inline-flex justify-center md:justify-start items-center w-full md:w-auto uppercase text-center px-6 py-3 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Participate
        </a>
      </div>
    </div>
    </div>
    </section>

  
  );
}
