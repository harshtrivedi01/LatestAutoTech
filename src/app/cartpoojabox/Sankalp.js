import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Sankalp({ handleNextStep, list, updateCartQuantity, quantities, handleCartAction }) {
  const router = useRouter();
  const cartItems = list?.cart_list || [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.discounted_price) * item.quantity,
    0
  );

// Razorpay credentials
const razorpayKey = "rzp_test_x2cu9iCvlGjlRs";

const handlePayment = async (method) => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (method === "razorpay") {
    // ✅ Load Razorpay dynamically if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => openRazorpayPayment();
      script.onerror = () => alert("Failed to load Razorpay. Please try again.");
    } else {
      openRazorpayPayment();
    }
  } else {
    // Handle PhonePe Payment
    processPayment("12345", "phonepe");
  }
};

const openRazorpayPayment = () => {
  const options = {
    key: razorpayKey,
    amount: subtotal * 100, // Convert to paise
    currency: "INR",
    name: "Your Store",
    description: "Test Transaction",
    handler: async function (response) {
      console.log("Razorpay Response:", response);
      if (response.razorpay_payment_id) {
        processPayment(response.razorpay_payment_id, "razorpay");
      } else {
        alert("Payment failed!");
      }
    },
    prefill: {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const processPayment = async (paymentId, paymentType) => {
  let formData = new FormData();
  formData.append("type", "order");
  formData.append("address_id", 1);
  formData.append("shipping_cost", 0);
  formData.append("payment_type", paymentType);
  formData.append("payment_status", "success");
  formData.append("coin_discount", 0);
  formData.append("use_coin_status", false);
  formData.append("coin_discount_amount", 0);
  formData.append("grand_total", subtotal);
  formData.append("sub_total", subtotal);
  formData.append("country", "IN");
  formData.append("payment_id", paymentId);
  formData.append("payment_type", paymentType);
  try {

  const response = await api.post("/cart", formData);

    console.log("Payment Response:", response.data);

    // ✅ Check API response status
    if (!response.data || response.data.status === "0") {
      console.error(`Error: ${response.data?.message || "Invalid request"}`);
      return;
    }

    alert("Payment successful!");
    
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Payment failed! Please try again.");
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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3">
        {cartItems.map((item) => (
          <div key={item.id} className="w-full my-5">
            <div className="bg-white p-4 rounded-lg border shadow-xl">
              <div className="flex items-start gap-4">
                <img src={"https://www.punyasetu.com/assets/images/logo.png"||item.image} alt={item.product_name} className="rounded-lg object-cove h-40 w40" />
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
                    <div className="flex items-center rounded-lg shadow-lg border border-orange-400">
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
          <h3 className="font-semibold text-gray-800 text-xl mb-3">SubTotal</h3>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 text-lg">Total</span>
            <span className="text-gray-800 font-semibold text-lg">₹{Math.floor(subtotal)}</span>
          </div>
          <button
            className="w-full common-btn text-white font-semibold py-2 rounded-lg mb-2"
            onClick={() => handlePayment("razorpay")}
          >
            Pay with Razorpay
          </button>
         
        </div>
      </div>
    </div>
  );
}
