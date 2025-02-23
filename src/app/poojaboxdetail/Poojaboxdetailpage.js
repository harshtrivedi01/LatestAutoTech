

"use client";

import { useParams, useRouter } from "next/navigation";
import Content from "./Content";
import Faq from "./Faq";
import "./Poojadetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SliderOne from "./SliderOne";
import SliderTwo from "./SliderTwo";
import { Heart, HeartIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Poojaboxdetailpage() {
  const { id } = useParams();
  const [pujaData, setPujaData] = useState(null);

  const [cartStatus, setCartStatus] = useState(); // Track cart status
  const [wishlistStatus, setWishlistStatus] = useState();
  const router = useRouter(); // Initialize router

  const header = {
    "language": "en",
    "userId": "2",
    "user_type": "user",
    "Device_id": "upen",
    "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
    "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
    "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
    "web_token": localStorage.getItem("authToken"),
  }

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "product_detail");
      formData.append("product_id", id);

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/products",
        formData,
        {
          headers: header
        }
      );

      console.log("Puja API Response:", response.data);
      setPujaData(response.data.data);
      setCartStatus(response.data.data.cart_status)
      setWishlistStatus(response.data.data.wishlist_status)
      
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  if (!pujaData) return <div>Loading...</div>;
  
  const handleCartAction = async (id) => {
    try {
      let formData = new FormData();
      formData.append("type", cartStatus ? "remove_cart" : "add_to_cart");
      formData.append("product_id", id);
      formData.append("quantity", "1");

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/cart",
        formData,
        {
          headers: header
        }
      );

      console.log("Cart Action Response:", response.data);

      if (response.data.status == 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        setCartStatus(!cartStatus); // Toggle cart status
        toast.success(response.data.message || (cartStatus ? "Removed from cart!" : "Added to cart!"));
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling cart action:", error);
    }
  };

 
  const handleBuyNow = async (id) => {
    try {
      let formData = new FormData();
      formData.append("type", "add_to_cart");
      formData.append("product_id", id);
      formData.append("quantity", "1");

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/cart",
        formData,
        {
          headers: header
        }
      );

      console.log("Buy Now Response:", response.data);

      if (response.data.status == 0 && response.data.message.trim() === "product is already in the cart") {
        toast.error("Product is already in the cart. Redirecting...");
        setTimeout(() => {
          router.push("/cartpoojabox");
        }, 50); // Short delay before redirecting
      } else if (response.data.status == 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        toast.success("Added to cart! Redirecting...");
        setTimeout(() => {
          router.push("/cartpoojabox");
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error in Buy Now action:", error);
    }
  };
   
  
  const handleWishlistAction = async (id) => {
    try {
      let formData = new FormData();
      formData.append("type", wishlistStatus ? "add_to_wishlist" : "add_to_wishlist");
      formData.append("product_id", id);

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/products",
        formData,
        {
          headers: header
        }
      );

      console.log("Wishlist Action Response:", response.data);

      if (response.data.status === 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        setWishlistStatus(!wishlistStatus);
        toast.success(response.data.message || (wishlistStatus ? "Removed from wishlist!" : "Added to wishlist!"));
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling wishlist action:", error);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> 
      <section className="poojadetail p-60">
        <div className="container">
          <div className="flex flex-col justify-center">
          <div className="relative flex flex-col md:flex-row md:flex-row md:space-x-5 lg:mx-[40px] space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border border-white bg-white">
  {/* Product Image */}
  <div className="w-full md:w-1/2 bg-white grid place-items-center">
    <img src={pujaData.image || "/images/poojabox.png"}
      onError={(e) => (e.target.src = "/images/poojabox.png")}
    alt="product image" className="w-full h-[400px]" />
  </div>

  {/* Product Details */}
  <div className="w-full md:w-1/2 bg-white flex flex-col space-y-4 p-3">
    <h3 className="font-black flex justify-between text-[#BA1A1A] border-b border-b-[#BA1A1A] md:text-3xl text-xl">
      {pujaData.name || "Product Name"}
      <button
        onClick={() => handleWishlistAction(pujaData.id)}
        className="focus:outline-none"
      >
        {/* <HeartIcon
          className={`h-6 w-6 ${wishlistStatus ? "fill-red-600" : "fill-white"}`}
        /> */}
      </button>
    </h3>

    {/* Rating Section */}
    <div className="flex justify-between items-center">
      <div className="flex items-center mb-5">
        <p className="text-gray-600 font-bold text-sm ml-1">
          {pujaData.rating}
          <span className="text-gray-500 font-normal"> ({pujaData.rating_user} reviews)</span>
        </p>
      </div>
    </div>

    {/* Pricing */}
    <p>
      <span className="text-3xl font-bold text-orange-600">
        ₹{Math.floor(pujaData.discounted_price)}
      </span>
      <span className="text-sm text-slate-900 line-through ms-2">
        M.R.P ₹{Math.floor(pujaData.price)}
      </span>
      <span className="text-red-700 text-lg ms-3">
        ({Math.floor(pujaData.discount)}% off)
      </span>
    </p>

    {/* Action Buttons */}
    <div className="flex gap-7 mt-4">
      <button
        onClick={() => handleBuyNow(pujaData.id)}
        className="p-2 px-5 shadow-black shadow-2xl w-full text-lg text-white bg-[#E5644E] rounded-lg hover:bg-[#7B2502]"
      >
        Buy Now
      </button>

      <button
        onClick={() => handleCartAction(pujaData.id)}
        className={`flex items-center justify-center shadow-lg w-full rounded-md p-3 px-4 text-[#E5644E] font-medium 
          ${cartStatus ? "border-2 border-[#E5644E] hover:bg-red-700" : "border-2 border-[#E5644E] "}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cartStatus ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Other Components */}
      <Content description={pujaData.description} />
      <SliderOne testimonials={pujaData.testimonials}/>
      <SliderTwo pujaData={pujaData.related_products}/>
      <Faq faqs={pujaData.faqs} />
    </>
  );
}
