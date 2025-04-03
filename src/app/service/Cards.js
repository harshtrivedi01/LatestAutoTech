"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css"; // Ensure styles are loaded

export default function Cards({ onlinepoojawork }) {
  const { t, i18n } = useTranslation();
  const glideRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (glideRef.current) {
      const glideInstance = new Glide(glideRef.current, {
        type: "carousel",
        perView: 1,
        autoplay: 3000,
        hoverpause: true,
      });

      glideInstance.on("run.after", () => {
        setActiveIndex(glideInstance.index);
      });

      glideInstance.mount();

      return () => glideInstance.destroy(); // Cleanup on unmount
    }
  }, []);

  const images = currentLanguage === "hi"
    ? ["/images/app mockup hindi 1.jpg", "/images/app mockup hindi 2.jpg", "/images/app mockup hindi 3.jpg", "/images/app mockup hindi 4.jpg"]
    : ["/images/app mockup 1.jpg", "/images/app mockup 2.jpg", "/images/app mockup 3.jpg", "/images/app mockup 4.jpg"];

  return (
    <div className="container max-w-7xl p-5 sm:p-10 md:p-16">
      <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl my-10">
        {t("Working")}
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
        {/* Left Side Content */}
        <div className="space-y-6 sm:space-y-10 max-w-4xl text-center md:text-left">
          {[
            { title: t("step1"), desc: t("step1dis") },
            { title: t("step2"), desc: t("step2dis") },
            { title: t("step3"), desc: t("step3dis") },
            { title: t("step4"), desc: t("step4dis") },
          ].map((item, index) => (
            <div
              className={`flex flex-col sm:flex-row items-center md:items-start text-center sm:text-left transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-40"
              }`}
              key={index}
            >
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <svg
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm sm:text-lg text-slate-600 mt-2 sm:mt-4 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
{/* Right Side Image Slider */}
<div className="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center">
  <div className="glide w-full" ref={glideRef}>
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides">
        {images.map((img, idx) => (
          <li className="glide__slide flex justify-center items-center" key={idx}>
            <Image
              src={img}
              alt="Puja"
              width={400}
              height={500}
              className="rounded-3xl shadow-lg h-[500px] object-cover"
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Dots (Pagination) Below the Slider */}
    <div className="glide__bullets flex justify-center mt-4" data-glide-el="controls[nav]">
      {images.map((_, idx) => (
        <button
          key={idx}
          className={`glide__bullet w-3 h-3 mx-1 rounded-full transition-all ${
            activeIndex === idx ? "bg-orange-700" : "bg-gray-400"
          }`}
          data-glide-dir={`=${idx}`}
        ></button>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
