"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams to get id
import api from "../../lib/axiosInstance";

export default function Page() {
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
  if (!order) return <p>No order details found.</p>;

  return (
    <div>
      <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container">
            <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
              Order History
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl flex flex-col lg:flex-row mx-auto py-14 px-5 gap-6">
        <div className="lg:w-7/12 w-full px-4">
          <h2 className="text-blue-800 font-semibold text-xl mb-2">
            Order ID: #{order.order_id}
          </h2>
          <p className="text-gray-700 text-lg">
            Order Date: <span className="text-blue-700">{order.order_date}</span>
          </p>

          <div className="flex justify-between items-center my-8">
            <div className="flex flex-col">
              <div
                className={`flex items-center ${
                  order.delivery_status === "cancelled" ? "text-red-600" : "text-green-600"
                } xl:text-lg lg:text-lg sm:text-sm md:text-lg`}
              >
                <span
                  className={`w-3 h-3 ${
                    order.delivery_status === "cancelled" ? "bg-red-600" : "bg-green-600"
                  } rounded-full mr-1`}
                ></span>
                {order.delivery_status.charAt(0).toUpperCase() + order.delivery_status.slice(1)}
              </div>
              <div className="text-gray-700 text-lg text-center">{order.confirmed_date}</div>
            </div>
          </div>

          <div className="space-y-3">
            {order.products.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border shadow-md flex items-center">
                <img src={item.image || "/images/logo.png"}
                onError={(e) =>(e.target.src ="/images/logo.png")}
                 alt={item.product_name}
                
                 className="w-32 h-32 rounded-lg mr-3" />
                <div>
                  <p className="font-semibold text-[#87521B] mb-2">{item.product_name}</p>
                  <p className="text-gray-700 font-bold mb-2">₹ {Math.floor(item.price.toFixed(1))}</p>
                  <p className="text-gray-600 text-sm">Qty - {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b pb-2 mb-2 pt-10">
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]">Subtotal</span>
              <span className="text-lg font-[500]">₹ {Math.floor(order.sub_total)} /-</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="text-lg font-[500]">Shipping Charges</span>
              <span className="text-lg font-[500]">₹ {order.shipping_cost} /-</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="text-lg font-[500]">Coin Discount</span>
              <span className="text-lg font-[500]">₹ {order.coin_discount_amount} /-</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-xl mb-4">
            <span>Grand Total</span>
            <span>₹ {Math.floor(order.grand_total)} /-</span>
          </div>
        </div>

        <div className="lg:w-4/12 w-full pt-10 lg:pt-24">
          <div className="border-b-2 border-gray-200 ">
            <h3 className="text-gray-800 text-xl font-semibold mb-2">Shipping</h3>
            <p className="font-semibold text-lg">{order.address.name}</p>
            <p className="text-gray-600 text-lg">{order.address.email}</p>
            <p className="text-gray-600 text-lg">{order.address.phone}</p>
            <p className="text-gray-600 text-lg pb-5">
              {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
