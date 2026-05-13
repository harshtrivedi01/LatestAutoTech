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

    const newsData = [
    {
      id: 1,
      title:
        "Hyundai Confirms 2 New SUV Launches This FY – Mid SUV and Compact EV SUV",
      category: "CAR NEWS",
      author: "Satya Singh",
      date: "May 9, 2026",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      large: true,
    },
    {
      id: 2,
      title:
        "Royal Enfield Plans 18 Launches (5 New Bikes, 13 Updates)",
      category: "BIKE NEWS",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title:
        "Suzuki Swift Hydrogen Showcased At 2026 Vienna Motor Symposium",
      category: "CAR NEWS",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title:
        "2026 Maruti Brezza Facelift Spied Along With New Car",
      category: "CAR NEWS",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title:
        "Hyundai Celebrates 30 Years In India – Future Investment Announced",
      category: "CAR NEWS",
      image:
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    // <div id="carousel" className="relative w-full  container max-w-7xl mt-5  mx-auto">
    //   {/* Carousel Wrapper */}
    //   <div
    //     ref={sliderRef}
    //     className="relative w-full overflow-hidden rounded-xl flex items-center 
    //                aspect-[4/2] sm:aspect-[5/2] md:aspect-[16/4] lg:aspect-[16/4] xl:aspect-[21/6]"
    //   >
    //     {[...Array(totalSlides)].map((_, index) => {
    //       const { mobile, desktop } = getBannerImage(index);

    //       return (
    //         <div
    //           key={index}
    //           className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
    //             index === currentIndex ? "opacity-100 z-10" : "opacity-0"
    //           }`}
    //         >
    //           <div
    //             className="relative w-full h-full cursor-pointer"
    //             onClick={() => router.push(mobile.url)}
    //           >
    //             {/* Mobile Image */}
    //             <div className="block sm:hidden">
    //               <Image
    //                 src={mobile.src}
    //                 alt={`Slide ${index + 1}`}
    //                 layout="fill"
    //                 className="rounded-lg cursor-pointer object-cover"
    //               />
    //             </div>

    //             <div className="hidden sm:block" onClick={() => router.push(desktop.url)}>
    //               <Image
    //                 src={desktop.src}
    //                 alt={`Slide ${index + 1}`}
    //                 layout="fill"
    //                 className="rounded-lg cursor-pointer object-cover"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {/* Left Navigation Button */}
    //   <button
    //     onClick={prevSlide}
    //     className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 
    //              bg-white/50 text-black p-2 sm:p-3 rounded-full hover:bg-black/70 transition 
    //              z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
    //   >
    //     <ChevronLeft size={20} className="sm:size-28" />
    //   </button>

    //   {/* Right Navigation Button */}
    //   <button
    //     onClick={nextSlide}
    //     className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 
    //              bg-white/50 text-black p-2 sm:p-3 rounded-full hover:bg-black/70 transition 
    //              z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
    //   >
    //     <ChevronRight size={20} className="sm:size-28" />
    //   </button>

    //   {/* Dots Indicator */}
    //   <div className="absolute flex -translate-x-1/2 bottom-4 left-1/2 space-x-2 z-10">
    //     {[...Array(totalSlides)].map((_, i) => (
    //       <button
    //         key={i}
    //         onClick={() => handleDotClick(i)}
    //         className={`w-3 h-3 rounded-full transition-all ${
    //           currentIndex === i ? "bg-orange-400 scale-125" : "bg-gray-400"
    //         }`}
    //       />
    //     ))}
    //   </div>
    // </div>

       <div className="  py-5">
      <div className="max-w-6xl mx-auto px-4">
        
    

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
          
          {/* Left Large Card */}
          <div className="lg:col-span-2 relative group overflow-hidden h-[220px] lg:h-[420px]">
            <img
              src={newsData[0].image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span className="bg-black text-white text-xs font-semibold px-3 py-1 inline-block mb-4">
                {newsData[0].category}
              </span>

             <h2 className="text-white text-xl sm:text-3xl md:text-4xl leading-snug md:leading-tight font-semibold mb-4 break-words">
  {newsData[0].title}
</h2>

              <p className="text-white text-sm font-medium">
                {newsData[0].author} - {newsData[0].date}
              </p>
            </div>
          </div>

          {/* Right Side Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-1">
            {newsData.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden group h-[209px]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-5 z-10">
                  {/* <span className="bg-black text-white text-[11px] font-semibold px-3 py-1 inline-block mb-3">
                    {item.category}
                  </span> */}

              <h3 className="text-white text-[14px] sm:text-lg md:text-[15px] leading-snug font-semibold break-words">
  {item.title}
</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default Homefirst;
