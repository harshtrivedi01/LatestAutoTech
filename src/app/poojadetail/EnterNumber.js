"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function EnterNumber({ onSendOtp }) {
  const { t } = useTranslation();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    type: "login",
    phone: "",
    language: "en",
    longitude: "",
    latitude: "",
    ip_address: "",
    Device_id: "upen",
  });

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
    if (name === "phone") {
      if (/[^0-9]/.test(value)) {
        setPhoneError(t("Phonemustcontainonlydigits"));
      } else if (value.length !== 10) {
        setPhoneError(t("Pleaseenteravaliddigitphonenumber"));
      } else {
        setPhoneError("");
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) {
      toast.error(t("Invalidphonenumber"));
      setIsResendDisabled(false);
      return;
    }
    setIsResendDisabled(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await axios.post(
        "http://13.50.195.64/websiteapi//authentication",
        data
      );

      if (response.status === 200 && response.data.status === "1") {
        toast.success("OTP Sent! Redirecting...");
        setTimeout(() => {
          onSendOtp(formData.phone); // Move to OTP screen
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong!");
        setIsResendDisabled(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsResendDisabled(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container min-h-screen flex justify-center items-center bg-[#FFEEE2]">
        <div className="p-10 m-4 border-slate-200 rounded-3xl flex flex-col items-center space-y-3 bg-white">
          <img width={45} src="/images/logo.png" alt="logo" />
          <p className="font-bold text-4xl">{t("Signin")}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-[15px] text-center py-4" dangerouslySetInnerHTML={{ __html: t("signdis") }} />
            <input
              className="p-2 border text-sm rounded-lg w-full focus:outline-none"
              placeholder={t("Phonenumber")}
              type="number"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              required
            />
            {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
            <button
              className={`w-full bg-[#E5644E] rounded-xl p-2 text-white font-bold 
                ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E5644E]"}`}
              type="submit"
              disabled={isResendDisabled}
            >
              {isResendDisabled ? t("Saveing") : t("sendotp")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
