"use client";
import React, { useState, useEffect } from "react";
import AuthGuard from "../component/AuthGuard";
import { load } from "@cashfreepayments/cashfree-js";
import { redirect } from "next/dist/server/api-utils";

const Payment = () => {
  const [data, setData] = useState(null);
  const [datapackage, setDatapackage] = useState(null);
  const [loading, setLoading] = useState(false);

// Load Cashfree SDK in sandbox mode
const initializeSDK = async () => {
    const cashfree = await load({ mode: "sandbox" });
    return cashfree;
  };
  

  useEffect(() => {
    initializeSDK(); // Load SDK when component mounts
  }, []);
  useEffect(() => {
    const datastorage = localStorage.getItem("productdeatil");
    const datastoragepackge = localStorage.getItem("productdeatil2");
    setData(datastorage ? JSON.parse(datastorage) : {});
    setDatapackage(datastoragepackge ? JSON.parse(datastoragepackge) : {});
  }, []);


// Initiate Cashfree payment process
const initiatePayment = async (sessionId) => {
  const cashfree = await initializeSDK();

  const checkoutOptions = {
    paymentSessionId: "session_jiyjTDbnqEbalG64ZPqHDOgZ818mtFOP8Uaa7tFV8MmM6USS0CntRs3xy8eWq_Th_nQJz3AcXIzcRp5r_vw2XGrSTmY6Rf-anpW5ocKsO06W3M0wgdMgoJi0Qwpaymentpayment",
    redirectTarget: "_self", // Ensures the redirect happens in the same tab
    redirectUrl: `https://yourwebsite.com/payment-response`, // Redirect to a custom success/failure page
  };
  
  console.log("Starting checkout with options:", checkoutOptions);
  cashfree.checkout(checkoutOptions);
};
  return (
    <AuthGuard>
      <div className="cart b50 min-h-screen p-60">
        <div className="container">
          <div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section */}
              <div className="w-full md:w-2/3">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-1/2">
                      <img
                        src={data?.image || ""}
                        alt="Pooja"
                        className="rounded-lg object-cover"
                        height="100%"
                        width="100%"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {data?.name || "Pooja Name"}
                      </h3>
                      <p className="text-gray-500 text-lg mt-1">
                        {data?.puja_description
                          ? data.puja_description.split(" ").slice(0, 18).join(" ") +
                            (data.puja_description.split(" ").length > 18 ? "..." : "")
                          : "Puja description goes here."}
                      </p>
                      <hr className="my-1" />
                      <p className="text-gray-800 text-sm font-semibold mt-2">
                        Package for {datapackage?.name || "Package"}
                      </p>
                      <p className="text-gray-700 text-lg">₹{datapackage?.price || "0"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Section */}
              <div className="w-full max-w-lg mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-lg border border-orange-500 p-6">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                  <dl className="flex items-center justify-between gap-4 my-5">
                    <dt className="text-xl font-normal text-gray-500">SubTotal</dt>
                    <dd className="text-xl font-medium text-gray-900">₹{datapackage?.price || "0"}</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-2xl font-bold text-gray-900">Total</dt>
                    <dd className="text-xl font-bold text-gray-900">₹{datapackage?.price || "0"}</dd>
                  </dl>
                  <button
                    onClick={initiatePayment} // Replace with real orderId
                    disabled={loading}
                    className="w-full common-btn text-white font-semibold py-2 mt-5 rounded-lg bg-orange-500"
                  >
                    {loading ? "Checking..." : "Check Payment Status"}
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Payment;
