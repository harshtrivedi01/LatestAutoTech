"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles

const Homesix = () => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 3, // Default: 3 slides
        focus: "center",
        padding: { left: "2rem", right: "2rem" },
        gap: "2rem",
        height: "40rem",
        arrows: false, // Disable default arrows (we use custom below)
        pagination: false,
        autoplay: true, // Auto slide for better UX
        interval: 3000, // Slide every 3 seconds
        breakpoints: {
          1280: { perPage: 2, padding: { left: "1.5rem", right: "1.5rem" } }, // Laptops & Tablets
          1024: { perPage: 1, padding: { left: "1rem", right: "1rem" } }, // Tablets
          768: { perPage: 1, padding: { left: "0.5rem", right: "0.5rem" }, height: "30rem" }, // Mobile
          480: { perPage: 1, padding: { left: "0rem", right: "0rem" }, height: "25rem" }, // Small Mobile
        },
      }}
    >
      {[...Array(4)].map((_, index) => (
        <SplideSlide key={index}>
          <div
            className="slide-item rounded-[190px] p-4 flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url('/Assests/Service/image.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
              <div className="my-3 font-display w-full rounded-2xl">
                <h1 className="text-xl text-start sm:text-2xl md:text-2xl font-bold text-black">
                  Perform Puja with <br />
                  <span className="text-[#FD1818]">Amazing Offers</span>
                </h1>
              </div>
              <p className="mt-1.5 text-start text-sm sm:text-base md:text-base leading-6 text-black">
                Our experienced Pandits perform each ceremony with care and
                devotion, ensuring a meaningful experience for you and your
                loved ones. With our dedication to Sanatan Dharma and
                authenticity, we believe that each ritual should be done with
                devotion and purpose, making every ceremony special and
                impactful.
              </p>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Homesix;
