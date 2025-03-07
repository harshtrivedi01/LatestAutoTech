"use client";
import React, { useEffect, useState } from "react";
import Sankalp from "./Sankalp";
import Cartlist from "./Cartlist";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Address from "./Address";
import AuthGuard from "../component/AuthGuard";
import SliderTwo from "../poojaboxdetail/SliderTwo";
import api from "../lib/axiosInstance";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pujaData, setPujaData] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store product quantities

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "cart_list");
      formData.append("page", 1);

      const response = await api.post("/cart", formData);

      console.log("Puja API Response:", response.data);
      setPujaData(response.data.data);

      // Initialize quantity state with API data
      const initialQuantities = {};
      response.data.data.cart_list.forEach(item => {
        initialQuantities[item.product_id] = item.quantity;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const updateCartQuantity = async (productId, change) => {
    const product = pujaData?.cart_list.find((item) => item.product_id === productId);
    if (!product) return;
  
    const newQuantity = (quantities[productId] || product.quantity) + change;
  
    // Prevent quantity from going below 1 or above current stock
    if (newQuantity < 1 || newQuantity > product.current_stock) return;
  
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  
    try {
      let formData = new FormData();
      formData.append("type", "update_cart_quantity");
      formData.append(
        "update_detail",
        JSON.stringify([{ product_id: productId, quantity: newQuantity }])
      );
  
      const response = await api.post("/cart", formData);
  
      console.log("Quantity Update Response:", response.data);
      fetchPujaData(); // Refresh cart
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  const handleCartAction = async (id) => {
    try {
      let formData = new FormData();
      formData.append("type", "remove_cart");
      formData.append("product_id", id);
      // formData.append("quantity", "1");
  
      const response = await api.post("/cart", formData);
  
      console.log("Cart Action Response:", response.data);
  
      if (response.data.status == 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        toast.success(response.data.message || "Removed from cart!");
        fetchPujaData(); // Refresh the cart list
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling cart action:", error);
    }
  };
  const cartItems = pujaData?.total_items || [];
  
  
  return (
    <AuthGuard className="bg-gray-50">
      <div className="cart  min-h-screen mx-20 p-60">
       <Toaster position="top-right" reverseOrder={false} /> 
      <div className="container">
        <h1 className="f-34 mb-2 font-semibold text-lg">Shopping Cart</h1>
        <h1 className="mb-2 text-xl">
          You have <span className="text-orange-600">{cartItems || "0"} item(s)</span> in your cart
        </h1>

        {/* Progress Steps */}
        <div className="flex  flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
  <div className="flex items-center mb-4 md:mb-0">
  <div
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white `}
            >
      <span className="font-bold">{1}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Booking 
      <br />
      <span className="text-sm font-semibold text-gray-700">Review booking </span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}
    >
      <span className="font-bold">{2}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
     Add Address
      <br />
      <span className="text-sm font-semibold text-gray-400">Select a delivery address</span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>
  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}
    >
      <span className="font-bold">{3}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Pay info
      <br />
      <span className="text-sm font-semibold text-gray-400">Select a payment method</span>
    </p>
  </div>
</div>

        {currentStep === 1 && (
          <Cartlist
            handleNextStep={() => setCurrentStep(2)}
            list={pujaData}
            updateCartQuantity={updateCartQuantity}
            quantities={quantities}
            handleCartAction={handleCartAction}
          />
        )}

        {currentStep === 2 && (
          <Address
          handleNextStep={() => setCurrentStep(3)}
        />)}
        {currentStep === 3 && <Sankalp
          handleNextStep={() => setCurrentStep(2)}
          list={pujaData}
          updateCartQuantity={updateCartQuantity}
          quantities={quantities}
          handleCartAction={handleCartAction}
        />}
      </div>
    </div>

    <SliderTwo />
      </AuthGuard>

  );
};

export default Cart;









