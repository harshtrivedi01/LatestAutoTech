"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavbarWrapper from "./component/Header/NavbarWrapper";
import FooterWrapper from "./component/Footer/FooterWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FaArrowUp } from "react-icons/fa";

export default function ClientLayout({ children }) {
  const [showButton, setShowButton] = useState(false);


  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <NavbarWrapper />

    
      
      {children}
      <SpeedInsights />
      <FooterWrapper />


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
