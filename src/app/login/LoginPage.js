"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "./../reduxrtk/slice.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link.js";
import topimage from "./../../../public/Assests/circle-vector.svg";
import belowimage from "./../../../public/Assests/bird.svg";
import Image from "next/image.js";
import toast, { Toaster } from "react-hot-toast";  // Using react-hot-toast
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); // ✅ FIXED: Added parentheses
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.auth.formData);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    axios.get("https://api64.ipify.org?format=json")
      .then(response => {
        dispatch(setFormData({ ip_address: response.data.ip }));
      })
      .catch(error => console.error("Error fetching IP address:", error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setFormData({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number (only numbers, exactly 10 digits)
    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        setPhoneError("Please enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
      }
    }

    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (phoneError) {
      toast.error("Please Check the phone number.");
      return;
    }

    setIsResendDisabled(true); 
    try {
      const response = await axios.post(`https://dakshhousing.com/satsambhav/websiteapi/authentication`, data); 

      if (response.status === 200 && response.data.status === "0") {
        // Handle error when status is "0"
        toast.error(response.data.message || "Something went wrong!");
        setIsResendDisabled(false); // Re-enable button on error
      }

      if (response.status === 200 && response.data.status === "1") {
       
      
        toast.success("OTP Sent! Redirecting...");
        setTimeout(() => router.push("/otpverification"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsResendDisabled(false); // Re-enable button on error
    }
  };

  return (
    <>
      {/* Toast Notifications */}
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
      <div className="min-h-screen flex justify-center items-center  bg-[#FFEEE2]">
        <div className="p-10 m-4  -mt-10 border-slate-200 rounded-3xl flex flex-col items-center space-y-3 bg-white">
          <div className="">
            <img width={45} className="" src="https://www.punyasetu.com/assets/images/logo.png" />
          </div>
          <p className="font-bold text-4xl">Sign in</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-semibol text-[15px] text-center py-4">Access all Punyasetu services, explore 1000+ devotional <br /> songs, and discover a variety of spiritual offerings.</p>
            <input 
              className="p-2 border-[1px] text-sm rounded-lg w-full"
              placeholder="Enter Phone No"
              type="number"
              name="phone"
              onChange={handleChange}
              required
              maxLength={10}
            />
            {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
            <div className="flex space-x-1  text-sm">
              <p className="text-center mt-4 text-sm text-gray-700">
                By proceeding you agree  to the<br />
                <a
                  href="https://www.creative-tim.com/david-ui/docs/html/button"
                  className="text-[#FA8128] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}  Terms & Conditions {" "}
                </a>
                {" "}and{" "}

                <a
                  href="https://www.creative-tim.com/david-ui/docs/html/button"
                  className="text-[#FA8128] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}Privacy Policy{" "}
                </a>
                and  of PUNYASETU {" "}
              </p>
            </div>

            <div className="flex flex-col space-y-5  p-5 w-full">
             


            <button
                className={`w-full bg-[#E5644E] rounded-xl p-2 shadow-2xl text-white font-bold transition duration-200 
                  ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E5644E]"}`}
                type="submit"
                disabled={isResendDisabled}
              >
                {isResendDisabled ? "Sending..." : "Send OTP"}
              </button>

            </div>
          </form>

          <div className="flex space-x-1  text-sm">
            <p className="text-center gap-1 font-semibold flex text-sm text-gray-700">
              <IoArrowBackOutline className="text-lg item-end" />
              Back To {" "}
              <a
                href="/"
                className="text-[#FA8128] hover:underline "

                rel="noopener noreferrer"
              >
                {" "}Home {" "}
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
