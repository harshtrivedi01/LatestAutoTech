"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "./../reduxrtk/slice.js";
import Image from "next/image.js";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import topimage from '../../../public/Assests/circle-vector.svg';
import belowimage from '../../../public/Assests/bird.svg';

export default function OtpVerificationPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const phone = useSelector((state) => state.auth.formData.phone);
  const type = useSelector((state) => state.auth.otpdata.type);
  
  const [otp, setOtpValues] = useState(["", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendVisible(true);
    }
  }, [timer]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtpValues(newOtp);
    dispatch(setOtp(newOtp.join("")));

    if (index < 3 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("otp", otp.join(""));
    data.append("phone", phone);
    data.append("type", type);

    try {
      const response = await axios.post("https://dakshhousing.com/satsambhav/api/authentication", data);

      if (response.data.success) {
        toast.success("OTP verified successfully! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setAttempts((prev) => prev + 1);
        toast.error("Invalid OTP! Please try again.");

        if (attempts + 1 >= 3) {
          toast.error("Too many wrong attempts! Please try again later.");
        }
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      setTimer(30);
      setResendVisible(false);
      toast.info("Resending OTP...");

      const response = await axios.post("https://dakshhousing.com/satsambhav/api/authentication", {
        phone
      });

      if (response.data.success) {
        toast.success("OTP Resent Successfully!");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      toast.error("Error resending OTP. Try again later.");
    }
  };

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

  return (
    <>
      <Image src={topimage} alt="test" className="absolute" />
      <div className="min-h-screen flex justify-center items-center bg-[#FFEEE2]">
        <div className="p-10 rounded-3xl bg-white flex flex-col items-center">
          <div className="">
            <img width={45} className="" src="https://www.punyasetu.com/assets/images/logo.png" />
          </div>

          <p className="font-bold text-4xl">OTP Verification</p>
          <p className="text-center mt-4 text-xl font-semibold text-gray-700">
            We sent you a one-time OTP on this <br />
            Mobile Number +91 <span className="text-[#FA8128] hover:underline">{phone}</span>
          </p>

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

            {!resendVisible ? (
              <p className="text-sm text-gray-700 text-center mt-3">
                Resend OTP in <span className="text-[#FA8128]">{`00:${timer < 10 ? `0${timer}` : timer}`}</span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="text-[#FA8128] font-semibold hover:underline text-center mt-3"
              >
                Resend OTP
              </button>
            )}

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
        <Image src={belowimage} alt="test" className="absolute right-0 w-[500px] bottom-0" />
      </div>
    </>
  );
}
