"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavbarWrapper from "./component/Header/NavbarWrapper";
import FooterWrapper from "./component/Footer/FooterWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FaArrowUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6"; // Import WhatsApp icon
import LoadingScreen from "./component/LoadingScreen";
import { setLoadingFunction } from "./utils/loadingState";

export default function ClientLayout({ children }) {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Set global loading function
  useEffect(() => {
    setLoadingFunction(setLoading);
  }, []);

  // Scroll event to show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const phoneNumber = "7340099503"; // Replace with your actual WhatsApp number
    const message = encodeURIComponent("Hello! I need assistance.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <NavbarWrapper />

      {loading && <LoadingScreen />}
      {children}
      <SpeedInsights />
      <FooterWrapper />

      {/* Always visible WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-10 right-5 lg:right-11 bg-green-600 text-white lg:p-5 p-3.5 rounded-full shadow-md hover:bg-green-700 transition-all z-50"
      >
        <FaWhatsapp className="text-xl sm:text-2xl" />
      </button>

      {/* Back to Top Button (visible only when scrolling down) */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 lg:bottom-28 right-5 lg:right-11 bg-orange-600 text-white lg:p-5 p-3.5 rounded-full shadow-md hover:bg-orange-700 transition-all z-50"
        >
          <FaArrowUp className="text-xl sm:text-xl" />
        </button>
      )}
    </>
  );
}
