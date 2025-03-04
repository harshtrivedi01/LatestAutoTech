"use client";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { PiKeyReturnLight } from "react-icons/pi";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function Page() {
  return (
    <div>
      <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
                  Order History
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl flex flex-col lg:flex-row mx-auto py-14 px-5 gap-6">
        <div className="lg:w-7/12 w-full px-4">
          <h2 className="text-blue-800 font-semibold text-xl mb-2">
            Order ID: #20250206-16393898
          </h2>
          <p className="text-gray-700 text-lg">
            Order Date : <span className="text-blue-700">Feb 06, 2025</span>
          </p>

          <div className="flex justify-between items-center my-8">
            <div className="flex flex-col">
              <div className="flex items-center text-green-600 xl:text-lg lg:text-lg sm:text-sm md:text-lg">
                <span className="w-3 h-3 bg-green-600 rounded-full mr-1"></span>
                Order Confirmed
              </div>
              <div className="text-gray-700 text-lg text-center">Feb 06</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-red-600 xl:text-lg lg:text-lg sm:text-sm md:text-lg">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span>
                Order Cancelled
              </div>
              <div className="text-gray-700 text-lg text-center">Feb 06</div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: "Ganpati Pooja Box", price: 1280.0 },
              { name: "Laxmi Pooja Box", price: 1800.0 },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg shadow-md flex items-center"
              >
                <img
                  src="/images/poojabox.png"
                  alt={item.name}
                  className="w-32 h-32 rounded-lg mr-3"
                />
                <div>
                  <p className="font-semibold text-[#87521B] mb-2">
                    {item.name}
                  </p>
                  <p className="text-gray-700 font-bold mb-2">
                    ₹ {item.price.toFixed(1)}
                  </p>
                  <p className="text-gray-600 text-sm">Qty - 1</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b pb-2 mb-2 pt-10">
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]">Subtotal</span>
              <span className="text-lg font-[500]">₹ 3,079.2 /-</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]">Shipping Charges</span>
              <span className="text-lg font-[500]">₹ 80 /-</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="text-lg font-[500]">Coin Discount</span>
              <span className="text-lg font-[500]">₹ 0 /-</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-xl mb-4">
            <span>Grand Total</span>
            <span>₹ 3,159.2 /-</span>
          </div>
        </div>

        <div className="lg:w-4/12 w-full pt-10 lg:pt-24">
          <div className="border-b-2 border-gray-200 ">
            <h3 className="text-gray-800 text-xl font-semibold mb-2">
              Shipping
            </h3>
            <div className="">
              <p className="font-semibold text-lg">sejal</p>
              <p className="text-gray-600 text-lg">syywhw@gmail.com</p>
              <p className="text-gray-600 text-lg">8464949464</p>
              <p className="text-gray-600 text-lg pb-5">
                sgyshs, Port Blair, Andaman and Nicobar Islands - 464655
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-800 text-lg font-semibold mb-2">
              Need help?
            </h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-gray-700 text-lg">
                <CiCircleInfo className="text-lg" />{" "}
                <span className="pl-2"> Order Issues →</span>
              </a>
              <a href="#" className="flex items-center text-gray-700 text-lg">
                <PiKeyReturnLight /> <span className="pl-2">Returns →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


