"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { Providers } from "./reduxrtk/providers";
import NavbarWrapper from "./component/Header/NavbarWrapper";
import FooterWrapper from "./component/Footer/FooterWrapper";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "../context/LanguageContext.js";
import "./lib/i18n";
import I18nProvider from "./providers";
import { FaArrowUp } from "react-icons/fa"; // Back-to-top icon
import LoadingScreen from "./component/LoadingScreen";
import { setLoadingFunction } from "./utils/loadingState";

export default function RootLayout({ children }) {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load Cashfree Payment SDK dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setLoadingFunction(setLoading);
  }, []);

  // ✅ Scroll to top button logic
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
    <html lang="en">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="https://www.punyasetu.com/assets/images/logo.png" sizes="any" />
      </head>
      <body className="antialiased bg-white text-black">
        <Providers>
          <LanguageProvider>
            <ToastContainer position="top-right" autoClose={5000} />
            <NavbarWrapper data-translate />
            <I18nProvider>
              {loading && <LoadingScreen />}
              {children}
            </I18nProvider>
            <FooterWrapper />

            {/* 🔹 Back to Top Button */}
            {showButton && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-5 lg:right-10 bg-orange-600 text-white lg:p-5 p-3 rounded-full shadow-md hover:bg-orange-700 transition-all"
              >
                <FaArrowUp className="text-lg" />
              </button>
            )}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
