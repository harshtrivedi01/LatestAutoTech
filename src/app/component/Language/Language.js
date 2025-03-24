

"use client"; // Must be a client component

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n"; // Import the correct i18n instance
import { TbWorld } from "react-icons/tb";
import api from "../../lib/axiosInstance";
import { ArrowDown } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

export default function Language() {
  const { t } = useTranslation();

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Avoid undefined errors


  useEffect(() => {
    const savedLangCode = localStorage.getItem("selectedLanguage") || "en";
    if (languages.length > 0) {
      const savedLang = languages.find((lang) => lang.code === savedLangCode) || languages[0];
      setSelectedLanguage(savedLang);
      i18n.changeLanguage(savedLangCode);
    }
  }, [languages]);

   // Runs again when languages are updated
  useEffect(() => {
    setLanguages([
      { language: "English", code: "en" },
      { language: "हिंदी", code: "hi" },
    ]);
  }, []);
  

  const handleLanguageChange = (event) => {
    const code = event.target.value;
    const selectedLang = languages.find((lang) => lang.code === code);
    if (selectedLang) {
      setSelectedLanguage(selectedLang);
      localStorage.setItem("selectedLanguage", code);
      i18n.changeLanguage(code);
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2 px-2 py-2 relative">
    <TbWorld className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800" />
  
    <div className="relative w-full max-w-[150px]">
      <select
        value={selectedLanguage?.code || "en"}
        onChange={handleLanguageChange}
        className="appearance-none w-full bg-transparent text-base sm:text-lg md:text-xl font-semibold text-gray-800 pr-8 focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.language || "en"}
          </option>
        ))}
      </select>
  
      {/* Custom Down Arrow Icon */}
      <div className="pointer-events-none font-bold absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 text-base sm:text-lg md:text-xl">
      <IoIosArrowDown />
      </div>
    </div>
  </div>
  
  );
}
