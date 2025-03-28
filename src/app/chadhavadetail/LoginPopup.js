"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProceedForm from "./ProceedForm";
import { useTranslation } from "react-i18next";

const LoginPopup = ({ onClose ,handleClose,totalPrice}) => {
    const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // ✅ Show form after OTP success
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [ipAddress, setIpAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [language, setLanguage] = useState(navigator.language || "en"); // Browser language
  const [userId, setUserId] = useState(null); // ✅ Store verified user ID

  // Get User Location (Longitude & Latitude)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // Get User IP Address
  useEffect(() => {
    axios
      .get("https://api64.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch((err) => console.error("Error fetching IP:", err));
  }, []);

  // Timer effect for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Backspace" && otp[index] === "") {
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtpValues(newOtp);
    }
  };
  
  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Handle Get OTP request
  const handleGetOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const data = new FormData();
    data.append("type", "login");
    data.append("phone", phone);
    data.append("language", language);
    data.append("longitude", longitude);
    data.append("latitude", latitude);
    data.append("ip_address", ipAddress);
    data.append("Device_id", "upen");

    try {
      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/authentication",
        data
      );

      if (response.data.status === "1") {
        setIsOtpSent(true);
        setTimer(60);
        toast.success(response.data.message || "OTP sent successfully!");
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Try again later.");
    }
  };

  // Handle OTP Submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("otp", otp.join(""));
    data.append("phone", phone);
    data.append("type", "otp");
    data.append("language", language);
    data.append("longitude", longitude);
    data.append("latitude", latitude);
    data.append("ip_address", ipAddress);
    data.append("Device_id", "upen");

    setIsResendDisabled(true);

    try {
      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/authentication",
        data
      );

      if (response.data.status == "1") {
        const id = response.data.data.id;

        if (response.data.status == "1") {
            const id = response.data.data.id;
            if (id) {
              localStorage.setItem("idToken", id);
            }
            const token = response.data.data.web_token;
            if (token) {
              localStorage.setItem("authToken", token);
            }
        }    
        setUserId(id); // ✅ Store verified user ID
        setIsOtpVerified(true); // ✅ Open the form instead of redirecting
        toast.success("OTP verified successfully!");
      } else {
        setAttempts((prev) => prev + 1);
        toast.error(response.data.message || "Invalid OTP! Please try again.");
        setIsResendDisabled(false);

        if (attempts + 1 >= 3) {
          toast.error("Too many wrong attempts! Please try again later.");
        }
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      toast.error("OTP verification failed. Please try again.");
      setIsResendDisabled(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-3xl py-10 m-3 shadow-lg ">
      <div className="flex justify-center">
            <img
              width={45}
              className=""
              src="/images/logo.png"
              alt="logo"
            />
          </div>
        
        {/* Phone Input */}
        {!isOtpSent && !isOtpVerified && (
          <>
          <h2 className="text-4xl mt-3 font-bold text-center">
        {t("Signin")}
        </h2>

            <p className="font-semibol text-[15px] text-center py-4" dangerouslySetInnerHTML={{ __html:`${t("signdis")}` }}>

</p>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              maxLength="10"
              placeholder="Enter phone number"
              className="p-2 border-[1px] text-sm rounded-lg w-full appearance-none
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none 
              [&::-moz-appearance]:textfield
              focus:outline-none"
            />
             <div className="flex justify-center my-3 text-sm">
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
            <button
              onClick={handleGetOtp}
              className="w-full bg-[#E5644E] rounded-xl p-2 shadow-2xl text-white font-bold transition duration-200 mt-5"
            >
             {t("sendotp")}
            </button>
          </>
        )}

        {/* OTP Input */}
        {isOtpSent && !isOtpVerified && (
          <>
           <p className="font-bold text-3xl text-center my-2"> {t("OTPVerification")}</p>

           <p className="text-center mt-4 text-lg font-semibold text-gray-700">
          {t("WesentyouaonetimeOTPonthis")} <br />
          {t("MobileNumber")} +91 <span className="text-[#FA8128] hover:underline">{phone}</span>
          </p>
            <form onSubmit={handleOtpSubmit} className="mt-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onKeyDown={(e) => handleBackspace(index, e.target.value)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                     className="w-14 h-14 sm:w-16 sm:h-16 text-center border rounded-2xl text-lg focus:ring-2 ring-blue-700"
                  />
                ))}
              </div>
              <button
                type="submit"
              
                disabled={isResendDisabled}

              className="w-full bg-[#E5644E] rounded-xl p-2 mt-5 shadow-2xl text-white font-bold transition duration-200 "
    >
     {t("submit")}
              </button>
            </form>
          </>
        )}

        {/* Registration Form */}
        {isOtpVerified && (
   <ProceedForm handleClose={() => { 
    handleClose(); // ✅ Ensure it closes the modal
    onClose(); // ✅ Also close the login popup
  }}  // ✅ Also close the login popup
  totalPrice={totalPrice} />
)}


        <button onClick={onClose} className="w-full text-black font-semibold text-sm mt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
