

"use client";

import { useParams } from "next/navigation";
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
          headers: {
            "language": "en",
            "userId": "2",
            "user_type": "user",
            "Device_id": "upen",
            "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
            "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
            "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
          },
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
          headers: {
            "language": "en",
            "userId": "2",
            "user_type": "user",
            "Device_id": "upen",
            "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
            "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
            "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
            "web_token": localStorage.getItem("authToken"),
          },
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

  
  const handleWishlistAction = async (id) => {
    try {
      let formData = new FormData();
      formData.append("type", wishlistStatus ? "remove_from_wishlist" : "add_to_wishlist");
      formData.append("product_id", id);

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/products",
        formData,
        {
          headers: {
            "language": "en",
            "userId": "2",
            "user_type": "user",
            "Device_id": "upen",
            "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
            "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
            "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
            "web_token": localStorage.getItem("authToken"),
          },
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
            <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-4xl mx-auto border border-white bg-white">
              {/* Product Image */}
              <div className="w-full bg-white grid place-items-center">
                <img src={pujaData.image} alt="product image" className="h-80" />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-2/2 bg-white flex flex-col space-y-2 p-3">
                <h3 className="font-black flex justify-between text-[#BA1A1A] border-b border-b-[#BA1A1A] md:text-3xl text-xl">
                  {pujaData.name || "Product Name"}
                  <button onClick={() => handleWishlistAction(pujaData.id)} className=" focus:outline-none">
        <HeartIcon className={`h-6 w-6 ${wishlistStatus ? "fill-red-600" : "fill-white"}`} />
      </button>
                </h3>

                {/* Rating Section */}
                <div className="flex justify-between item-center">
                  <div className="flex items-center my-5">
                    <p className="text-gray-600 font-bold text-sm ml-1">
                      {pujaData.rating}
                      <span className="text-gray-500 font-normal"> ({pujaData.rating_user} reviews)</span>
                    </p>
                  </div>
                </div>

                {/* Description */}
               

                {/* Pricing */}
                <p>
                  <span className="text-3xl font-bold text-orange-600">₹{Math.floor(pujaData.discounted_price)}</span>
                  <span className="text-sm text-slate-900 line-through ms-2">M.R.P ₹{Math.floor(pujaData.price)}</span>
                  <span className="text-red-700 text-lg ms-3">({Math.floor(pujaData.discount)}% off)</span>
                </p>

                {/* Wishlist & Cart Status */}
                {/* <div className="flex items-center gap-3">
                
                  {pujaData.cart_status && (
                    <span className="text-green-600 font-semibold"> In Cart</span>
                  )}
                </div> */}

                {/* Shipping Date */}
                <p className="text-gray-600 text-sm"> 🛒 Ships by: {pujaData.shipping_date}</p>

                {/* Action Buttons */}
             <div className="flex gap-2">
             <button className="p-2 px-10 shadow-black shadow-2xl text-lg text-white bg-[#E5644E] rounded-lg hover:bg-[#7B2502]">
    Buy Now
  </button>
                <button
   onClick={() => handleCartAction(pujaData.id)}
      className={`flex items-center justify-center w-full rounded-md px-10 py-2.5 text-center text-sm font-medium text-white
        ${cartStatus ? "bg-red-600 hover:bg-red-700" : "bg-[#E5644E] hover:bg-orange-700"}
      `}
    >
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-6 w-6"
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
      {cartStatus ? "Remove from cart" : "Add to cart"}
    </button>
             </div>

                {/* Image Gallery */}
                {pujaData.gallery && pujaData.gallery.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Gallery</h4>
                    <div className="flex gap-2 overflow-x-auto">
                      {pujaData.gallery.map((img, index) => (
                        <img key={index} src={img} alt="Gallery" className="h-24 rounded-lg shadow-lg" />
                      ))}
                    </div>
                  </div>
                )}
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
