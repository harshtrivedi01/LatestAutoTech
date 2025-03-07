"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("appLanguage") || "en" : "en";
  });

  // Save language in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  // Function to change language and store translations
  const changeLanguage = async (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("appLanguage", newLang);

    // ✅ Translate and store translated values
    const elements = document.querySelectorAll("[data-translate]");
    let translations = {};

    for (const el of elements) {
      const originalText = el.getAttribute("data-original-text") || el.innerText;
      el.setAttribute("data-original-text", originalText); // Save original text

      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${newLang}&dt=t&q=${encodeURIComponent(
          originalText
        )}`
      );

      const data = await res.json();
      const translatedText = data[0].map((item) => item[0]).join(" ");
      el.innerText = translatedText;
      translations[originalText] = translatedText;
    }

    // ✅ Store translations in localStorage
    localStorage.setItem("appTranslations", JSON.stringify(translations));
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageProvider;
