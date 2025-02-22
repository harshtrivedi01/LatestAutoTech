'use client';

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles

const SliderOne = ({ testimonials }) => {
  return (
    <div className="my-10 py-10 bg-[#FFDCC0]">
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
        {/* Loop through testimonials */}
        {testimonials?.map((testimonial, index) => (
          <SplideSlide key={testimonial.id || index}>
            <div className="p-6 mx-auto relative rounded-lg bg-white max-w-md shadow-xl">
              <div className="flex items-center gap-4">
                {/* Client image */}
                <img
                  src={testimonial?.image || "https://readymadeui.com/team-2.webp"} // Default image if no image provided
                  className="w-14 h-14 rounded-full border-2 shadow shadow-2xl"
                  alt={testimonial?.name || "Client"}
                />
                <div>
                  {/* Client name */}
                  <h4 className="text-gray-800 text-lg font-semibold">{testimonial?.name || "Client Name"}</h4>
                </div>
              </div>

              {/* Testimonial short description */}
              <p className="font-semibold text-black mt-4">
                {testimonial?.testimonials_description?.split('\r\n')[0] || "It was a very good experience"}
              </p>

              {/* Full testimonial description */}
              <div className="mt-4">
                <p className="text-sm text-black">
                  {testimonial?.testimonials_description?.split('\r\n')[1] || "The service was amazing. I never had to wait that long for my food."}
                </p>
              </div>
            </div>
          </SplideSlide>
        )) 
        }
      </Splide>
      <br/>
    </div>
  );
};

export default SliderOne;
