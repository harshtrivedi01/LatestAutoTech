"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("appLanguage") || "en" : "en";
  });

  const [translations, setTranslations] = useState(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("appTranslations")) || {}
      : {};
  });

  // Apply saved translations on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      applyTranslations(language);
    }
  }, [language]);

  const applyTranslations = (lang) => {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((el) => {
      const originalText = el.getAttribute("data-original-text") || el.innerText;
      el.setAttribute("data-original-text", originalText);

      if (translations[originalText]?.[lang]) {
        el.innerText = translations[originalText][lang]; // Apply saved translation
      }
    });
  };

  const changeLanguage = async (newLang) => {
    setLanguage(newLang);

    const elements = document.querySelectorAll("[data-translate]");
    let newTranslations = { ...translations };

    for (const el of elements) {
      const originalText = el.getAttribute("data-original-text") || el.innerText;
      el.setAttribute("data-original-text", originalText);

      if (newTranslations[originalText]?.[newLang]) {
        el.innerText = newTranslations[originalText][newLang];
        continue;
      }

      try {
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${newLang}&dt=t&q=${encodeURIComponent(
            originalText
          )}`
        );
        const data = await res.json();
        const translatedText = data[0].map((item) => item[0]).join(" ");

        el.innerText = translatedText;
        newTranslations[originalText] = { ...newTranslations[originalText], [newLang]: translatedText };
      } catch (error) {
        console.error("Translation error:", error);
      }
    }

    setTranslations(newTranslations);
    localStorage.setItem("appTranslations", JSON.stringify(newTranslations));
    applyTranslations(newLang); // Apply new translations
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
