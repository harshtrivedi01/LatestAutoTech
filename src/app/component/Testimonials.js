"use client";

import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Fallback testimonials in case API data is missing
const fallbackTestimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://readymadeui.com/team-2.webp",
    testimonials_description:
      "Amazing service and highly recommended!\r\nThe staff was extremely professional and made everything seamless.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    image: "https://readymadeui.com/team-2.webp",
    testimonials_description:
      "I had a fantastic experience with this service!\r\nEverything was handled perfectly, and I will definitely come back.",
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "https://readymadeui.com/team-2.webp",
    testimonials_description:
      "Very satisfied with the results!\r\nHighly professional team and excellent service quality.",
  },
];

const Testimonials = ({ pujaData, detail }) => {
  const splideRef = useRef(null);
  const pathname = usePathname();
  const testimonials = pujaData || detail?.testimonials || fallbackTestimonials; // Use API data or fallback

  const isSpecialPage = pathname.includes("/cart","/poojadetail/");

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
    <div className={`py-10 ${isSpecialPage ? "bg-[#FFD7AA]" : "bg-[#FFDCC0]"} p-6 transition-all duration-300`}>
      <div className="mb-8 text-center">
        <h2 className="text-gray-800 text-[42px] font-bold">What Our Clients Say About Us</h2>
      </div>

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
          className="w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={testimonial.id || index}>
              <div className="p-6 mx-auto relative max-w-md mb-10 bg-white rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial?.image || "https://readymadeui.com/team-2.webp"}
                    className="w-14 h-14 rounded-full border-2 shadow"
                    alt={testimonial?.name || "Client"}
                  />
                  <div>
                    <h4 className="text-gray-800 text-lg font-semibold">{testimonial?.name || "Client Name"}</h4>
                  </div>
                </div>

                <p className="font-semibold text-black mt-4">
                  {testimonial?.testimonials_description
                    ? testimonial.testimonials_description.split("\r\n")[0].slice(0, 50) +
                      (testimonial.testimonials_description.split("\r\n")[0].length > 50 ? "..." : "")
                    : "It was a very good experience"}
                </p>

                <div className="mt-4">
                  <p className="text-sm text-black">
                    {testimonial?.testimonials_description?.split("\r\n")[1] ||
                      "The service was amazing. I never had to wait that long for my food."}
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
    </div>
  );
};

export default Testimonials;
