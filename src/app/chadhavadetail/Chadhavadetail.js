


"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Content from "./Content.js";
import Benifit from "./Benifit.js";

import Homeeight from "../Home/Homeeight";
import { Homeseven } from "../Home/Homeseven";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Calendar, CalendarIcon } from "lucide-react";
import api from "../lib/axiosInstance";

import { useTranslation } from "react-i18next";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Faq from "../poojadetail/Faq";
import Testimonials from "../poojadetail/Testimonials";


const slides = [
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
];

export default function Chadhavadetail() {
  const { t } = useTranslation();
  const [inputDate, setInputDate] = useState('');

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };
  const { id } = useParams();  
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeTab, setActiveTab] = useState("about-pooja"); // Default active tab

    
  const glideRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

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

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [autoPlay , slides.length]);


  const [pujaData, setPujaData] = useState([]);

  // Fetch Puja Data only after location & IP are available
  useEffect(() => {
      fetchPujaData();
    
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  
  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "new_puja_detail");
      formData.append("puja_id", id);
  
      const response = await api.post("/puja", formData);
  
      if (response.data?.data) {
        localStorage.setItem("productdeatil", JSON.stringify(response.data.data));
        setPujaData(response.data.data);
        setIsError(false); // Reset error state
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching puja data:", error);
      setErrorMessage(`${t("SomethingwentwrongPleasetryagainlater")}`);
      setIsError(true); // Hide the page
    }
  };
  
  
  const imageUrl = pujaData?.image || "/images/logo.png";
  const name = pujaData?.name || "Special Pooja";
  const description = pujaData?.short_description || "Join us for this sacred occasion!";
  const pageUrl = window.location.href; // Get current page URL

 
  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`${name}\n${description}\n${imageUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
  



  const [isExpanded, setIsExpanded] = useState(false);

  const text = `Shani Amavasya and Shani Gochar are powerful on their own, but when they align, they create a once-in-years Mahayog—an extraordinary time to cleanse past karmas and seek Shani Dev’s blessings. Scriptures reveal that rituals made during this cosmic confluence can dissolve karmic burdens and bring long-awaited relief.✨

  🛕At Shani Shingnapur, where Shani Dev resides in His Swayambhu (self-manifested) form, performing Hawan Aahuti Mahadaan on this day is believed to be the ultimate remedy for Shani Doshas. The sacred fire of the Hawan 🔥burns away negative influences, while Mahadaan (divine offerings) pleases Shani Dev, attracting stability, success, and divine protection.😇

  ✨This Mahayog won’t return anytime soon!🙅‍♀️ Don’t miss this divine opportunity to balance your karma and seek Shani Dev’s blessings. Book your Shani Shani Dosh Shanti Hawan Aahuti Mahadaan today.`;

  
  const images = [
    "https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_puja_process_004.6b33d4c4.webp&w=1920&q=75",
    "https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_puja_process_004.6b33d4c4.webp&w=1920&q=75",
    "https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_puja_process_001.d7bef497.webp&w=1920&q=75",
  ];

  return (
    <>
    {isError ? (
  <div className="text-red-600 font-semibold text-center mt-10 min-h-screen">
    {errorMessage}
  </div>
) : (
  <div>
   
     <section className="poojadetail  z-20" id="home1">
        <div className="">
          <div className="z-10 py-7 container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-3" >


<div className="w-full  h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[300px]">
  <div className="glide" ref={glideRef}>
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides rounded-3xl">
        {images.map((img, idx) => (
          <li className="glide__slide flex justify-center border rounded-3xl" key={idx}>
            <Image
             src={ "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742469909727.jpg&w=1920&q=75"}
              alt="Puja"
              width={800} // Set a higher base width
              height={600} // Set a higher base height
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[300px] max-w-[1000px] rounded-3xl shadow-lg object-cover"
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Dots (Pagination) Below the Slider */}
    <div className="glide__bullets flex justify-center my-3 mb-10" data-glide-el="controls[nav]">
      {images.map((_, idx) => (
        <button
          key={idx}
          className={`glide__bullet w-2 h-2 mx-1 rounded-full transition-all ${
            activeIndex === idx ? "bg-orange-500 scale-125" : "bg-gray-400"
          }`}
          data-glide-dir={`=${idx}`}
        ></button>
      ))}
    </div>
  </div>
</div>


        

            {/* Right Side - Content */}
            <div className="md:col-span-1 mt-10 md:m-0 text-center md:text-left relative">
            {/* whatsapp */}
            <i className="mb-2 isuccess float-right text-green-700 cursor-pointer" onClick={shareOnWhatsApp}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z"></path>
  </svg>
</i>


              <h5 className="mb-2 text-2xl font-bold text-start  tracking-tight text-[#BA1A1A] ">
              Shani Gochar- Amavasya Shani Dosh Shanti Hawan Aahuti Mahadaan
              <div className="w-40 sm:w-60 md:w-72 lg:w-80 h-0.5 mt-2 bg-[#BA1A1A]"></div>

              </h5>

              <h5 className="mb-2 text-xl mt-4 text-start font-semibold  text-gray-900 text-black">
              Have you been facing delays, struggles, and unexplained hardships
              </h5>
              <div>
      <p className="mb-3 font-normal text-start flex justify-start text-gray-700 text-xl text-gray-400">
        {isExpanded ? text : `${text.substring(0, 200)}...`}
      </p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="text-orange-500 font-semibold cursor-pointer"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
             
            </div>
          </div>
        </div>
      </section>


      {/* Sections */}
      <section id="" className="z-10 bg-gray-100 py-10"> <Content detail={pujaData}  /> </section>
      <section  id="pooja-benefits" className=""> <Benifit detail={pujaData} /> </section>
 
      <section  id="pooja-benefits" className=""> <Faq/> </section>

  </div>
)}

    
    </>
  );
}