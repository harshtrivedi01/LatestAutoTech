"use client";
import React, { useState } from "react";
import Sankalp from "./Sankalp";
import AuthGuard from "../component/AuthGuard";
import Homeeight from "../Home/Homeeight";
import Testimonials from "../component/Testimonials";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
 


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
                currentStep === 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
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
        currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
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

        {currentStep === 2 && <Sankalp handleNextStep={handleNextStep}  />}

        {currentStep === 3 &&  (
          <div>
          


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
            <div className="w-full max-w-lg mx-auto  p-8">
  <div className="bg-white rounded-2xl shadow-lg border border-orange-500 p-6">
    <h2 className="text-lg font-medium mb-6">Card Type</h2>
    <div className="my-6 flex items-center justify-start gap-8">
  <img className="h-8 w-auto hidden " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
  <img className="hidden h-8 w-auto flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
  <img className="h-8 w-auto hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
  <img className="hidden h-8 w-auto flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
  <img className="h-8 w-auto hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
  <img className="hidden h-8 w-auto flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
</div>

    <form>
      <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2 sm:col-span-2">
          <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
          <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="col-span-2 sm:col-span-2">
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
          <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
          <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
          <input type="text" name="cvv" id="cvv"  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        </div>
        
      </div>
      <div>
  <dl className="flex items-center justify-between gap-4 my-5">
    <dt className="text-xl font-normal text-gray-500 text-gray-400">SubTotal</dt>
    <dd className="text-xl font-medium text-gray-900 text-white">$799</dd>
  </dl>
  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 border-gray-700">
    <dt className="text-2xl font-bold text-gray-900 text-white">Total</dt>
    <dd className="text-xl font-bold text-gray-900 text-white">$7,191.00</dd>
  </dl>
</div>

      
      <button
                  className="w-full common-btn text-white font-semibold py-2 mt-5 rounded-lg"
                  // onClick={handleNextStep}
                >
                  Pay Now
                </button>
    </form>
  </div>
</div>

          </div>

         
          </div>
        )}
      </div>
    </div>
    {/* <Homeeight/> */}
   
    </AuthGuard>
  );
};

export default Cart;
