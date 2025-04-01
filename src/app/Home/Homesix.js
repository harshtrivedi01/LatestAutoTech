import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// ✅ Fallback data in case `bottomslider_list` is empty
const fallbackData = [
  {
    id: 1,
    banner_content: "Experience the Best",
    highlight_content: "Amazing Offers",
    description:
      "Get the best spiritual experience with our dedicated services. We ensure authenticity and devotion in every ritual.",
    bottomslider:
      "https://via.placeholder.com/1200x500.png?text=Default+Slider+1",
  },
  {
    id: 2,
    banner_content: "Perform Pooja With",
    highlight_content: "Special Benefits",
    description:
      "Our experienced Pandits perform each ceremony with care and devotion, ensuring a meaningful experience for you and your loved ones.",
    bottomslider:
      "https://via.placeholder.com/1200x500.png?text=Default+Slider+2",
  },
  {
    id: 3,
    banner_content: "Sanatan Dharma Services",
    highlight_content: "Exclusive Rituals",
    description:
      "Each ritual is done with dedication and purpose, making every ceremony special and impactful.",
    bottomslider:
      "https://via.placeholder.com/1200x500.png?text=Default+Slider+3",
  },
];

const CustomSlider = ({ bottomslider_list = fallbackData }) => {

  return (
   <div className="bg-[#FFEEE2]">
    <div className="">
    <div className="  w-full mx-auto py-10 ">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true} // ✅ Centered slide
        slidesPerView={"auto"} // ✅ Allows dynamic slide size
        loop={true}
        autoplay={{ delay: 10000 }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.2,
          perView: 3,
          slideShadows: false,
        }}
      
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="container mySwiper "
      >
        {bottomslider_list.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "60%", maxWidth: "900px" }} // ✅ Make center slide bigger
            
          >
            <div
              className=" relative flex flex-col items-center justify-center drop-shadow-xl 
                         h-[250px] sm:h-[300px] md:h-[350px] 
                         rounded-[30px] sm:rounded-[40px] md:rounded-[50px]  
                         w-full bg-white  overflow-hidden"
              style={{
                // backgroundImage: `url(${item.bottomslider})`,
                backgroundImage: `url(/images/image.png)`  ||`url(/images/image.png)` ,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl text-center p-4 sm:p-6 md:p-5 rounded-lg  bg-opacity-80">
                <div className="my-2 font-display w-full rounded-2xl">
                  <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-black text-start">
                    {item.banner_content} <br />
                    <span className="text-[#FD1818]">{item.highlight_content}</span>
                  </h1>
                </div>
                <p className="mt-1.5 lg:w-2/3 text-start text-[10px] sm:text-sm md:text-base  lg:text-lg leading-6 text-black">
                {item.description.split(" ").slice(0, 30).join(" ") + (item.description.split(" ").length > 30 ? "..." : "")}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
   </div>
  );
};

export default CustomSlider;
