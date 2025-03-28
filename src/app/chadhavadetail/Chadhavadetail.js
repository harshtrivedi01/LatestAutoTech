


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
  



  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
  
      // Ensure active tab updates instantly on click
      setTimeout(() => setActiveTab(id), 300); 
    }
  };
  
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
   
     <section className="poojadetail py-10 z-20" id="home1">
        <div className="">
          <div className="z-10 container max-w-7xl mx-auto  gap-5 p-3" >


<div className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[350px]">
  <div className="glide" ref={glideRef}>
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides ">
        {images.map((img, idx) => (
          <li className="glide__slide flex justify-center border rounded-3xl" key={idx}>
            <Image
             src={ "/images/logo.png"}
              alt="Puja"
              width={800} // Set a higher base width
              height={600} // Set a higher base height
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[400px] max-w-[1000px] rounded-3xl shadow-lg object-contain"
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Dots (Pagination) Below the Slider */}
    <div className="glide__bullets flex justify-center my-5 mb-10" data-glide-el="controls[nav]">
      {images.map((_, idx) => (
        <button
          key={idx}
          className={`glide__bullet w-3 h-3 mx-1 rounded-full transition-all ${
            activeIndex === idx ? "bg-orange-500 scale-125" : "bg-gray-400"
          }`}
          data-glide-dir={`=${idx}`}
        ></button>
      ))}
    </div>
  </div>
</div>


        

        
          </div>
        </div>
      </section>

      <div className=' bg-grey content'  id="about-section" >
        <div className='py-20 container max-w-7xl mx-auto'>

        <h2 className='title'>{t("Aboutchadhava")} </h2>
       
        <p>
        Pandit ji is known for his expertise in performing Ganesh Pooja
         and Vastu Shanti Pooja. He is highly regarded for his knowledge of
          Vedic rituals and mantras and has over 20 years of experience conducting
           ceremonies that invoke the blessings of Lord Ganesha for prosperity, success,
            and the removal of obstacles.Pandit ji is known for his expertise in performing 
            Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of 
            Vedic rituals and mantras and has over 20 years of experience conducting ceremonies
             that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles.
        </p>
        </div>

	  </div>
     
      <section id="" className="z-10 bg-gray-100 py-10"> <Content detail={pujaData}  /> </section>
      <section  id="pooja-benefits" className=""> <Benifit detail={pujaData} /> </section>
 
      <section  id="pooja-benefits" className=""> <Faq/> </section>

  </div>
)}

    
    </>
  );
}