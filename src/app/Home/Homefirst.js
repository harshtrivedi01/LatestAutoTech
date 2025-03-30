"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Homefirst = ({ sliderList = [] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const totalSlides = sliderList.length;
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || totalSlides === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const getRedirectUrl = (module_category_id) => {
    const routes = {
      17: "/chadhava",
      5: "/poojabooking",
    };
    return routes[module_category_id] || "/";
  };

  const handleSlideClick = (index) => {
    const slide = sliderList[index];
    console.log("Clicked Slide Data:", slide);
    const url = getRedirectUrl(slide.module_category_id);
    if (url) router.push(url);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setAutoPlay(false);
  };

  if (totalSlides === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-center">{t("Noslidesavailableatthemoment")}</p>
      </div>
    );
  }

  return (
    <div id="carousel" className="relative w-full">
      {/* Carousel Wrapper */}
      <div
        ref={sliderRef}
        className="relative h-52 sm:h-72 md:h-[430px] overflow-hidden rounded-xl flex items-center"
      >
        {sliderList.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => handleSlideClick(index)}
            >
              <Image
                src={slide.slider || "/images/sliderbackground.jpg"}
                alt={`Slide ${slide.id}`}
                layout="fill"
                
                className="rounded- cursor-pointer  rounded-lg"
  onError={(e) => e.target.src = "/images/sliderbackground.jpg"}
              />
            </div>
          </div>
        ))}
      </div>

    {/* Left Navigation Button */}
<button
  onClick={prevSlide}
  className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 
             bg-white/50 text-black p-2 sm:p-3 rounded-full hover:bg-black/70 transition 
             z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
>
  <ChevronLeft size={20} className="sm:size-28" />
</button>

{/* Right Navigation Button */}
<button
  onClick={nextSlide}
  className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 
             bg-white/50 text-black p-2 sm:p-3 rounded-full hover:bg-black/70 transition 
             z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
>
  <ChevronRight size={20} className="sm:size-28" />
</button>


      {/* Dots Indicator */}
      <div className="absolute flex -translate-x-1/2 bottom-4 left-1/2 space-x-2 z-10">
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
