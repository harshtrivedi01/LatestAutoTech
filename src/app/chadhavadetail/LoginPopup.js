"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ onClose }) => {
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

      if (response.data.status === "1") {
        const id = response.data.data.id;
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center">
          {isOtpVerified ? "Complete Registration" : "Login"}
        </h2>

        {/* Phone Input */}
        {!isOtpSent && !isOtpVerified && (
          <>
            <p className="text-center text-gray-600">Enter your phone number</p>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              maxLength="10"
              placeholder="Enter phone number"
              className="w-full border p-3 mt-4 rounded"
            />
            <button
              onClick={handleGetOtp}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-4"
            >
              Get OTP
            </button>
          </>
        )}

        {/* OTP Input */}
        {isOtpSent && !isOtpVerified && (
          <>
            <p className="text-center text-gray-600">
              We've sent an OTP to {phone}
            </p>
            <form onSubmit={handleOtpSubmit} className="mt-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 border text-center text-xl font-bold"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-6"
                disabled={isResendDisabled}
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* Registration Form */}
        {isOtpVerified && (
          <form className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border p-3 rounded mt-2"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded mt-2"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-full mt-4"
            >
              Complete Registration
            </button>
          </form>
        )}

        <button onClick={onClose} className="w-full text-gray-500 text-sm mt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
