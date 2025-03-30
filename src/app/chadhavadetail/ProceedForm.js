import { load } from "@cashfreepayments/cashfree-js";
import React, { useState } from "react";
import api from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const ProceedForm = ({ handleClose, carts,totalPrice, id }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", gotra: "" });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter(); // Initialize useRouter
    const [loading, setLoading] = useState(false);
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
     return await load({ mode: "sandbox" });
   };
 
   const handlePayment = async () => {
    setLoading(true);
  
    try {
      if (totalPrice === 0) {
        // Directly call /chadhava API if totalPrice is 0
        let formDataToSend = new FormData();
        formDataToSend.append("type", "chadhava_order");
        formDataToSend.append("chadhava_id", id);
        formDataToSend.append("amount", totalPrice);
        formDataToSend.append("payment_id", "NULL"); // No payment ID when total is 0
        formDataToSend.append("payment_detail", "");
        formDataToSend.append("payment_status", "success"); // Mark as success since no payment is needed
        formDataToSend.append("payment_type", "none"); // Indicate no payment gateway used
        formDataToSend.append("currency", "inr");
        formDataToSend.append("name", formData.name);
        formDataToSend.append("gotra", formData.gotra);
        formDataToSend.append("carts", JSON.stringify(carts));
  
        const response = await api.post("/chadhava", formDataToSend);
        const result = response.data;
  
        if (result.status === "1") {
          router.push("/successpage"); // Redirect to success page
        } else {
          router.push("/failed"); // Redirect to failure page
        }
      } else {
        // Proceed with the payment process as usual
        let formData = new FormData();
        formData.append("type", "cashfree_payment_order");
        formData.append("order_type", "chadhava");
        formData.append("amount", totalPrice);
        formData.append("currency", "INR");
  
        const response = await api.post("/orders", formData);
        const result = response.data;
  
        if (result.status === "1" && result.data.payment_session_id) {
          const cashfree = await initializeSDK();
          await cashfree
            .checkout({
              paymentSessionId: result.data.payment_session_id,
              redirectTarget: "_modal",
            })
            .then(async (pgResponse) => {
              let paymentStatus =
                pgResponse.paymentDetails?.paymentMessage === "Payment finished. Check status."
                  ? "success"
                  : "failed";
  
              let paymentId = pgResponse.paymentDetails?.referenceId || "N/A";
  
              const bookingResponse = await completePujaBooking(
                result.data.order_id,
                paymentId,
                paymentStatus
              );
  
              if (bookingResponse.status === "1") {
                localStorage.removeItem("activeSection"); // Remove the token
                localStorage.removeItem("activeSubscriptionTab"); // Remove the token
                router.push("/successpage");
              } else {
                router.push("/failed");
              }
            });
        } else {
          console.error("Payment API Error:", result.message);
          alert("Failed to initiate payment. Please try again.");
        }
      }
    } catch (error) {
      console.error("Payment Request Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
 
  
   const completePujaBooking = async (orderId, paymentId, paymentStatus) => {
    try {
      let formDataToSend = new FormData();
      formDataToSend.append("type", "chadhava_order");
      formDataToSend.append("chadhava_id", id); // Correct order ID
      formDataToSend.append("amount", totalPrice);
      formDataToSend.append("payment_id", orderId);
      formDataToSend.append("payment_detail", "");
      formDataToSend.append("payment_status", paymentStatus); // Dynamic payment status
      formDataToSend.append("payment_type", "cashfree");
      formDataToSend.append("currency", "inr"); // Default to INR if not provided
      formDataToSend.append("name", formData.name); // Add name
      formDataToSend.append("gotra", formData.gotra); // Add gotra
      formDataToSend.append("carts", JSON.stringify(carts)); // Send carts data
      const response = await api.post("/chadhava", formDataToSend);
      return response.data; // Return response for handling in `initiatePayment`
    } catch (error) {
      console.error("API Error:", error);
      return { status: "0" }; // Return failed status to handle redirection
    }
  };
  
 
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 overflow-hidden">

        <Toaster position="top-right" reverseOrder={false} />
    <div className="bg-orange-50 border border-orange-600 relative p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-lg md:max-w-2xl">

        <button
          className="absolute -top-5 -right-4 px-4 py-2 bg-red-700 text-white rounded-full"
          onClick={handleClose} // ✅ FIXED
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-start">{t("SankalpForm")}</h2>
        <p className="text-sm text-gray-600 text-start mb-4">
        {t("Chadhavawillbe")}
        </p>
{/* {id} {totalPrice} */}
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{t("Name")}</label>
          <input
            type="text"
            name="name"
            placeholder={t("Enteryourname")}
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
          <label className="block text-sm font-medium text-gray-700">{t("Gotra")}</label>
          <input
            type="text"
            name="gotra"
            placeholder={t("EnteryourGotra")}
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
          <label className="text-sm text-gray-700">{t("IdontknowmyGotra")}</label>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
        <button
  className="w-full px-8 sm:px-10 py-2 text-lg bg-orange-500 text-white rounded-full"
  onClick={onSubmit}
>
{t("SubmitPay")}
 
</button>

        </div>
      </div>
    </div>
  );
};

export default ProceedForm;
