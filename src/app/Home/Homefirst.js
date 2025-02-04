'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from './../../../public/Assests/sliderbackground.jpg'
import Image from "next/image";
const slides = [
  { image: img, text: "Pooja Anytime Anywhere" },
  { image: img, text: "Pooja Anytime Anywhere" },
  { image: img, text: "Pooja Anytime Anywhere" },
];

const Homefirst = () => {
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
    <div className="relative w-full h-[596px] overflow-hidden rounded-lg">
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
             <Image
            src={slides[index].image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 -z-10"
          />
          <div className="bg-black/40 py-20 rounded-lg w-full h-[596px]">
            <p className=" text-center leading-tight">Pooja Anytime<br/> Anywhere</p>
            <br />
            <p className="text-xl text-center w-full">
              Join the divine Kumbh experience and book Pooja online seamlessly with the <br />
              Punyasetu App – your gateway to spiritual bliss!
            </p>
            <br />
            <button
              type="button"
              className="text-white font-bold rounded-full text-lg px-12 py-3"
              style={{ backgroundColor: '#FA8128' }}
            >
              Book Now
            </button>
          </div>
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
  );
};

export default Homefirst;
