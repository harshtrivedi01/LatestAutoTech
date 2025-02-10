"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "./../reduxrtk/slice.js";
import Image from "next/image.js";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // ✅ Navigation

import { IoArrowBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import topimage from '../../../public/Assests/circle-vector.svg';
import belowimage from '../../../public/Assests/bird.svg';

export default function OtpVerificationPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const otpRedux = useSelector((state) => state.auth.otpdata.otp);
  const phone = useSelector((state) => state.auth.formData.phone);
  const type = useSelector((state) => state.auth.otpdata.type);

 

  const [otp, setOtpValues] = useState(["", "", "", ""]); // OTP state
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  // Handle OTP change
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    if (value.length > 1) return; // Ensure only one digit at a time

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtpValues(newOtp);
    dispatch(setOtp(newOtp.join(""))); // Update Redux

    // Move to next input
    if (index < 3 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
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

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("otp", otp.join("")); // Send full OTP
    data.append("phone", phone); // Correct phone handling
    data.append("type", type); // Correct type handling

    try {
      const response = await axios.post(`https://dakshhousing.com/satsambhav/api/authentication`, data); 

      if (response.data.success) {
        setMessage("OTP verified successfully! Redirecting...");
        setTimeout(() => {
          router.push("/"); // ✅ Redirect to home
        }, 2000);
      } else {
        setAttempts((prev) => prev + 1);
        if (attempts + 1 >= 3) {
          setMessage("Too many wrong attempts! Please try again later.");
        } else {
          setMessage("Invalid OTP! Please try again.");
        }
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      setMessage("OTP Verification failed. Please try again.");
    }
  };

  // Lockout screen after 3 failed attempts
  if (attempts >= 3) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-100">
        <div className="p-10 border rounded-xl bg-white">
          <h1 className="text-red-600 text-2xl font-bold">Too Many Attempts</h1>
          <p className="text-gray-700 mt-2">Please wait and try again later.</p>
        </div>
      </div>
    );
  }

  const logindata =  localStorage.getItem("logindata")
  


  return (
    <>
      <Image src={topimage} alt="test" className="absolute" />
      <div className="min-h-screen flex justify-center items-center  bg-[#FFEEE2]">
        <div className="p-10  rounded-3xl bg-white flex flex-col items-center">
          <div className="">
            <img width={45} className="" src="https://www.punyasetu.com/assets/images/logo.png" />
          </div>
          {console.log("FormData from Redux:",logindata)}
          <p className="font-bold text-4xl">OTP Verification</p>
          <p className="text-center mt-4 text-xl font-semibold text-gray-700">
            We sent you a one time OTP on this <br />
            Mobile Number +91 <span className="text-[#FA8128] hover:underline">{phone}</span>
          </p>

          {/* OTP Input Fields */}
          <form onSubmit={handleOtpSubmit} className="flex flex-col mt-5 space-y-5">
            <div className="flex justify-center gap-7">
              {otp.map((val, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-20 h-20 text-center border rounded-2xl text-lg focus:ring-2 ring-blue-700"
                  type="text"
                  maxLength="1"
                  value={val}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 text-center mt-3">
              Resend OTP in <span className="text-[#FA8128]">00:30</span>
            </p>
            <button className="bg-[#E5644E] text-white font-bold py-2 rounded-lg" type="submit">
              Submit
            </button>
          </form>

          <div className="flex space-x-1 mt-5 text-sm">
            <p className="text-center gap-1 font-semibold flex text-sm text-gray-700">
              <IoArrowBackOutline className="text-lg item-end" />
              Back To{" "}
              <a href="/login" className="text-[#FA8128] hover:underline " rel="noopener noreferrer">
                Login
              </a>
            </p>
          </div>
        </div>
        <Image src={belowimage} alt="test" className="absolute right-0 w-[500px]  bottom-0" />
      </div>
    </>
  );
}
