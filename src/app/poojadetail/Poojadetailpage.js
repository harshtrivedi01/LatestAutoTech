
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import './Poojadetail.css';
import Content from "./Content";
import Benifit from "./Benifit";
import PoojaPackage from "./PoojaPackage";
import Faq from "./Faq";
import Homeeight from "../Home/Homeeight";
import { Homeseven } from "../Home/Homeseven";
import Downloadapp from "./Downloadapp";
import axios from "axios";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Calendar, CalendarIcon } from "lucide-react";
import api from "../lib/axiosInstance";
import Testimonials from "./Testimonials";
import { useTranslation } from "react-i18next";

const slides = [
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
  { image: "img", text: "Pooja Anytime Anywhere" },
];

export default function Poojadetailpage() {
  const { t } = useTranslation();
  const [inputDate, setInputDate] = useState('');

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };
  const { id } = useParams();  
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeTab, setActiveTab] = useState(`${t("AboutPooja")}`); // "content" or "benifit"

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
  



  const [showButton, setShowButton] = useState(true);
  

  useEffect(() => {
    const handleScroll = () => {
      const packageSection = document.getElementById(`${t("PoojaPackage")}`);
      const homeSection = document.getElementById("home1");
  
      const isElementInView = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };
  
      const isPackageVisible = isElementInView(packageSection);
      const isHomeVisible = isElementInView(homeSection);
  
      // Hide button if either section is in view
      setShowButton(!(isPackageVisible || isHomeVisible));
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check on mount
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  
  const [showModal, setShowModal] = useState(false);

  const imageUrl = pujaData?.image || "/images/logo.png";
  const name = pujaData?.name || "Special Pooja";
  const description = pujaData?.short_description || "Join us for this sacred occasion!";
  const pageUrl = window.location.href; // Get current page URL

  const shareMessage = `🌟 *${name}* 🌟\n\n${description}\n\n🔗 Join now: ${pageUrl}`;

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: description,
          url: pageUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      setShowModal(true); // Show modal for desktop users
    }
  };
  
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.getAttribute("id"));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
    {isError ? (
  <div className="text-red-600 font-semibold text-center mt-10 min-h-screen">
    {errorMessage}
  </div>
) : (
  <div>
     <section className="poojadetail p-60" id="home1">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >
            {/* Left Side - Image Slider */}
            <div className="md:col-span-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ x: "0%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "0%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full flex justify-center items-center text-white text-center text-3xl font-bold bg-cover bg-center rounded-xl"
                  style={{ backgroundImage: `url(${slides[index].image})` }}
                >
                  <div className="h-[200px] w-full flex justify-center img-ratio">
                    <img
                      className="w-full  object-contain h-full"
                      src={ pujaData?.image || "/images/logo.png"}
                      alt="Pooja Banner"
                      height="100%"
                      width="100%"
                      onError={(e) => (e.target.src = "/images/logo.png")}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Content */}
            <div className="md:col-span-1 text-center md:text-left relative">
            {/* whatsapp */}
            <i className="mb-2 isuccess float-right cursor-pointer" onClick={shareNative}>
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z"></path>
  </svg>
</i>
{showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Share this Pooja</h3>
            <img src={imageUrl} alt={name} className="w-32 h-32 rounded mb-2" />
            <p className="mb-2">{description}</p>

            <div className="flex gap-2">
              <button onClick={shareOnWhatsApp} className="bg-green-500 text-white p-2 rounded">WhatsApp</button>
              <button onClick={shareOnFacebook} className="bg-blue-700 text-white p-2 rounded">Facebook</button>
              <button onClick={shareOnTwitter} className="bg-blue-400 text-white p-2 rounded">Twitter</button>
            </div>

            <button onClick={() => setShowModal(false)} className="mt-2 text-red-500">Close</button>
          </div>
        </div>
      )}

              <h5 className="mb-2 text-2xl font-bold text-start  tracking-tight text-[#BA1A1A] ">
              { pujaData?.name||" Saturday ‘City of Mahakaal’ Special"}
              <div className="w-80 h-0.5 mt-2 bg-[#BA1A1A]"></div>
              </h5>

              <h5 className="mb-2 text-2xl mt-4 text-start font-bold tracking-tight text-gray-900 text-black">
              {pujaData?.sub_title || " 11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path"}
              </h5>
              <p className="mb-3 font-normal text-start text-gray-700 text-xl text-gray-400">
  {pujaData?.short_description
    ? pujaData?.short_description .split(" ").slice(0, 30).join(" ") + (pujaData?.short_description .split(" ").length > 30 ? "..." : "")
    : ""}
</p>
              
             <div>
     
        <p className="my-2 w-1/2 text-lg text-gray-400 flex gap-2 items-center">
         <CalendarIcon className="text-yellow-600"/> {pujaData?.dates || `${t("CommingSoon")}`} {t("CommingSoon")}
        </p>
     
    </div>
    <a
                 onClick={() => scrollToSection(`${t("PoojaPackage")}`)}
                id="package"
                className="w-full block uppercase text-center px-6 py-4 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800"
              >
            {t("SelectPoojapackage")}
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Tab Section */}

      <div className="sticky top-0 z-50 bg-white   flex justify-center gap-4">
        <div className="container flex justify-center space-x-4 border-b">
          {[`${t("AboutPooja")}`, `${t("PoojaBenefits")}`, `${t("PoojaPackage")}`].map((id, index) => (
            <button
              key={index}
              className={`px-6 py-3 w-full font-medium ${
                activeTab === id ? "text-white bg-[#E5644E] rounded-t-lg" : "text-gray-600"
              }`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            >
              {id.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
    
      {showButton && (
      <a
      onClick={() => document.getElementById(`${t("PoojaPackage")}`)?.scrollIntoView({ behavior: "smooth" })}
      className="fixed bottom-6 sm:bottom-10 left-1/3 transform -translate-x-1/2 px-8 py-3 sm:px-12 sm:py-4 md:px-16 md:py-5 lg:px-20 lg:py-4 
                 font-semibold text-sm sm:text-base md:text-lg text-white bg-green-600 rounded-lg shadow-lg 
                 hover:bg-green-700 hover:scale-105 transition-transform duration-300 animate-pulse"
    >
       {t("SelectPoojapackage")}
    </a>
    
     
      )}

      {/* Sections */}
      <section id={t("AboutPooja")}> <Content detail={pujaData}  /> </section>
      <section id={t("PoojaBenefits")}> <Benifit detail={pujaData} /> </section>
      <section id={t("PoojaPackage")} className="">
        <PoojaPackage detail={pujaData} />
      </section>
    
      <section id="Downloadapp-section" className="text-black"> <Homeseven  detail={pujaData} /></section>
      <section id="Homeeight-section" className="text-black relative "> <Testimonials/></section>
      <section id="Faq-section" className="text-black"> <Faq  detail={pujaData} /> </section>
  </div>
)}

    
    </>
  );
}
