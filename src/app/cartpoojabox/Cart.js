"use client";
import React, { useState } from "react";
import Sankalp from "./Sankalp";
import { FaTrash } from "react-icons/fa";

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
        <h1 className="f-34 mb-2 font-semibold text-lg">Shopping Cart
        </h1>
        <h1 className=" mb-2  text-xl">You have <span className="text-orange-600">1 item(s)</span> in your cart
        </h1>
        {/* Progress Steps */}
        <div className="flex items-center bg-orange-100 rounded-2xl justify-center p-30 mb-4">
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
            Add Address
              <br />
              <span className="text-sm font-lighter text-gray-400">Select a delivery address</span>
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
            <p className="ml-2 text-sm font-semibold text-gray-700">Payment info
            <br />
            <span className="text-sm font-semibold text-gray-400">Select a payment method
            </span>



            </p>
          </div>
        </div>

        {/* Render Component Based on Current Step */}
        {currentStep === 1 && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section */}
           <div className="md:w-2/3">
           <div className="w-full  my-5">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                {/* Pooja Item */}
                <div className="flex items-start gap-4">
                  <div className="">
                    <img
                      src="/images/poojabox.png"
                      alt="Pooja"
                      className="rounded-lg object-cover h-40 w-40"
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
           
                    <p className="text-gray-500 text-sm mt-1 flex gap-2">
                      <i>
                        <img src="/images/poojaPackage/date.svg" />
                      </i>
                      <span className="font-medium">21 December, Saturday</span>
                    </p>
                    <div className="mt-4 flex items-center">
  <span className="mr-2 text-gray-600">Quantity:</span>
  <div className="flex items-center">
    <button className="bg-gray-200  px-2 py-1" disabled>-</button>
    <span className="mx-2 text-gray-600">1</span>
    <button className="bg-gray-200  px-2 py-1" disabled>+</button>
  </div>
  <FaTrash className="ms-3 text-gray-700"/>
  <span className="ml-auto font-bold">₹1000</span>
</div>

                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  ">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                {/* Pooja Item */}
                <div className="flex items-start gap-4">
                  <div className="">
                    <img
                      src="/images/poojabox.png"
                      alt="Pooja"
                      className="rounded-lg object-cover h-40 w-40"
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
           
                    <p className="text-gray-500 text-sm mt-1 flex gap-2">
                      <i>
                        <img src="/images/poojaPackage/date.svg" />
                      </i>
                      <span className="font-medium">21 December, Saturday</span>
                    </p>
                    <div className="mt-4 flex items-center">
  <span className="mr-2 text-gray-600">Quantity:</span>
  <div className="flex items-center">
    <button className="bg-gray-200  px-2 py-1" disabled>-</button>
    <span className="mx-2 text-gray-600">1</span>
    <button className="bg-gray-200  px-2 py-1" disabled>+</button>
  </div>
  <FaTrash className="ms-3 text-gray-700"/>
  <span className="ml-auto font-bold">₹1000</span>
</div>

                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* Right Section */}
            <div className="w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow border border-orange-600">
                <h3 className="font-semibold text-gray-800 text-xl mb-3">SubTotal</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 font-semibold text-xl">Shipping Charges</span>
                  <span className="text-gray-800 font-semibold text-lg">₹1000</span>
                </div>
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
          


            <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section */}
            <div className="md:w-2/3">
           <div className="w-full  my-5">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                {/* Pooja Item */}
                <div className="flex items-start gap-4">
                  <div className="">
                    <img
                      src="/images/poojabox.png"
                      alt="Pooja"
                      className="rounded-lg object-cover h-40 w-40"
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
           
                    <p className="text-gray-500 text-sm mt-1 flex gap-2">
                      <i>
                        <img src="/images/poojaPackage/date.svg" />
                      </i>
                      <span className="font-medium">21 December, Saturday</span>
                    </p>
                    <div className="mt-4 flex items-center">
  <span className="mr-2 text-gray-600">Quantity:</span>
  <div className="flex items-center">
    <button className="bg-gray-200  px-2 py-1" disabled>-</button>
    <span className="mx-2 text-gray-600">1</span>
    <button className="bg-gray-200  px-2 py-1" disabled>+</button>
  </div>
  <FaTrash className="ms-3 text-gray-700"/>
  <span className="ml-auto font-bold">₹1000</span>
</div>

                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  ">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                {/* Pooja Item */}
                <div className="flex items-start gap-4">
                  <div className="">
                    <img
                      src="/images/poojabox.png"
                      alt="Pooja"
                      className="rounded-lg object-cover h-40 w-40"
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
           
                    <p className="text-gray-500 text-sm mt-1 flex gap-2">
                      <i>
                        <img src="/images/poojaPackage/date.svg" />
                      </i>
                      <span className="font-medium">21 December, Saturday</span>
                    </p>
                    <div className="mt-4 flex items-center">
  <span className="mr-2 text-gray-600">Quantity:</span>
  <div className="flex items-center">
    <button className="bg-gray-200  px-2 py-1" disabled>-</button>
    <span className="mx-2 text-gray-600">1</span>
    <button className="bg-gray-200  px-2 py-1" disabled>+</button>
  </div>
  <FaTrash className="ms-3 text-gray-700"/>
  <span className="ml-auto font-bold">₹1000</span>
</div>

                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Right Section */}
            <div className="w-full max-w-lg mx-auto  p-8">
  <div className="bg-white rounded-2xl shadow-lg border border-orange-500 p-6">
    <h2 className="text-lg font-medium mb-6">Card Type</h2>
    <div className="my-6 flex items-center justify-start gap-8">
  <img className="h-8 w-auto dark:hidden " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
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
    <dt className="text-xl font-normal text-gray-500 dark:text-gray-400">SubTotal</dt>
    <dd className="text-xl font-medium text-gray-900 dark:text-white">$799</dd>
  </dl>
  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
    <dt className="text-2xl font-bold text-gray-900 dark:text-white">Total</dt>
    <dd className="text-xl font-bold text-gray-900 dark:text-white">$7,191.00</dd>
  </dl>
</div>

      
      <button
                  className="w-full common-btn text-white font-semibold py-2 mt-5 rounded-lg"
                  onClick={handleNextStep}
                >
                  Pay Now
                </button>
    </form>
  </div>
</div>

          </div>

         
          </div>
        )}

        {currentStep === 3 && <Sankalp />}
      </div>
    </div>
  );
};

export default Cart;
