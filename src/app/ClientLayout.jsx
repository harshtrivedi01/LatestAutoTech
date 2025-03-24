// app/ClientLayout.jsx
"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavbarWrapper from "./component/Header/NavbarWrapper";
import FooterWrapper from "./component/Footer/FooterWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FaArrowUp } from "react-icons/fa";
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

  // Scroll event to show back-to-top button
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

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <NavbarWrapper />

      {loading && <LoadingScreen />}
      {children}
      <SpeedInsights />
      <FooterWrapper />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 lg:right-10 bg-orange-600 text-white lg:p-5 p-3 rounded-full shadow-md hover:bg-orange-700 transition-all z-50"
        >
          <FaArrowUp className="text-lg sm:text-xl" />
        </button>
      )}
    </>
  );
}
