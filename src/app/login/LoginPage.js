"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import topimage from "./../../../public/Assests/circle-vector.svg";
import belowimage from "./../../../public/Assests/bird.svg";
import Language from "../../app/component/Language/Language";
import i18n from "../lib/i18n";
import { useTranslation } from "react-i18next";
export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Load form data from localStorage or initialize defaults
  const loadFromLocalStorage = (key) => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };
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
  const [formData, setFormData] = useState({
    type: "login",
    phone: "",
    language: "en",
    longitude: "",
    latitude: "",
    ip_address: "",
    Device_id: "upen",
  });
  
  // Save formData to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    axios.get("https://api64.ipify.org?format=json")
      .then(response => {
        setFormData(prev => ({ ...prev, ip_address: response.data.ip }));
      })
      .catch(error => console.error("Error:", error));
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => console.error("Error:", error)
      );
    }
  }, []);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number (only numbers, exactly 10 digits)
    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        setPhoneError(`${t("Pleaseenteravaliddigitphonenumber")}`);
      } else {
        setPhoneError("");
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError) {
      toast.error(`${t("Invalidphonenumber")}`);
      setIsResendDisabled(false); // Enable button if there's an error
      return;
    }

    setIsResendDisabled(true); // Disable button when submitting

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/authentication",
        data
      );

      if (response.status === 200 && response.data.status === "1") {
        toast.success("OTP Sent! Redirecting...");
        setTimeout(() => {
          router.push(`/otpverification?phone=${formData.phone}`);
          setIsResendDisabled(true); // Keep button disabled after success
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong!");
        setIsResendDisabled(false); // Enable button if error occurs
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsResendDisabled(false); // Enable button if error occurs
    }
  };
  
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Image src={topimage} alt="test" className="absolute" />
      <nav className="w-full z-20 top-0 start-0 border-gray-600 bg-[#FFEEE2]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white"></span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="">
              <div className="group relative cursor-pointer py-2">
                <div className="flex items-center justify-between bg-black p-2 px-10 rounded-xl">
               
                <div className="menu-hover flex gap-1 items-center text-sm text-white">
                  <img src="/images/language.png" />
     
      <select
        value={selectedLanguage?.code || "en"} // Prevent undefined error
        onChange={handleLanguageChange}
        className="bg-transparent text-b text-white focus:outline-none cursor-pointer"
        aria-label="Select Language"
      >
      {languages.map((lang) => (
  <option key={lang.code} value={lang.code} className="text-black text-sm p-4 h-40">
    {lang.language || "en"}
  </option>
))}

      </select>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex justify-center items-center bg-[#FFEEE2]">
        <div className="p-10 m-4 -mt-10 border-slate-200 rounded-3xl flex flex-col items-center space-y-3 bg-white">
          <div className="">
            <img
              width={45}
              className=""
              src="/images/logo.png"
              alt="logo"
            />
          </div>
          <p className="font-bold text-4xl">      {t("Signin")}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-semibol text-[15px] text-center py-4" dangerouslySetInnerHTML={{ __html:`${t("signdis")}` }}>

            </p>
            <input
  className="p-2 border-[1px] text-sm rounded-lg w-full"
  placeholder={t("Phonenumber")}
  type="text"
  name="phone"
  onChange={handleChange}
  value={formData.phone}
  required
  maxLength={10} // Prevents entering more than 10 digits
  pattern="[0-9]*" // Ensures only numeric input
  inputMode="numeric" // Shows numeric keyboard on mobile devices
/>

            {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
            <div className="flex justify-center text-sm">
  <p className="text-center mt-4 text-sm text-gray-700">
    {t("by")}<br />
    <a
      href="terms&conditions"
      className="text-[#FA8128] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("TermsANDConditions")}
    </a>
    {" "}{t("and")}{" "}
    <a
      href="privacypolicy"
      className="text-[#FA8128] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("PrivacyPolicy")}
    </a>
    {" "}{t("andof")}
  </p>
</div>

            <div className="flex flex-col space-y-5 p-5 w-full">
              <button
                className={`w-full bg-[#E5644E] rounded-xl p-2 shadow-2xl text-white font-bold transition duration-200 
                  ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E5644E]"}`}
                type="submit"
                disabled={isResendDisabled}
              >
                {isResendDisabled ?  `${t("Saveing")}` : `${t("sendotp")}`}
              </button>
            </div>
          </form>
          <div className="flex space-x-1 text-sm">
            
            <p className="text-center gap-1 font-semibold flex text-sm text-gray-700">
              <IoArrowBackOutline className="text-lg item-end" />
              {t("backto")}{" "}
              <a href="/" className="text-[#FA8128] hover:underline">
                {" "}
                {t("Home")}{" "}
              </a>
            </p>
          </div>
        </div>
        <Image
          src={belowimage}
          alt="test"
          height={100}
          className="absolute right-0 bottom-0 w-[300px] sm:w-[200px] md:w-[300px] lg:w-[400px] max-w-full hidden sm:block"
        />
      </div>
    </>
  );
}
