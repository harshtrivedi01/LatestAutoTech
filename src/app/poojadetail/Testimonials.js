"use client";

import React, { useRef, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import api from "../lib/axiosInstance";
import { useTranslation } from "react-i18next";



const Testimonials = () => {
  const { t } = useTranslation();
  const splideRef = useRef(null);
  const pathname = usePathname();
 

  const isSpecialPage = pathname.includes("/cart","/poojadetail/");

  const [pujaData, setPujaData] = useState([]);
  
    useEffect(() => {
      fetchPujaData();
    }, []);
  
    const fetchPujaData = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "testimonials");
  
        const response = await api.post("/testimonials", formData);
        setPujaData(response.data.data.testimonials);

      } catch (error) {
        console.error("Error fetching puja data:", error);
      }
    };

    const testimonials =
    pujaData?.length > 0 ? pujaData : null;
  
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
  <div className={`py-10 ${isSpecialPage ? "bg-[#FFD7]" : "bg-[#FFDCC0]"}  transition-all duration-300`}>
    <div className="mb-8 text-center">
    <h2 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold">
  {t("WhatOurClientsSayAboutUs")}
</h2>

    </div>
<br/>
    {testimonials ? (
      <div className="relative w-full mx-auto">
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
            arrows: false,
            pagination: true,
          }}
          className="container max-w-7xl w-full "
        >
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={testimonial.id || index}>
             <div className="p-6 mx-auto relative max-w-md mb-10 bg-white rounded-lg shadow-lg min-h-[240px]">
                <div className="flex items-center gap-4">
                  <img
                    // src={testimonial?.image || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                    src={ "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                    className="w-14 h-14 rounded-full border-2 shadow object-contain"
                    alt={testimonial?.name || "Client"}
                    onError={(e) => (e.target.src = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg")}
                  />
                  <div>
                    <h4 className="text-gray-800 text-lg font-semibold">{testimonial?.name }</h4>
                  </div>
                </div>

                <p className="font-semibold text-black mt-4">
                  {testimonial?.heading || "It was a very good experience"}
                </p>

                <div className="mt-4">
                <p className="text-black text-sm mt-4">
        {testimonial?.testimonials_description
          ? testimonial.testimonials_description.split("\r\n")[0].slice(0, 150) +
            (testimonial.testimonials_description.split("\r\n")[0].length > 150 ? "..." : "")
          : "It was a very good experience"}
      </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
        <div className="flex justify-center items-center absolute -bottom-2 inset-x-0 gap-8">
          <button className="text-2xl text-gray-700 p-2 rounded-full" onClick={() => splideRef.current.splide.go("-1")}>
            <IoIosArrowBack className="text-3xl" />
          </button>

          <div className="splide__pagination"></div>

          <button className="text-gray-700 p-2 rounded-full" onClick={() => splideRef.current.splide.go("+1")}>
            <IoIosArrowForward className="text-3xl" />
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center py-6">
        <p className="text-xl font-semibold text-gray-700">Data not available</p>
      </div>
    )}
  </div>
);

};

export default Testimonials;
