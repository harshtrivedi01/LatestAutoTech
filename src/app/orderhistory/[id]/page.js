"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams to get id
import api from "../../lib/axiosInstance";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  const { id } = useParams(); // Extract id from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered with id:", id);

    if (!id) {
      console.log("No order ID found in URL.");
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      console.log("Fetching order details...");

      try {
        const formData = new FormData();
        formData.append("type", "order_detail");
        formData.append("order_id", id);

        console.log("FormData:", [...formData.entries()]);

        const response = await api.post("/orders", formData);

        console.log("API Response Status:", response.status);
        console.log("API Response Data:", response.data);

        if (response.data.status === "1") {
          setOrder(response.data.data); // Ensure correct structure
        } else {
          console.log("Order not found or invalid response.");
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>    {t("Nobookinghistoryavailable")}</p>;
  const steps = [`${t("pending")}`, `${t("confirmed")}`, `${t("picked_up")}`, `${t("delivered")}`];
  const currentStatus = order.delivery_status;
  
  const getActiveStep = (status) => {
    switch (status) {
      case `${t("pending")}`:
        return 0;
      case `${t("confirmed")}`:
        return 1;
      case `${t("picked_up")}`:
        return 2;
      case `${t("delivered")}`:
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };
  
  const activeStep = getActiveStep(currentStatus);
  
  return (
    <div>
      <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container max-w-7xl mx-auto">
            <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
            {t("OrderHistory")}
            </h2>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row mx-auto py-14  gap-6">
        <div className="w-full ">
          <h2 className="text-blue-800 font-semibold text-xl mb-2">
          {t("OrderID")} #{order.code}
          </h2>
          <p className="text-gray-700 text-lg">
          {t("OrderDate")}: <span className="text-blue-700">{order.order_date}</span>
          </p>

          <div className="my-8">
  {/* Status Title */}
  <div className="flex justify-between items-center mb-4">
    <div
      className={`flex items-center text-lg font-semibold ${
        currentStatus === "cancelled" ? "text-red-600" : "text-green-600"
      }`}
    >
      <span
        className={`w-3 h-3 mr-2 rounded-full ${
          currentStatus === "cancelled" ? "bg-red-600" : "bg-green-600"
        }`}
      ></span>
      {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
    </div>
    <div className="text-gray-600 text-base">
      {order.confirmed_date || order.order_date}
    </div>
  </div>

  {/* Progress Dots */}
  {currentStatus !== "cancelled" ? (
    <>
 {/* Vertical Order Status Steps */}
<div className="relative border-l-2 border-gray-300 pl-6 space-y-6 mb-4">
  {steps.map((step, index) => {
    // Match the date fields with steps
    let date = "";
    if (step.toLowerCase().includes(`${t("pending")}`)) date = order.order_date;
    if (step.toLowerCase().includes(`${t("confirmed")}`)) date = order.confirmed_date;
    if (step.toLowerCase().includes(`${t("picked")}`)) date = order.picked_up_date;
    if (step.toLowerCase().includes(`${t("delivered")}`)) date = order.delivered_and_cancelled_date;

    return (
      <div key={index} className="relative flex items-start gap-3 mx-2">
        {/* Dot */}
        <div className="absolute -left-[41px] ">
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              index <= activeStep ? "bg-green-600 border-green-600" : "bg-white border-gray-400"
            }`}
          ></div>
        </div>

        {/* Label and Date */}
        <div>
          <p
            className={`text-sm ${
              index <= activeStep ? "text-green-700 font-semibold" : "text-gray-500"
            }`}
          >
            {step.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
          {date && <p className="text-xs text-gray-400">{date}</p>}
        </div>
      </div>
    );
  })}
</div>

    </>
  ) : (
    <div className="w-full flex items-center justify-center mt-4">
      {/* <div className="flex flex-col items-center">
        <div className="w-5 h-5 bg-red-600 rounded-full"></div>
        <div className="text-red-600 text-sm mt-2">Order Cancelled</div>
      </div> */}
    </div>
  )}
</div>


          <div className="space-y-3">
            {order.products.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border shadow-md flex items-center">
                <img src={item.image || "/images/logo.png"}
                onError={(e) =>(e.target.src ="/images/logo.png")}
                 alt={item.product_name}
                
                 className="w-32 h-32 rounded-lg mr-3 object-contain" />
                <div>
                  <p className="font-semibold text-[#87521B] mb-2">{item.product_name}</p>
                  <p className="text-gray-700 font-bold mb-2">₹ {Math.floor(item.price.toFixed(1))}/-</p>
                  <p className="text-gray-600 text-sm">{t("Qty")} - {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b pb-2 mb-2 pt-10">
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]"> {t("Subtotal")} </span>
              <span className="text-lg font-[500]">₹ {Math.floor(order.sub_total)} /-</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]">{t("ShippingCharges")}</span>
              <span className="text-lg font-[500]">₹ {order.shipping_cost} /-</span>
            </div>
            {/* <div className="flex justify-between text-gray-700">
              <span className="text-lg font-[500]">Coin Discount</span>
              <span className="text-lg font-[500]">₹ {order.coin_discount_amount} /-</span>
            </div> */}
          </div>

          <div className="flex justify-between font-semibold text-xl mb-4">
            <span>{t("GrandTotal")}</span>
            <span>₹ {Math.floor(order.grand_total)} /-</span>
          </div>
        </div>

        <div className="lg:w-4/12 w-full pt-10 lg:pt-24">
          <div className="border-b-2 border-gray-200 ">
            <h3 className="text-gray-800 text-xl font-semibold mb-2">{t("AddressDetails")}</h3>
            <p className="font-semibold text-lg">{order.address.name}</p>
            <p className="text-gray-600 text-lg">{order.address.email}</p>
            <p className="text-gray-600 text-lg">{order.address.phone}</p>
            <p className="text-gray-600 text-lg pb-5">
              {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
            </p>
          </div>
          <div className="mt-5">
          <h3 className="text-gray-800 text-xl font-semibold mb-2">{t("HelpSupport")}</h3>
          <p className="flex items-center">
									<a href={`tel:+91 7340099503`} className="flex border p-2 rounded-xl items-center text-gray-800 hover:text-green-600">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mr-2 bg-green-500 p-2 rounded-full text-white text-xl sm:mr-2">
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
										</svg>
										<span>+91 7340099503</span>
									</a>
								</p>
          </div>
        </div>
      </div>
    </div>
  );
}
