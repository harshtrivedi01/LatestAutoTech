// import { useEffect, useState } from "react";
// import axios from "axios";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { TbWorld } from "react-icons/tb";

// export default function Language() {
//   const [languages, setLanguages] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");
//   const [loading, setLoading] = useState(true); // Loading state

//   const header = {
//     "language": "en",
//     "userId": "2",
//     "user_type": "user",
//     "Device_id": "upen",
//     "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
//     "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
//     "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
//     "web_token": localStorage.getItem("authToken"),
//   };

//   useEffect(() => {
//     fetchLanguages();
//   }, []);

//   const fetchLanguages = async () => {
//     try {
//       let formData = new FormData();
//       formData.append("type", "languages");

//       const response = await axios.post(
//         "https://dakshhousing.com/satsambhav/websiteapi/profile",
//         formData,
//         { headers: header }
//       );

//       console.log("Language API Response:", response.data);
//       setLanguages(response.data.data.language_list || []);
//     } catch (error) {
//       console.error("Error fetching languages:", error);
//     } finally {
//       setLoading(false); // Stop loading regardless of success or failure
//     }
//   };

//   return (
//     <>
//       <div className="group relative hidden md:flex cursor-pointer py-2">
//         <div className="flex items-center justify-between bg-white px-4">
//           <span className="menu-hover flex gap-1 items-center text-lg font-bold text-black">
//             <TbWorld className="text-xl" />
//             {loading ? "Loading languages..." : selectedLanguage}
//           </span>
//           <RiArrowDropDownLine className="text-3xl font-bold" />
//         </div>

//         <div className="invisible absolute top-10 z-50 flex w-full flex-col bg-gray-100 py-1 rounded-b-xl px-4 text-gray-800 shadow-xl group-hover:visible">
//           {loading ? (
//             <p className="text-gray-500 text-sm text-center">Loading...</p>
//           ) : languages.length > 0 ? (
//             languages.map((lang) => (
//               <a
//                 key={lang.id}
//                 onClick={() => setSelectedLanguage(lang.language)}
//                 className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2 cursor-pointer"
//               >
//                 {lang.language}
//               </a>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm text-center">No languages available</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }



// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { RiArrowDropDownLine } from "react-icons/ri";
// // import { TbWorld } from "react-icons/tb";

// // export default function Language() {
// //   const [languages, setLanguages] = useState([]);
 
// //   const googleTranslateElementInit = () => {
// //     new window.google.translate.TranslateElement(
// //       {
// //         pageLanguage: "en",
// //         autoDisplay: false
// //       },
// //       "google_translate_element"
// //     );
// //   };
// //   useEffect(() => {
// //     var addScript = document.createElement("script");
// //     addScript.setAttribute(
// //       "src",
// //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
// //     );
// //     document.body.appendChild(addScript);
// //     window.googleTranslateElementInit = googleTranslateElementInit;
// //   }, []);

// //   return (
// //     <>
// //       <div className="group relative hidden md:flex cursor-pointer py-2">
// //       <div id="google_translate_element"></div>
       

       
// //       </div>
// //     </>
// //   );
// // }
// // 
// // 
// // 

// // "use client";
// // import { useEffect } from "react";
// // import { useLanguage } from "../../../context/LanguageContext.js";

// // const Language = () => {
// //   const { language, changeLanguage } = useLanguage();

// //   useEffect(() => {
// //     const savedLang = localStorage.getItem("appLanguage") || "en";
// //     const savedTranslations = JSON.parse(localStorage.getItem("appTranslations") || "{}");

// //     // ✅ Check if translations for savedLang exist; if not, fetch translations
// //     const needsApiCall = !Object.values(savedTranslations).some((t) => t[savedLang]);

// //     if (language !== savedLang) {
// //       if (needsApiCall) {
// //         changeLanguage(savedLang); // Call API to fetch missing translations
// //       } else {
// //         // ✅ Apply stored translations directly
// //         document.querySelectorAll("[data-translate]").forEach((el) => {
// //           const originalText = el.getAttribute("data-original-text") || el.innerText;
// //           if (savedTranslations[originalText]?.[savedLang]) {
// //             el.innerText = savedTranslations[originalText][savedLang];
// //           }
// //         });
// //       }
// //     }
// //   }, []);

  
// //   useEffect(() => {
// //     handleLanguageChange()
// //     changeLanguage
// //   }, []);
// //   const handleLanguageChange = async (e) => {
// //     await changeLanguage(e.target.value);
// //   };

// //   return (
// //     <select value={language} onChange={handleLanguageChange}>
// //       <option value="en">English</option>
// //       <option value="hi">Hindi</option>
// //       <option value="es">Spanish</option>
// //       <option value="fr">French</option>
// //     </select>
// //   );
// // };

// // export default Language;


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
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "languages");

      const response = await api.post("/profile", formData); // Use the new axios instance

      console.log("Language API Response:", response.data);
      setLanguages(response.data.data.language_list || []);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLangCode = localStorage.getItem("selectedLanguage") || "en";

    if (languages.length > 0) {
      const savedLang = languages.find((lang) => lang.code === savedLangCode) || languages[0];
      setSelectedLanguage(savedLang);
      i18n.changeLanguage(savedLangCode);
    }
  }, [languages]); // Runs again when languages are updated

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
      <TbWorld className="text-xl text-gray-700" />
      <select
        value={selectedLanguage?.code || "en"} // Prevent undefined error
        onChange={handleLanguageChange}
        className="bg-transparent text-lg font-semibold text-gray-800 focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.code} className="text-black p-4 h-40">
            {lang.language}
          </option>
        ))}
      </select>
    </div>
  );
}
