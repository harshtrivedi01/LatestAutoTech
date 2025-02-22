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
import { TbWorld } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

export default function OtpVerificationPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const phone = useSelector((state) => state.auth.formData.phone);
  const type = useSelector((state) => state.auth.otpdata.type);
  
  const [otp, setOtpValues] = useState(["", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [phoneError, setPhoneError] = useState("");
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
    setIsResendDisabled(true); 
    try {
      const response = await axios.post("https://dakshhousing.com/satsambhav/websiteapi/authentication", data);

      if (response.data.status === "1") {
        toast.success(response.data.message || "OTP verified successfully! Redirecting...");
        const token = response.data.data.web_token; // Assuming the API returns a token       
        if (token) {
          localStorage.setItem("authToken", token); // ✅ Save token
        }
        setTimeout(() => {
          router.push("/");
        }, 2000);
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

  const handleResendOtp = async () => {
     const data = new FormData();
    data.append("phone", phone);
    data.append("type", "resend otp");
    try {
      setTimer(30);
      setResendVisible(false);
      toast.info("Resending OTP...");

      const response = await axios.post("https://dakshhousing.com/satsambhav/websiteapi/authentication", data);

      if (response.data.status == 1) {
        toast.success(response.data.message||"OTP Resent Successfully!");
      } else {
        toast.error(response.data.message || "Failed to resend OTP.");
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
        <Toaster position="top-right" reverseOrder={false} />  
      <Image src={topimage} alt="test" className="absolute" />
           <nav className=" w-full z-20 top-0 start-0  border-gray-600   bg-[#FFEEE2]">
             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
               <a
                 href="/"
                 className="flex items-center space-x-5 rtl:space-x-reverse"
               >
     
                 <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
     
                 </span>
               </a>
               <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                 <div className="">
                   <div className="group relative cursor-pointer py-2">
                     <div className="flex items-center justify-between bg-black px-4 p-1 rounded-xl">
                       <a className="menu-hover flex gap-1 items-center  text-[12px]   text-white " >
                         <TbWorld className="text-white" />
                         Choose language
                       </a>
                       <span className="font-bold">
                         <RiArrowDropDownLine className="text-2xl text-white" />
     
                       </span>
                     </div>
                     <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                       <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                         English
                       </a>
                       <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                         Hindi
                       </a>
     
                     </div>
                   </div>
                 </div>
     
               </div>
     
             </div>
           </nav>
      <div className="min-h-screen flex justify-center items-center bg-[#FFEEE2]">
        <div className=" p-4 lg:p-10 rounded-3xl bg-white flex flex-col items-center">
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
                  className="w-16 h-16 text-center border rounded-2xl text-lg focus:ring-2 ring-blue-700"
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

<button
                className={`w-full bg-[#E5644E] rounded-xl p-2 shadow-2xl text-white font-bold transition duration-200 
                  ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E5644E]"}`}
                type="submit"
                disabled={isResendDisabled}
              >
                {isResendDisabled ? "Wait..." : "Submit"}
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
