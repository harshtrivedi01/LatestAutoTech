"use client";
import React, { useState, useEffect } from "react";
import AuthGuard from "../component/AuthGuard";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../lib/axiosInstance";
import Testimonials from "../poojadetail/Testimonials";
import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [datapackage, setDatapackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to access query parameters
  const [currentStep, setCurrentStep] = useState(2);
  const bookingId = searchParams.get("bookingId");
  useEffect(() => {
    const redirectedFlag = localStorage.getItem("redirected");
    const sessionId = localStorage.getItem("payment_session_id");
    const productDetail = localStorage.getItem("productdeatil");
    const productDetail2 = localStorage.getItem("productdeatil2");

          // If redirected or no payment data, show Home button
          if  (!sessionId && !productDetail && !productDetail2) {
            // localStorage.removeItem("redirected");
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
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("type", "cashfree_payment_order");
      formData.append("order_type", "pooja");
      formData.append("amount", datapackage?.price || "1");
      formData.append("currency", "INR");

      const response = await api.post("/orders", formData);
      const result = await response.data;

      if (result.status === "1" && result.data.payment_session_id) {
        localStorage.setItem("payment_session_id", result.data.payment_session_id);
        localStorage.setItem("redirected", "true");

        const cashfree = await initializeSDK();
        await cashfree
          .checkout({
            paymentSessionId: result.data.payment_session_id,
            redirectTarget: "_modal",
          })
          .then(async (pgResponse) => {
            console.log("Cashfree Response:", pgResponse);

            // Extract payment status
            let paymentStatus =
              pgResponse.paymentDetails?.paymentMessage === "Payment finished. Check status."
                ? "success"
                : "failed";

            // Extract reference ID if available
            let paymentId = pgResponse.paymentDetails?.referenceId || "N/A";

            // Call puja booking API
            const bookingResponse = await completePujaBooking(
              result.data.order_id, // Correct order ID
              paymentId,
              paymentStatus
            );

            if (bookingResponse.status === "1") {
              // If puja booking is successful, remove tokens & redirect
              localStorage.removeItem("redirected");
              localStorage.removeItem("payment_session_id");
              localStorage.removeItem("productdeatil");
              localStorage.removeItem("productdeatil2");

              router.push("/successpage");
            } else {
              router.push("/failed");
            }
          });
      } else {
        console.error("Payment API Error:", result.message);
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment Request Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to call puja booking API
  const completePujaBooking = async (orderId, paymentId, paymentStatus) => {
    try {
      let formData = new FormData();
      formData.append("type", "pooja_booking_payment");
      formData.append("booking_id", bookingId); // Correct order ID
      formData.append("amount", datapackage?.price);
      formData.append("payment_id", orderId);
      formData.append("payment_detail", "");
      formData.append("payment_status", paymentStatus); // Dynamic payment status
      formData.append("payment_type", "cashfree");

      const response = await api.post("/puja", formData);
      return response.data; // Return response for handling in `initiatePayment`
    } catch (error) {
      console.error("Puja Booking API Error:", error);
      return { status: "0" }; // Return failed status to handle redirection
    }
  };






  if (redirected) {
    return (
      <div className="text-center items-center py-60">

        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p><br />
        <button
          onClick={() => router.push("/mybooking")}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg"
        >
          Your Orders
        </button>
      </div>
    );
  }

  return (
    <AuthGuard>
      <h1 className="f-34 mb-2 font-semibold text-lg text-black lg:mx-40  mx-5">  {t("ShoppingCart")} </h1>
      <div className="flex lg:mx-40  mx-5 flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep === 2 ? "bg-green-500 text-white" : " bg-green-500 text-white"
              }`}
          >
            <span className="font-bold "><CheckIcon className="" /></span>
          </div>
          <p className="ml-2 text-sm font-semibold text-gray-700">
          {t("SankalpFormFillNameGotraAddress")}   </p>
        </div>
        <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

        <div className="flex items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${currentStep >= 3 ? " bg-gray-200 text-gray-500" : "bg-green-500 text-white"
              }`}
          >
            <span className="font-bold">{currentStep > 3 ? "✔" : "02"}</span>
          </div>
          <p className="ml-2 text-sm font-semibold text-gray-700">
          {t("PaySelectapaymentmethod")}    </p>
        </div>
      </div>
      <div className=" lg:mx-40  mx-5  p-60">
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
                      className="rounded-lg object-contain h-40"
                      height="100%"
                      width="100%"
                      onError={(e) =>(e.target.src = "/images/logo.png")}
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
                    {t("PackageforPackage")}  {datapackage?.name || "Package"}
                    </p>
                    <p className="text-gray-700 text-lg">₹{datapackage?.price || "0"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full max-w-lg mx-auto p-8">
              <div className="bg-white rounded-2xl shadow-lg border border-orange-500 p-6">
                <h2 className="text-lg font-medium mb-6">  {t("OrderSummary")} </h2>
                <dl className="flex items-center justify-between gap-4 my-5">
                  <dt className="text-xl font-normal text-gray-500">  {t("SubTotal")} </dt>
                  <dd className="text-xl font-medium text-gray-900">₹{datapackage?.price || "0"}</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-2xl font-bold text-gray-900">  {t("Total")} </dt>
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
      <Testimonials/>
    </AuthGuard>
  );
};

export default Payment;
