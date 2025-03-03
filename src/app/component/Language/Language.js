

"use client"; // Must be a client component

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n"; // Import the correct i18n instance
import { TbWorld } from "react-icons/tb";
import api from "../../lib/axiosInstance";

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
  }, [languages]); // Runs again when languages are updated

useEffect (()=>{
  setLanguages([ 
    {
     language: "English",
     code: "en"
   },{
     language: "हिंदी",
     code: "hi"
   }
   ])
},[setLanguages])

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
    <div className="flex items-center gap- bg-white px-2 py-2">
      <TbWorld className="text-2xl text-gray-800" />
      <select
        value={selectedLanguage?.code || "en"} // Prevent undefined error
        onChange={handleLanguageChange}
        className="bg-transparent text-lg font-semibold text-gray-800 focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.code} className="text-black p-4 h-40">
            {lang.language || "en"}
          </option>
        ))}
      </select>
    </div>
  );
}
