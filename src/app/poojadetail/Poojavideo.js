"use client";
import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

const SliderWithVideos = () => {
  const glideRef = useRef(null); // Ref for slider container

  const videoData = [
    { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ",title:"Mahashivratri 4 Prahar Abhishek" , },
    { id: 2, url: "https://www.youtube.com/embed/dQw4w9WgXcQ",title:"Mahashivratri 4 Prahar Abhishek" , },
    { id: 3, url: "https://www.youtube.com/embed/cHnMRueNN0k",title:"Mahashivratri 4 Prahar Abhishek" , },
    { id: 4, url: "https://www.youtube.com/embed/cHnMRueNN0k",title:"Mahashivratri 4 Prahar Abhishek" , },
    { id: 5, url: "https://www.youtube.com/embed/cHnMRueNN0k" ,title:"Mahashivratri 4 Prahar Abhishek" ,},
   
  ];

  useEffect(() => {
    if (glideRef.current) {
      const slider = new Glide(glideRef.current, {
        type: "carousel",
        perView: 3,
        focusAt: "center",
        gap: 15,
        autoplay: 4000,
        hoverpause: true,
        animationDuration: 800,
        breakpoints: {
          1024: { perView: 2 },
          768: { perView: 1 },
        },
      });

      slider.mount();
      return () => slider.destroy();
    }
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-start text-2xl font-bold mb-6">Pooja Videos</h2>

      <div ref={glideRef} className="glide">
        {/* Glide Track */}
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {videoData.map((video) => (
              <li key={video.id} className="glide__slide flex-col justify-center">
                <div className="relative w-full max-w-md aspect-video">
                  <iframe
                    className="w-full h-full rounded-2xl shadow-lg"
                    src={video.url}
                    title={`Video ${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="ms-2 text-bold mt-2 text-lg">{video.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Dots (Below Slider) */}
      <div className="glide__bullets flex justify-center mt-6" data-glide-el="controls[nav]">
        {videoData.map((_, index) => (
          <button
            key={index}
            className="glide__bullet w-3 h-3 mx-1 rounded-full bg-gray-400 border hover:bg-orange-600 transition"
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>

      {/* Navigation Arrows (Below Slider) */}
      <div className="glide__arrows flex justify-center gap-4 mt-4" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--left bg-gray-800 text-white px-4 py-2 rounded-lg"
          data-glide-dir="<"
        >
          ‹
        </button>
        <button
          className="glide__arrow glide__arrow--right bg-gray-800 text-white px-4 py-2 rounded-lg"
          data-glide-dir=">"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SliderWithVideos;
