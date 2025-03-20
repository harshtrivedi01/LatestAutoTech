'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Homefirst = ({ sliderList = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const totalSlides = sliderList.length;

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!autoPlay || totalSlides === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const handleDotClick = (i) => {
    setCurrentIndex(i);
    setAutoPlay(false); // Pause auto-play when user interacts
  };


  // Get redirect URL based on module_category_id
  const getRedirectUrl = (module_category_id) => {
    const routes = {
      5: "/poojabooking",
      19: "/poojabox",
    };
    return routes[module_category_id] || "/";
  };

  if (totalSlides === 0) {
    return (
      <div className="text-center py-8">
        <p>No slides available at the moment.</p>
      </div>
    );
  }

  return (
    <div id="carousel" className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="container relative h-56 sm:h-72 md:h-96 overflow-hidden rounded-lg">
        {sliderList.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href={getRedirectUrl(slide.module_category_id)}>
              <Image
                src={slide.slider || "/images/sliderbackground.jpg"}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="fill"
                className="rounded-lg cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
        {sliderList.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i ? "bg-orange-400 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Homefirst;