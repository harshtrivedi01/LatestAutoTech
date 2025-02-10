'use client';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "./../reduxrtk/slice.js";
import Image from "next/image.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import topimage from '../../../public/Assests/circle-vector.svg';
import belowimage from '../../../public/Assests/bird.svg';
import Link from "next/link.js";
import ToastExample from "../component/Toast/Toater.js";

export default function OtpVerificationPage() {
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.auth.otp);

  const handleOtpChange = (e) => {
    dispatch(setOtp(e.target.value));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("otp", otp);

    try {
      const response = await axios.post("http://13.235.230.223/api/otpVerification", data);
      console.log("OTP Verification Response:", response.data);
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-md w-96">
    //     <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>
    //     <form onSubmit={handleOtpSubmit} className="space-y-4">
    //       <input
    //         type="text"
    //         name="otp"
    //         placeholder="Enter OTP"
    //         className="w-full p-2 border rounded"
    //         onChange={handleOtpChange}
    //         required
    //       />
    //       <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
    //         Verify OTP
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <>
     <Image src={topimage} alt="test" className="absolute" />
   <nav className=" w-full z-20 top-0 start-0  dark:border-gray-600   bg-[#FFEEE2]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-5 rtl:space-x-reverse"
          >
          
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
           
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
          <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl rounded-b-xl group-hover:visible">
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
  <div className="p-10  -mt-5 border-slate-200 rounded-3xl flex flex-col items-center space-y-4 bg-white">
    <div className="">
      <img width={45} className=""   src="https://www.punyasetu.com/assets/images/logo.png" />
    </div>
    <p className="font-bold text-4xl">OTP Verification</p>
 
   
    <div className="flex space-x-1  text-sm">
    <p className="text-center mt-4 text-xl font-semibold text-gray-700">
    We sent you a one time OTP on this<br/>
    Mobile Number
    <a
      href="https://www.creative-tim.com/david-ui/docs/html/button"
      className="text-[#FA8128] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
  {" "}  +91 - 12989200823 {" "}
    </a>
    
  </p>
    </div>
    <form action method="post">
  <div className="flex flex-col space-y-16">
    <div className="flex flex-row items-center gap-8 justify-between mx-auto w-full max-w-sm">
      <div className="w-20 h-16 ">
        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name id />
      </div>
      <div className="w-20 h-16 ">
        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name id />
      </div>
      <div className="w-20 h-16 ">
        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name id />
      </div>
      <div className="w-20 h-16 ">
        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name id />
      </div>
    </div>
    
  </div>
</form>

<div className="flex space-x-1  text-sm">
    <p className="text-center gap-1 font-light flex text-sm text-gray-700">
    
   Resend OTP in {" "}
    <a
      href="/login"
      className="text-[#FA8128] hover:underline "
     
      rel="noopener noreferrer"
    >
  {" "}00:30 {" "}
    </a>
   

<ToastExample/>
  </p>
    </div>
    <div className="flex flex-col space-y-5  p-5 w-full">
    <Link href={"/otpverification"}>
    <button className="w-full bg-[#E5644E] rounded-xl p-2 shadow-2xl text-white font-bold transition duration-200 hover:bg-[#E5644E]">Submit</button>
    </Link>
         </div>
   

    <div className="flex space-x-1  text-sm">
    <p className="text-center gap-1 font-semibold flex text-sm text-gray-700">
    <IoArrowBackOutline className="text-lg item-end" />
    Back To {" "}
    <a
      href="/login"
      className="text-[#FA8128] hover:underline "
     
      rel="noopener noreferrer"
    >
  {" "}Login {" "}
    </a>
   


  </p>
    </div>
  </div>
  <Image src={belowimage} alt="test" className="absolute right-0 w-[500px]  bottom-0" />
</div>
    
    
    </>
  );
}
