"use client";

import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Fallback mock testimonials data when API is not working
const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    heading: "Exceptional Service Quality",
    testimonials_description: "The puja arrangements were outstanding! The pandits were well-trained and the entire ceremony was conducted with utmost devotion and professionalism. Highly recommended for anyone seeking authentic rituals.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    heading: "Very Professional Team",
    testimonials_description: "Amazing experience! The team was punctual, respectful, and ensured every detail was perfect. The prayers felt meaningful and sacred. I will definitely book again for my family celebrations.",
  },
  {
    id: 3,
    name: "Amit Patel",
    heading: "Best Pooja Service",
    testimonials_description: "I was impressed by the dedication and knowledge of the pandits. They explained each ritual beautifully and made the entire experience spiritual and memorable. Great service overall!",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    heading: "Highly Satisfied",
    testimonials_description: "The booking process was smooth and the execution was flawless. The pandits completed the puja with precision and devotion. Truly a blessing to have found such a reliable service.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    heading: "Trustworthy & Reliable",
    testimonials_description: "Everything was handled professionally. From customization options to the actual ceremony, every step was well-organized. I had complete peace of mind throughout the entire process.",
  },
  {
    id: 6,
    name: "Ananya Verma",
    heading: "Outstanding Experience",
    testimonials_description: "The pandits were knowledgeable and performed the rituals with great attention to detail. The whole team was courteous and helpful. Would definitely recommend to my friends and family.",
  },
];

const Homeeight = ({ pujaData, detail }) => {
  const { t } = useTranslation();
  const splideRef = useRef(null); // Reference for Splide instance
  const pathname = usePathname(); 
  
  // Use API data if available, otherwise fall back to mock data
  const testimonials = (pujaData?.data?.testimonials || detail?.testimonials || []).length > 0
    ? (pujaData?.data?.testimonials || detail?.testimonials)
    : MOCK_TESTIMONIALS;

  const isSpecialPage = pathname.includes("/poojadetail/");

  useEffect(() => {
    if (splideRef.current) {
      setTimeout(() => {
        const pagination = document.querySelector(".splide__pagination");
        if (pagination) {
          pagination.classList.add("flex", "justify-center", "items-center", "gap-2");
          pagination.style.display = "flex";
        }
      }, 100);
    }
  }, []);


  return (
    <div className={`py-10 ${isSpecialPage ? "bg-[#FFDCC0] " : "bg-white"}  p-6 transition-all  duration-300`}>
  
      <div className="mb-8 text-center">
        <h2 className="text-gray-800 text-[42px] font-bold">
        {t("WhatOurClientsSayAboutUs")}
        </h2>
      </div>

      <div className="  container max-w-7xl  mx-auto relative w-full  ">
        {/* Slider */}
        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 3,
            breakpoints: {
              1024: { perPage: 2 },
              768: { perPage: 1 },
              480: { perPage: 1 },
            },
            focus: "center",
            padding: { left: "1rem", right: "1rem" },
            gap: "1rem",
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            arrows: false, // Disable default arrows (we use custom below)
            pagination: true, // Keep pagination (dots)
          }}
          className="w-full "
        >
          {testimonials && testimonials.length > 0 ? (
  testimonials.map((testimonial, index) => (
    <SplideSlide key={testimonial.id || index}>
    <div className="p-6 mx-auto relative max-w-md mb-10 bg-white rounded-lg shadow-lg min-h-[260px]">
      <div className="flex items-center gap-4">
        {/* Client image */}
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
          }
          className="w-14 h-14 rounded-full border-2 shadow object-contain"
          alt={testimonial?.name || "Client"}
          onError={(e) => (e.target.src = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg")}
        />
        <div>
          {/* Client name */}
          <h4 className="text-gray-800 text-lg font-semibold">
            {testimonial?.name || "Client Name"}
          </h4>
        </div>
      </div>
  
      <p className="font-semibold text-black mt-4">
                  {testimonial?.heading || "It was a very good experience"}
                </p>
      {/* Testimonial short description */}
      <p className="text-sm text-black mt-4">
        {testimonial?.testimonials_description
          ? testimonial.testimonials_description.split("\r\n")[0].slice(0, 200) +
            (testimonial.testimonials_description.split("\r\n")[0].length > 200 ? "..." : "")
          : "It was a very good experience"}
      </p>
  
      
    </div>
  </SplideSlide>
  
  ))
) : (
  <div className="text-center text-gray-500 text-lg font-semibold py-10">No data available</div>
)}

        </Splide>

        {/* Custom Navigation Below */}
        <div className="flex justify-center items-center absolute -bottom-2 inset-x-0  gap-8">
          {/* Left Arrow */}
          <button
            className="text-2xl text-gray-700 p-2 rounded-full"
            onClick={() => splideRef.current.splide.go("-1")}
          >
            <IoIosArrowBack   className="text-3xl"/>
          </button>

          {/* Pagination (Dots - Auto-generated by Splide) */}
          <div className="splide__pagination "></div>

          {/* Right Arrow */}
          <button
            className=" text-gray-700 p-2 rounded-full"
            onClick={() => splideRef.current.splide.go("+1")}
          >
          <IoIosArrowForward className="text-3xl" />

          </button>
        </div>
      </div>
    </div>
  );
};

export default Homeeight;
