'use client';

import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles
import { HeartIcon } from "lucide-react";

const SliderTwo = ({ pujaData }) => {

  const [cartStatus, setCartStatus] = useState(pujaData?.id); // Track cart status
  const [wishlistStatus, setWishlistStatus] = useState();


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
    <div className="my-10 py-10">
      <div className="md:mb-12 mb-8 text-center">
        <h2 className="text-gray-800 text-[42px] font-bold">Related Pooja Box</h2>
      </div>
      <Splide 
        options={{
          type: "loop",
          perPage: 3,
          breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 },
            480: { perPage: 1 },
          },
          focus: "center",
          padding: { left: "1rem", right: "1rem" },
          gap: "1rem",
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
        }}
      >
        {/* Loop through testimonials */}
        {pujaData?.map((product, index) => (
          <SplideSlide key={product.id || index}>


            <div className="bg-white shadow-2xl m-2 my-8 rounded-lg">
              <a className="mx-3 mt-3 flex rounded-xl"   href={`/poojaboxdetail/${product.id}`}>
                <img className="object-cover h-auto max-w-full" src={product.image} alt="product image" />
                <span className="m-2 rounded-full px-2 text-xl font-bold leading-relaxed">
                  {product.name}
                  <div className="mt-5 text-base font-medium text-sm leading-relaxed">
                    {product.description}
                  </div>
                </span>
              </a>
              <div className="mt-4 px-5 pb-5">
                <div className="flex items-center">
                  {/* Add rating dynamically */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      aria-hidden="true"
                      className={`h-5 w-5 ${index < Math.round(product.rating_user / 2) ? 'text-yellow-300' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="mr-2 rounded text-yellow-900 px-2.5 py-0.5 text-xs font-semibold">
                    ({product.rating_user})
                  </span>
                </div>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">₹{Math.floor(product.discounted_price)}</span>
                    <span className="text-sm ms-2 text-slate-400 line-through">
                      M.R.P ₹{product.price}
                    </span>{" "}
                    <span className="text-red-700 text-lg ms-3">({Math.floor(product.discount)}% off)</span>
                  </p>
                  <HeartIcon/>
                </div>
                <a
                  href={`/poojaboxdetail/${product.id}`}
                  className="flex items-center justify-center rounded-md bg-[#E5644E] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to cart
                </a>
              </div>
              
            </div>
        
            <br/>

            
          </SplideSlide>
        )) 
        }
      </Splide>
      
    </div>
  );
};

export default SliderTwo;
