"use client";
import React, { useState } from "react";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import AuthGuard from "../component/AuthGuard";
import Payment from "./Payment";


export default function page() {
  const [currentStep, setCurrentStep] = useState(2);

  const datastorage = localStorage.getItem("productdeatil");
const data = JSON.parse(datastorage)
console.log(JSON.parse(datastorage))


const datastoragepackge = localStorage.getItem("productdeatil2");
const datapackage = JSON.parse(datastoragepackge)
console.log((datapackage))
  return (
    <AuthGuard>
    <div className="cart b50 min-h-screen p-60">
      <div className="container">
        <h1 className="f-34 mb-2 font-semibold text-lg text-black">Cart</h1>

        {/* Progress Steps */}
        <div className="flex flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
  <div className="flex items-center mb-4 md:mb-0">
  <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentStep === 2 ? "bg-gray-200 text-gray-500" : " bg-green-500 text-white"
              }`}
            >
      <span className="font-bold">01</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Sankalp Form
      <br />
      <span className="text-sm font-semibold text-gray-700">Fill Name, Gotra & Address</span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full ${
        currentStep >= 3 ? " bg-gray-200 text-gray-500" : "bg-green-500 text-white"
      }`}
    >
      <span className="font-bold">{currentStep > 3 ? "✔" : "02"}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Pay
      <br />
      <span className="text-sm font-semibold text-gray-700">Select a payment method</span>
    </p>
  </div>
</div>

<Payment/>
      </div>
    </div>
    {/* <Homeeight/> */}
   
    </AuthGuard>
  );
};


