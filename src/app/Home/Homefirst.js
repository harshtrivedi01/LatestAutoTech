"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Homefirst = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const totalSlides = 2; // Since we have 2 images per language
  const sliderRef = useRef(null);

  // Detect current language
  const currentLanguage = i18n.language; // "en" or "hi"

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setAutoPlay(false);
  };

  
  // Manually define banners and URLs
  const getBannerImage = (index) => {
    const banners = {
      en: {
        mobile: [
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/poojabooking" },
          { src: "https://img.freepik.com/premium-psd/breaking-news-template-news-banner-design-news-notification_451189-1762.jpg", url: "/chadhava" },
        ],
        desktop: [
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/poojabooking" },
          { src: "https://img.freepik.com/premium-psd/breaking-news-template-news-banner-design-news-notification_451189-1762.jpg", url: "/chadhava" },
        ],
      },
      hi: {
        mobile: [
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/poojabooking" },
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/chadhava" },
        ],
        desktop: [
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/poojabooking" },
          { src: "https://img.freepik.com/free-psd/new-smartphone-social-media-cover-design-template_47987-25433.jpg", url: "/chadhava" },
        ],
      },
    };

    const langKey = banners[currentLanguage] ? currentLanguage : "en";
    return {
      mobile: banners[langKey].mobile[index % 2],
      desktop: banners[langKey].desktop[index % 2],
    };
  };

  return (
    <div id="carousel" className="relative w-full  container max-w-7xl mt-5  mx-auto">
      {/* Carousel Wrapper */}
      <div
        ref={sliderRef}
        className="relative w-full overflow-hidden rounded-xl flex items-center 
                   aspect-[4/2] sm:aspect-[5/2] md:aspect-[16/4] lg:aspect-[16/4] xl:aspect-[21/6]"
      >
        {[...Array(totalSlides)].map((_, index) => {
          const { mobile, desktop } = getBannerImage(index);

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0"
              }`}
            >
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => router.push(mobile.url)}
              >
                {/* Mobile Image */}
                <div className="block sm:hidden">
                  <Image
                    src={mobile.src}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    className="rounded-lg cursor-pointer object-cover"
                  />
                </div>

                <div className="hidden sm:block" onClick={() => router.push(desktop.url)}>
                  <Image
                    src={desktop.src}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    className="rounded-lg cursor-pointer object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
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
        {[...Array(totalSlides)].map((_, i) => (
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
