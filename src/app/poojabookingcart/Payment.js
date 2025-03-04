"use client";
import React, { useState, useEffect } from "react";
import AuthGuard from "../component/AuthGuard";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter } from "next/navigation";

const Payment = () => {
  const [data, setData] = useState(null);
  const [datapackage, setDatapackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const redirectedFlag = localStorage.getItem("redirected");
    const sessionId = localStorage.getItem("payment_session_id");
    const productDetail = localStorage.getItem("productdeatil");
    const productDetail2 = localStorage.getItem("productdeatil2");

    // If redirected or no payment data, show Home button
    if (redirectedFlag || (!sessionId && !productDetail && !productDetail2)) {
      localStorage.removeItem("redirected");
      localStorage.removeItem("payment_session_id");
      localStorage.removeItem("productdeatil");
      localStorage.removeItem("productdeatil2");
      setRedirected(true);
      return;
    }

    // Load product details if available
    setData(productDetail ? JSON.parse(productDetail) : {});
    setDatapackage(productDetail2 ? JSON.parse(productDetail2) : {});
  }, []);

  const initializeSDK = async () => {
    return await load({ mode: "sandbox" });
  };

  const initiatePayment = async () => {
    try {
      localStorage.setItem("redirected", "true");
      const cashfree = await initializeSDK();
      await cashfree.checkout({
        paymentSessionId: localStorage.getItem("payment_session_id"),
        redirectTarget: "_modal",
        // redirectUrl: "https://punyasetu.live/generic/api/payment"
      }).then((pgResponse) => {
console.log("pgResponse")
      });
    } catch (error) {
      console.error("Cashfree Payment Error:", error);
    }
  };

  if (redirected) {
    return (
      <div className="text-center items-center py-10">
        
         <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p><br/>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg"
        >
          Home
        </button>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="cart b50 min-h-screen p-60">
        <div className="container">
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
                  onClick={initiatePayment}
                  disabled={loading}
                  className="w-full common-btn text-white font-semibold py-2 mt-5 rounded-lg bg-orange-500"
                >
                  {loading ? "Checking..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Payment;
