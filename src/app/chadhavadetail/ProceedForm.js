import { load } from "@cashfreepayments/cashfree-js";
import React, { useState } from "react";
import api from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const ProceedForm = ({ handleClose, handleSubmit,totalPrice }) => {
  const [formData, setFormData] = useState({ name: "", gotra: "" });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFormData({ ...formData, gotra: !isChecked ? "Kashyap" : "" });

    // Clear error if checkbox is checked
    if (!isChecked) setErrors({ ...errors, gotra: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    const alphabetRegex = /^[A-Za-z\s]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (!alphabetRegex.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed!";
    }

    if (!formData.gotra.trim()) {
      newErrors.gotra = "Gotra is required!";
    } else if (!alphabetRegex.test(formData.gotra)) {
      newErrors.gotra = "Only alphabets are allowed!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      handlePayment(); // Send form data
    }
  };
  const initializeSDK = async () => {
    return await load({ mode: "sandbox" }); // Change to "production" for live
  };
  
  const handlePayment = async () => {
    if (!totalPrice) {
      toast.error("Your cart is empty!");
      return;
    }
  
    try {
      let formData = new FormData();
      formData.append("type", "cashfree_payment_order");
      formData.append("order_type", "pooja");
      formData.append("amount", Math.floor(totalPrice));
      formData.append("currency", "INR");
  
      const response = await api.post("/orders", formData);
      console.log("Order API Response:", response.data);
  
      if (response.data.status !== "1") {
        toast.error(response.data.message || "Payment initiation failed");
        return;
      }
  
      const payment_session_id = response.data.data.payment_session_id;
      const order_id = response.data.data.order_id; // Extract order_id

      if(order_id) {
        localStorage.setItem("payment_session_id", payment_session_id);
  
      const cashfree = await initializeSDK();
  
      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      }).then(async (pgResponse) => {
        console.log("Payment Response:", pgResponse);
  
        let orderFormData = new FormData();
        orderFormData.append("type", "order");
        orderFormData.append("address_id", addressId);
        orderFormData.append("shipping_cost", "0");
        orderFormData.append("payment_type", "cashfree");
        orderFormData.append("payment_status", 'NA');
        orderFormData.append("coin_discount", "0");
        orderFormData.append("use_coin_status", "0");
        orderFormData.append("coin_discount_amount", "0");
        orderFormData.append("payment_detail", 'NA');
        orderFormData.append("grand_total", Math.floor(totalPrice));
        orderFormData.append("sub_total", Math.floor(totalPrice));
        orderFormData.append("country", "IN");
        orderFormData.append("payment_id", order_id);
  
        try {
          const orderResponse = await api.post("/cart", orderFormData);
          console.log("Order Submission Response:", orderResponse);
  
          if (orderResponse.data.status == 1) {
            toast.success("Order placed successfully!");
            router.push("/successpage");
          } else {
            toast.error(orderResponse.data.message || "Order placement failed");
            router.push(`/failedcartpage`);
          }
        } catch (orderError) {
          console.error("Error submitting order:", orderError);
          toast.error("Order processing failed!");
          router.push(`/failedcartpage`);
        }
      }).catch((paymentError) => {
        console.error("Payment SDK Error:", paymentError);
        toast.error("Payment failed! Please try again.");
  
        // Ensure order API is still called even if payment fails
        let failedOrderFormData = new FormData();
        failedOrderFormData.append("type", "order");
        failedOrderFormData.append("address_id", addressId);
        failedOrderFormData.append("shipping_cost", "0");
        failedOrderFormData.append("payment_type", "cashfree");
        failedOrderFormData.append("payment_status", "failed");
        failedOrderFormData.append("coin_discount", "0");
        failedOrderFormData.append("use_coin_status", "0");
        failedOrderFormData.append("coin_discount_amount", "0");
        failedOrderFormData.append("payment_detail", JSON.stringify(paymentError));
        failedOrderFormData.append("grand_total", Math.floor(totalPrice));
        failedOrderFormData.append("sub_total", Math.floor(totalPrice));
        failedOrderFormData.append("country", "IN");
        failedOrderFormData.append("payment_id", order_id);
  
        api.post("/cart", failedOrderFormData)
          .then(() => router.push(`/failedcartpage`))
          .catch(() => router.push(`/failedcartpage`));
      });
      } else {
        toast.error("Something went wrong! Please try again.");
      }
      
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed! Please try again.");
      router.push(`/failedcartpage`);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
        <Toaster position="top-right" reverseOrder={false} />
    <div className="bg-orange-50 border border-orange-600 relative p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-lg md:max-w-2xl">

        <button
          className="absolute -top-5 -right-4 px-4 py-2 bg-red-700 text-white rounded-full"
          onClick={handleClose} // ✅ FIXED
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-start">Sankalp Form</h2>
        <p className="text-sm text-gray-600 text-start mb-4">
          Chadhava will be offered by the name provided below
        </p>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }
            }}
            className="w-full px-3 py-2 border rounded-lg mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Gotra Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gotra</label>
          <input
            type="text"
            name="gotra"
            placeholder="Enter Gotra"
            value={formData.gotra}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, gotra: e.target.value });
                setErrors({ ...errors, gotra: "" });
              }
            }}
            disabled={isChecked}
            className="w-full px-3 py-2 border rounded-lg mt-1 disabled:bg-gray-100"
          />
          {errors.gotra && <p className="text-red-500 text-sm mt-1">{errors.gotra}</p>}
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">I don't know my Gotra</label>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
        <button
  className="w-full px-8 sm:px-10 py-2 text-lg bg-orange-500 text-white rounded-full"
  onClick={onSubmit}
>
  Submit & Pay
</button>

        </div>
      </div>
    </div>
  );
};

export default ProceedForm;
