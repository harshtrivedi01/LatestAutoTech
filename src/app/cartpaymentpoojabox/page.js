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
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server
const Cart = () => {
  const [pujaData, setPujaData] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store product quantities
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
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
  const cartItems = pujaData?.cart_list || [];  // ✅ Ensure it's an array

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.discounted_price) * (item.quantity || 1),  
    0
  );
  

  const initializeSDK = async () => {
    return await load({ mode: "sandbox" }); // Change to "production" for live
  };
  
  const handlePayment = async () => {
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
      localStorage.setItem("payment_session_id", payment_session_id);
  
      const cashfree = await initializeSDK();
  
      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      }).then(async (pgResponse) => {
        console.log("Payment Response:", pgResponse);
  
        if (pgResponse.error) {
          console.error("Payment Error:", pgResponse.error);
          toast.error(pgResponse.error.message || "Payment failed!");
          router.push(`/failed`); // Redirect to failed page with order ID
          return;
        }
  
        // Extract Payment Details
        const payment_id = pgResponse.transactionId || "12345"; // Use real transaction ID
        const payment_status = pgResponse.paymentStatus == "SUCCESS" ? "success" : "failed";
  
        // Send Order Details to Your API
        let orderFormData = new FormData();
        orderFormData.append("type", "order");
        orderFormData.append("address_id", addressId);
        orderFormData.append("shipping_cost", "0");
        orderFormData.append("payment_type", "cashfree");
        orderFormData.append("payment_status", "success");
        orderFormData.append("coin_discount", "0");
        orderFormData.append("use_coin_status", "0");
        orderFormData.append("coin_discount_amount", "0");
        orderFormData.append("payment_detail", JSON.stringify(pgResponse));
        orderFormData.append("grand_total", Math.floor(subtotal));
        orderFormData.append("sub_total", Math.floor(subtotal));
        orderFormData.append("country", "IN");
        orderFormData.append("payment_id", order_id);
  
        const orderResponse = await api.post("/cart", orderFormData);
        
        const orderData = orderResponse.data;
        console.log("Order Submission Response:", orderData);
  
        if (orderData.status == "1") {
          toast.success("Order placed successfully!");
          router.push("/successpage"); // Redirect to success page
        } else {
          toast.error(orderData.message || "Order placement failed");
          router.push(`/failed?order_id=${orderData.order_id}`); // Redirect to failed page with order ID
        }
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed! Please try again.");
    }
  };
  

  if (subtotal === 0 || cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <button
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          onClick={() => router.push("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <AuthGuard className="bg-gray-50 ">
            <h1 className="f-34 mb-2 font-semibold text-lg mx-40 mt-5">Shopping Cart</h1>
       {/* Progress Steps */}
       <div className="flex mx-40 flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
 <div className="flex items-center mb-4 md:mb-0">
 <div
             className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white `}
           >
             <Toaster position="top-right" reverseOrder={false} />
     <span className="font-bold"><CheckIcon/></span>
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
     className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white`}
   >
     <span className="font-bold"><CheckIcon/></span>
   </div>
   <p className="ml-2 text-sm font-semibold text-gray-700">
    Add Address
     <br />
     <span className="text-sm font-semibold text-gray-700">Select a delivery address</span>
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
      
       <div className="flex flex-col mx-40 mb-40 md:flex-row gap-6">
            <div className="md:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="w-full my-5">
                  <div className="bg-white p-4 rounded-lg border shadow-xl">
                    <div className="flex items-start gap-4">
                      <img src={"/images/logo.png"||item.image} alt={item.product_name} className="rounded-lg object-cove h-40 w40" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.product_name}</h3>
                        <p className="text-gray-500 text-lg mt-1">Special discounted price for you!</p>
      
                        <p>
                          <span className="text-3xl font-bold text-slate-900">
                            ₹{Math.floor(item.discounted_price)}
                          </span>
                          <span className="text-sm ms-2 text-slate-400 line-through">
                            M.R.P ₹{Math.floor(item.price)}
                          </span>
                          <span className="text-red-700 text-lg ms-3">
                            ({Math.floor(item.discount)}% off)
                          </span>
                        </p>
                        
                        <div className="mt-3 flex items-center">
                          <div className="flex items-center rounded-lg shadow-lg border border-[#E5644E]">
                            <button
                              className="text-orange-600 text-lg px-3 py-1"
                              onClick={() => updateCartQuantity(item.product_id, -1)}
                              disabled={(quantities[item.product_id] || item.quantity) <= 1}
                            >
                              -
                            </button>
      
                            <span className="mx-2 text-gray-600">{quantities[item.product_id] || item.quantity}</span>
      
                            <button
                              className="text-orange-600 text-lg px-3 py-1"
                              onClick={() => updateCartQuantity(item.product_id, 1)}
                              disabled={(quantities[item.product_id] || item.quantity) >= item.current_stock}
                            >
                              +
                            </button>
                          </div>
      
                          <FaTrash
                            className="ms-5 text-gray-700 cursor-pointer hover:text-red-600"
                            onClick={() => handleCartAction(item.product_id)}
                          />
      
                          <span className="ml-auto font-bold p-1 lg:p-3 rounded-lg text-white bg-orange-400">
                            ₹{Math.floor((quantities[item.product_id] || item.quantity) * item.discounted_price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow border border-orange-600">
                <h3 className="font-semibold text-gray-800 text-xl mb-3">Checkout</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 text-lg font-semibold">Total</span>
                  <span className="text-gray-800 font-semibold text-lg">₹{Math.floor(subtotal)}</span>
                </div>
                <button
                  className="w-full common-btn text-white font-semibold py-2 rounded-lg mb-2"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
               
              </div>
            </div>
          </div>

    <SliderTwo/>
      </AuthGuard>
  );
};

export default Cart;