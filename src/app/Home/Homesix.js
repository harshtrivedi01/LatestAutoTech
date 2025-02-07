"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles


const  Homesix= () => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 3,
        focus: "center",
        padding: { left: "2rem", right: "2rem" }, // Side padding
        gap: "2rem",
        height  : "40rem",
        breakpoints: {
          768: { perPage: 1 }, // Responsive behavior
        },
      }}
    >
      <SplideSlide className>
        <div className="slide-item rounded-[290px]" 
            style={{ backgroundImage: `url('/Assests/Service/image.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>  
          <div className="w-80 z-10">
          
          <div className="my-3 font-display w-96 rounded-2xl">
            <h1 className="text-2xl font-bold text-start text-black">
            Perform Puja with <br/>
          <span className="text-[#FD1818]">Amazing Offers</span>
            </h1>
          </div>
          <p className="mt-1.5 text-[17px] text-start leading-6 mx-2 text-black">
          Our experienced Pandits perform each ceremony with care and devotion, 
          ensuring a meaningful experience for you and your loved ones. With our dedication
           to Sanatan Dharma and authenticity, we believe that each ritual should be done with 
           devotion and purpose, making every ceremony special and impactful.
          </p>
        
        </div></div>
      </SplideSlide>
      <SplideSlide>
        <div className="slide-item rounded-[190px]"     style={{ backgroundImage: `url('/Assests/Service/image.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>  
          <div className="w-80 z-10">
          
          <div className="my-3 font-display w-80 rounded-2xl">
            <h1 className="text-2xl font-bold text-start bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
            Perform Puja with
            Amazing Offers
            </h1>
          </div>
          <p className="mt-1.5 text-[15px] text-start leading-6 mx-2 text-black">
          Our experienced Pandits perform each ceremony with care and devotion, 
          ensuring a meaningful experience for you and your loved ones. With our dedication
           to Sanatan Dharma and authenticity, we believe that each ritual should be done with 
           devotion and purpose, making every ceremony special and impactful.
          </p>
        
        </div></div>
      </SplideSlide>
      <SplideSlide>
        <div className="slide-item rounded-[190px]"     style={{ backgroundImage: `url('/Assests/Service/image.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>  
          <div className="w-80 z-10">
          
          <div className="my-3 font-display w-80 rounded-2xl">
            <h1 className="text-2xl font-bold text-start bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
            Perform Puja with
            Amazing Offers
            </h1>
          </div>
          <p className="mt-1.5 text-[15px] text-start leading-6 mx-2 text-black">
          Our experienced Pandits perform each ceremony with care and devotion, 
          ensuring a meaningful experience for you and your loved ones. With our dedication
           to Sanatan Dharma and authenticity, we believe that each ritual should be done with 
           devotion and purpose, making every ceremony special and impactful.
          </p>
        
        </div></div>
      </SplideSlide>
      <SplideSlide>
        <div className="slide-item rounded-[190px]"     style={{ backgroundImage: `url('/Assests/Service/image.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>  
          <div className="w-80 z-10">
          
          <div className="my-3 font-display w-80 rounded-2xl">
            <h1 className="text-2xl font-bold text-start bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
            Perform Puja with
            Amazing Offers
            </h1>
          </div>
          <p className="mt-1.5 text-[15px] text-start leading-6 mx-2 text-black">
          Our experienced Pandits perform each ceremony with care and devotion, 
          ensuring a meaningful experience for you and your loved ones. With our dedication
           to Sanatan Dharma and authenticity, we believe that each ritual should be done with 
           devotion and purpose, making every ceremony special and impactful.
          </p>
        
        </div></div>
      </SplideSlide>
    </Splide>
  );
};

export default Homesix;
