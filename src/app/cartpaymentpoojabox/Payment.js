"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AuthGuard from "../component/AuthGuard";
import SliderTwo from "../poojaboxdetail/SliderTwo";
import api from "../lib/axiosInstance";
import { FaTrash } from "react-icons/fa";
import { CheckIcon } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import LoadingScreen from "../component/LoadingScreen";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server
const Payment = () => {
  const { t } = useTranslation();
  const [pujaData, setPujaData] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store product quantities
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  const [loading, setLoading] = useState(false);
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

  // Prevent quantity from going below 1
  if (newQuantity < 1) {
    toast.error("Quantity cannot be less than 1");
    return;
  }

  // Prevent exceeding stock
  if (newQuantity > product.current_stock) {
    toast.error("Cannot exceed available stock");
    return;
  }

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

    if (response.status === 200) {
      toast.success(`Quantity updated to ${newQuantity}`);
    } else {
      toast.error(response.data?.message || "Failed to update quantity");
    }

    fetchPujaData(); // Refresh cart
  } catch (error) {
    console.error("Error updating quantity:", error);
    toast.error("Error updating cart. Please try again.");
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
  const cartItems = pujaData?.cart_list || [];  // ✅ Ensure it's an array

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.discounted_price) * (item.quantity || 1),  
    0
  );
  const totalShippingCost = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.shipping_cost || 0), 
    0
  );

  // Calculate final total
  const finalTotal = subtotal + totalShippingCost;


  const initializeSDK = async () => {
    return await load({ mode: "sandbox" }); // Change to "production" for live
  };
  
  const handlePayment = async () => {
    setLoading(true);
    if (!subtotal) {
      toast.error("Your cart is empty!");
      return;
    }
  
    try {
      let formData = new FormData();
      formData.append("type", "cashfree_payment_order");
      formData.append("order_type", "pooja");
      formData.append("amount", Math.floor(subtotal));
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
        orderFormData.append("grand_total", Math.floor(subtotal));
        orderFormData.append("sub_total", Math.floor(subtotal));
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
        failedOrderFormData.append("grand_total", Math.floor(subtotal));
        failedOrderFormData.append("sub_total", Math.floor(subtotal));
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
    finally {
      setLoading(false);
    }
  };
  

  if (subtotal === 0 || cartItems.length === 0) {
    return (
      <div className="text-center min-h-screen py-10">
      <h2 className="text-2xl font-semibold text-gray-700">{t("YourCartisEmpty")}</h2>
      <p className="text-gray-500 mt-2">{t("Lookslikeyouhaventaddedanythingyet")}</p>
      <button
        className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
        onClick={() => router.push("/")}
      >
      {t("GotoHome")}
      </button>
    </div>
    );
  }

  return (
    <AuthGuard className=" bg-gray-50 ">
        <Toaster position="top-right" reverseOrder={false} />
        {loading && (
  <LoadingScreen/>
)}
     <div className="container">
     <h1 className="f-34 mb-2 m-5 font-semibold text-lg md:mx-10 lg:mx-20 xl:mx-40 mt-5">  {t("ShoppingCart")} </h1>
  {/* Progress Steps */}
  <div className="flex flex-col m-5 lg:mx-40 md:flex-row items-center bg-orange-100 rounded-2xl cart  px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40  justify-center p-8 md:p-30 mb-4">
      <div className="flex items-center  md:mb-0">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
      <span className="font-bold"><CheckIcon/></span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("BookingReviewbooking")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-700">Review booking</span> */}
        </p>
      </div>
      <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

      <div className="flex items-center">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
      <span className="font-bold"><CheckIcon/></span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("AddAddressSelectadeliveryaddress")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-400">Select a delivery address</span> */}
        </p>
      </div>
      <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <span className="font-bold ">3</span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("PayinfoSelectapaymentmethod")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-400">Select a payment method</span> */}
        </p>
      </div>
    </div>
      
       <div className="flex flex-col md:mx-10 lg:mx-20 xl:mx-40 m-5 mb-40 md:flex-row gap-6">
       <div className="w-full md:w-2/3">
  {cartItems.map((item) => (
    <div key={item.id} className="w-full my-5">
      <div className="bg-white p-4 rounded-lg border shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Image */}
          <img 
            src={item.image || "/images/logo.png" } 
            alt={item.product_name} 
            className="rounded-lg object-contain h-32 w-32 sm:h-40 sm:w-40"
            onError={(e) => (e.target.src = "/images/logo.png")}
          />
          
          {/* Product Details */}
          <div className="flex-1 w-full">
            <h3 className="font-semibold text-gray-800 text-lg">{item.product_name}</h3>
            <p className="text-gray-500 text-sm my-2 line-clamp-2" dangerouslySetInnerHTML={{ 
              __html: (item.description ? item.description.split(" ").slice(0, 20).join(" ") + "..." : " ") 
            }}></p>

            {/* Price Section */}
            <p>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                ₹{Math.floor(item.discounted_price)}
              </span>
              <span className="text-sm ms-2 text-slate-400 line-through">
                {t("MRP")} ₹{Math.floor(item.price)}
              </span>
              <span className="text-red-700 text-lg ms-3">
                ({Math.floor(item.discount)}% {t("off")})
              </span>
            </p>
            
            {/* Quantity & Remove Button */}
            <div className="mt-3 flex items-center">
                       

<div className="flex items-center rounded-lg shadow-lg border border-[#E5644E]">
  <button
    className="text-orange-600 text-lg px-3 py-1"
    onClick={() => {
      if ((quantities[item.product_id] || item.quantity) <= 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
      updateCartQuantity(item.product_id, -1);
    }}
    // disabled={(quantities[item.product_id] || item.quantity) <= 1}
  >
    -
  </button>

  <span className="mx-2 text-gray-600">{quantities[item.product_id] || item.quantity}</span>

  <button
    className="text-orange-600 text-lg px-3 py-1"
    onClick={() => {
      if ((quantities[item.product_id] || item.quantity) >= item.current_stock) {
        toast.error("Cannot exceed available stock");
        return;
      }
      updateCartQuantity(item.product_id, 1);
    }}
    disabled={(quantities[item.product_id] || item.quantity) >= item.current_stock}
  >
    +
  </button>
</div>

      
                          <FaTrash
                            className="ms-5 text-gray-700 cursor-pointer hover:text-red-600"
                            onClick={() => handleCartAction(item.product_id)}
                          />
      
                        </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            <div className="w-full md:w-1/3">
  <div className="bg-white p-6 rounded-lg shadow border border-orange-600">
    <h3 className="font-semibold text-gray-800 text-xl mb-3">  {t("Checkout")} </h3>

    {/* Subtotal Breakdown */}
    {cartItems.map((item) => {
      const quantity = quantities[item.product_id] || item.quantity;
      const itemTotal = Math.floor(quantity * item.discounted_price);

      return (
        <div key={item.id} className="flex justify-between mb-2">
          <span className="text-gray-600">
            {item.product_name} (x{quantity})
          </span>
          <span className="text-gray-800 font-semibold">₹{itemTotal}</span>
        </div>
      );
    })}
    <div className="flex justify-between mt-3">
              <span className="text-gray-600">{t("ShippingCharges")}</span>
              <span className="text-gray-800 font-semibold">₹{Math.floor(totalShippingCost)}</span>
            </div>

    {/* Total Calculation */}
    <div className="flex justify-between border-t py-2 mt-3">
      <span className="text-gray-600 text-lg font-semibold">{t("Total")}</span>
      <span className="text-gray-800 font-semibold text-lg">₹{Math.floor(finalTotal)}</span>
    </div>
    <button
 className="w-full common-btn text-white font-semibold py-2 rounded-lg mb-2"
  onClick={handlePayment}
  disabled={loading}
>
  {loading ? (
    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  ) : (
    t("PayNow")
  )}
</button>

  
  </div>
</div>

          </div>
     </div>

    <SliderTwo/>
      </AuthGuard>
  );
};

export default Payment;