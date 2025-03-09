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

          BookNow:"Book Now",
          PoojaBox:"Pooja Box",
          outOfStock:"Out of Stock",
          ViewMore:"View More",
          addtocart:"Add to Cart",
          removefromcart:"Remove from Cart",
          Pooja:"Pooja",
          PARTICIPATE:"PARTICIPATE",
          WhatOurClientsSayAboutUs:"What Our Clients Say About Us",
          banner :"Experience divine blessings at your fingertips! Access online Pooja services, book expert Pandit Ji, and explore Damgiri spiritual guidance—all in one app",
          ReadMore:"Read More",
          ReadLess:"Read Less",
          DownloadAPP:"Download APP",
          DownloadAppfrom:"Download App from",
          Services:"Our Services",
          Company:"Company",
          FAQ:"FAQ",
          PrivacyPolicy:"Privacy Policy",
          TermsANDConditions:"Terms & Conditions",
          SocialMedia:"Social Media",
          LearnMore:"Learn More",
          moreUser:"More than 725 users are with us on WellSpring",
          About:"About",
          Reviews:"What Our Clients Say About Us",
          OurService:"Our Service",
          Working:"How does PUNYASETU Online Pooja Work?",
          UpComming:"Upcoming Poojas on Punyasetu",
          PerformRetuals:"Perform sacred rituals from the comfort of your home. Book a pooja in your name and gotra, receive a recorded video of the ceremony, and get the divine Aashirwad Box delivered to you. Experience spiritual fulfillment and divine blessings with Punyasetu",
          CommingSoon:"Comming Soon",
          Address:"M/S Satsambhav Technologies Private Limited",
          SelectPoojapackage:"Select Pooja package",
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
          

           BookNow:"अभी बुक करें",
          PoojaBox:"पूजा बॉक्स",
          outOfStock:"स्टॉक ख़त्म",
          ViewMore:"और देखें",
          addtocart:"कार्ट में जोड़ें",
          removefromcart:"कार्ट से निकालें",
          Pooja:"पूजा",
          PARTICIPATE:"हिस्सा लेना",
          WhatOurClientsSayAboutUs:"हमारे ग्राहक हमारे बारे में क्या कहते हैं",
          banner :"अपनी उंगलियों पर दिव्य आशीर्वाद का अनुभव करें! ऑनलाइन पूजा सेवाओं तक पहुँचें, विशेषज्ञ पंडित जी को बुक करें, और दमगिरी आध्यात्मिक मार्गदर्शन का पता लगाएं - सब कुछ एक ही ऐप में।",
          ReadMore:"और पढ़ें",
          ReadLess:"कम पढ़ें",
          DownloadAPP:"ऐप डाउनलोड करें",
          DownloadAppfrom:"यहां से ऐप डाउनलोड करें",
          Services:"सेवाएं",
          Company:"कंपनी",
          FAQ:"सामान्य प्रश्न",
          PrivacyPolicy:"गोपनीयता नीति",
          TermsANDConditions:"नियम एवं शर्तें",
          SocialMedia:"सोशल मीडिया",
          LearnMore:"और अधिक जानें",
          moreUser:"725 से अधिक उपयोगकर्ता वेलस्प्रिंग पर हमारे साथ हैं",
         
          Reviews:"हमारे ग्राहक हमारे बारे में क्या कहते हैं",
          OurService:"हमारी सेवा",
          Working:"पुण्यसेतु ऑनलाइन पूजा कैसे काम करती है?",
          UpComming:"पुण्यसेतु पर आगामी पूजाएँ",
          PerformRetuals:"अपने घर पर आराम से पवित्र अनुष्ठान करें। अपने नाम और गोत्र में पूजा बुक करें, समारोह का रिकॉर्ड किया गया वीडियो प्राप्त करें और दिव्य आशीर्वाद बॉक्स प्राप्त करें। पुण्यसेतु के साथ आध्यात्मिक पूर्णता और दिव्य आशीर्वाद का अनुभव करें",
          CommingSoon:"जल्द आ रहा है",
          Address:"मेसर्स सत्सम्भव टेक्नोलॉजीज प्राइवेट लिमिटेड",
          SelectPoojapackage:"पूजा पैकेज चुनें"

        },
      },
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false },
  });

export default i18n;
