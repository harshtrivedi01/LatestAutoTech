'use client';

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles

const Homeeight = () => {
  return (
    <div className="my-10">
      <div className="md:mb-12 mb-8 text-center">
        <h2 className="text-gray-800 text-[42px] font-bold">What Our Clients Say About Us</h2>
      </div>
      <Splide 
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
          arrows: true,
          pagination: true,
        }}
      >
        {[...Array(2)].map((_, index) => (
          <SplideSlide key={index}>
            <div className="p-6 mx-auto  relative max-w-md  shadow-xl">
              <div className="flex items-center gap-4">
                <img
                  src="https://readymadeui.com/team-2.webp"
                  className="w-14 h-14 rounded-full border-2 shadow shadow-2xl"
                  alt="Client"
                />
                <div>
                  <h4 className="text-gray-800 text-lg font-semibold">Pankaj Sharma</h4>
                
                </div>
              </div>

              
               <p className="font-semibold mt-4">
               It was a very good experience
               </p>
           

              <div className="mt-4">
                <p className=" text-s l">
                  The service was amazing. I never had to wait that long for my food.
                  The staff was friendly and attentive, and the delivery was impressively prompt.
                </p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Homeeight;
