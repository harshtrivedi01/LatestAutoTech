"use client"; // Ensures it runs on the client side

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LogOut } from "lucide-react";

i18n
  .use(LanguageDetector) // Auto-detect browser language
  .use(initReactI18next) // Enable React i18next
  .init({
    resources: {
      en: {
        translation: {
          Home: "Home",
          language: "Language",
          About:"About",
          PunyaSetu:"PunyaSetu",
          Service:"Service",
          Contact:"Contact Us",
          Join:"Join Us",
          Profile:"Profile",
          booking:"My Booking",
          Logout:"Logout",

        },
      },
      hi: {
        translation: {
          Home: "घर",
          language: "भाषा",
           About:"बारे में",
           PunyaSetu:"पुण्यसेतु",
           Service:"सेवा",
           Contact:"हमसे संपर्क करें",
           Join:"हमसे जुड़ें",
           Profile:"प्रोफ़ाइल",
           booking:"मेरी बुकिंग",
           Logout:"लॉगआउट",
          
        },
      },
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false },
  });

export default i18n;
