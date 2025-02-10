"use client";
import React, { useState } from "react";
import Sankalp from "./Sankalp";

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="cart bg-gray-50 min-h-screen p-60">
      <div className="container">
        <h1 className="f-34 mb-2 font-semibold text-lg">Cart</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center p-30 mb-4">
          {/* Step 1 */}
          <div className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <span className="font-bold">{currentStep > 1 ? "✔" : "01"}</span>
            </div>
            <p className="ml-2 text-sm font-semibold text-gray-700">
              Booking
              <br />
              <span className="text-sm font-semibold text-gray-700">Review Booking</span>
            </p>
          </div>
          <div className="w-10 border-t-2 border-gray-300 mx-4"></div>

          {/* Step 2 */}
          <div className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <span className="font-bold">{currentStep > 2 ? "✔" : "02"}</span>
            </div>
            <p className="ml-2 text-sm font-semibold text-gray-700">
              Pay
              <br />
              <span className="text-sm font-semibold text-gray-700">Select a payment method</span>
            </p>
          </div>
          <div className="w-10 border-t-2 border-gray-300 mx-4"></div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentStep === 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <span className="font-bold">03</span>
            </div>
            <p className="ml-2 text-sm font-semibold text-gray-700">Sankalp Form
            <br />
            <span className="text-sm font-semibold text-gray-700">Fill Name , Gotra & Address
            </span>



            </p>
          </div>
        </div>

        {/* Render Component Based on Current Step */}
        {currentStep === 1 && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section */}
            <div className="w-full md:w-2/3">
              <div className="bg-white p-4 rounded-lg shadow">
                {/* Pooja Item */}
                <div className="flex items-start gap-4">
                  <div className="w-1/2">
                    <img
                      src="/images/banner.png"
                      alt="Pooja"
                      className="rounded-lg object-cover"
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path
                    </h3>
                    <p className="text-gray-500 text-lg mt-1">
                      For Mental and Physical Strength to Destroy Negativity in Life
                    </p>
                    <hr className="my-1" />
                    <p className="text-gray-800 text-sm font-semibold mt-2">
                      Package for Individual Pooja
                    </p>
                    <p className="text-gray-700 text-lg">₹1000</p>
                    <p className="text-gray-500 text-sm mt-1 flex gap-2">
                      <i>
                        <img src="/images/poojaPackage/date.svg" />
                      </i>
                      <span className="font-medium">21 December, Saturday</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 text-lg mb-3">Bill details</h3>
                <hr className="my-3" />
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 text-lg">Total</span>
                  <span className="text-gray-800 font-semibold text-lg">₹1000</span>
                </div>
                <button
                  className="w-full common-btn text-white font-semibold py-2 rounded-lg"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-center text-lg font-semibold">Select a Payment Method</h2>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleNextStep}
            >
              Proceed to Sankalp
            </button>
          </div>
        )}

        {currentStep === 3 && <Sankalp />}
      </div>
    </div>
  );
};

export default Cart;
