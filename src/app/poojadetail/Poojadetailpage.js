"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import './Poojadetail.css';
import Content from "./Content";
import Benifit from "./Benifit";
import PoojaPackage from "./PoojaPackage";
import Faq from "./Faq";
import Homeeight from "../Home/Homeeight";

const slides = [
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
];

export default function Poojadetailpage() {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeTab, setActiveTab] = useState("content"); // "content" or "benifit"

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleDotClick = (i) => {
    setIndex(i);
    setAutoPlay(true); // Stop autoplay on manual navigation
  };

  return (
    <>
      <section className="poojadetail p-60">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Side - Image Slider */}
            <div className="md:col-span-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ x: "0%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "30%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full flex justify-center items-center text-white text-center text-3xl font-bold bg-cover bg-center rounded-xl"
                  style={{ backgroundImage: `url(${slides[index].image})` }}
                >
                  <div className="h-[200px] w-full img-ratio">
                    <img
                      className="w-full h-full"
                      src="/images/banner.png"
                      alt="Pooja Banner"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Content */}
            <div className="md:col-span-1 text-center md:text-left">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] dark:text-white">
                Saturday ‘City of Mahakaal’ Special
              </h5>

              <p className="border-b-2 border-[#BA1A1A] my-2 w-1/2"></p>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path
              </h5>

              <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">
                For honor this sacred occasion, Sri Mandir is organizing the Shatru Samhara Murugan Trishati Homa and Paal Kudam Abhishekam at the Etteluthuperumal Temple in Tirunelveli. The Shatru Samhara Trishati Homa, meaning "destruction of enemies," is a powerful ritual dedicated to removing obstacles, eliminating negativity, and ensuring spiritual protection.
              </p>

              <a
                href=""
                id="package"
                className="w-full block uppercase text-center px-6 py-3 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Select Pooja package
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <div className="container  mt-10">
        <div className="flex justify-center  space-x-4 border-b">
         
          <button
            className={`px-6 py-3 w-full font-medium ${
              activeTab === "benifit" ? "text-white bg-red-600 rounded-t-lg" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("benifit")}
          >
           Pooja Benefit
          </button>

          <button
            className={`px-6 py-3 w-full font-medium ${
              activeTab === "content" ? "text-white bg-red-600 rounded-t-lg" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("content")}
          >
            About Pooja 
          </button>
        </div>

        <div className="p-5 bg-gray-100 rounded-b-lg">
          {activeTab === "content" && <Content />}
          {activeTab === "benifit" && <Benifit />}
        </div>
      </div>

      <PoojaPackage />
      <Faq />
      <Homeeight />
      <Downlo
    </>
  );
}
