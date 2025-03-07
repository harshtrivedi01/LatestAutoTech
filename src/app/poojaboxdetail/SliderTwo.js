'use client';

import React, { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // Import Splide styles
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import api from "../lib/axiosInstance";

const SliderTwo = () => {
  const [pujaData, setPujaData] = useState([]);
  const [cartStatus, setCartStatus] = useState([]);
  const pathname = usePathname();
  const isSpecialPage = pathname.includes("/cart");
  const splideRef = useRef(null);

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "product_list");
      formData.append("category_id", "1");

      const response = await api.post("/products", formData);
      console.log("Puja API Response:", response.data);

      const productList = response.data.data.product_list;
      setPujaData(productList);

      // Initialize cartStatus based on API response
      const initialCartStatus = productList.map((product) => product.cart_status);
      setCartStatus(initialCartStatus);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const handleCartAction = async (id, index) => {
    try {
      let formData = new FormData();
      const isCurrentlyInCart = cartStatus[index];
      const actionType = isCurrentlyInCart ? "remove_cart" : "add_to_cart";
  
      formData.append("type", actionType);
      formData.append("product_id", id);
  
      if (!isCurrentlyInCart) {
        formData.append("quantity", "1");
      }
  
      const response = await api.post("/cart", formData);
      console.log("Cart Action Response:", response.data);
  
      if (response.data.status === 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        // ✅ Update cart status in state
        setCartStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[index] = !isCurrentlyInCart;
          return updatedStatus;
        });
  
        toast.success(
          response.data.message ||
            (isCurrentlyInCart ? "Removed from cart!" : "Added to cart!")
        );
  
        // ✅ Reload the page after success
        setTimeout(() => {
          window.location.reload();
        }, 10); // Adding a small delay to allow toast to display
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling cart action:", error);
    }
  };
  

  useEffect(() => {
    if (splideRef.current) {
      setTimeout(() => {
        const pagination = document.querySelector(".splide__pagination");
        if (pagination) {
          pagination.classList.add("flex", "justify-center", "items-center", "gap-2");
          pagination.style.display = "flex";
        }
      }, 100);
    }
  }, []);

  return (
    <div className={`py-10 ${isSpecialPage ? "bg-[#FFDCC0]" : "bg-white"} p-6 transition-all duration-300`}>
      <div className="md:mb-12 mb-8 text-center">
        <h2 className="text-gray-800 text-[42px] font-bold">Related Pooja Box</h2>
      </div>
      <div className="relative w-full mx-auto container">
        <Splide
          ref={splideRef}
          options={{
            type: "loop",
            perPage: 3,
            breakpoints: { 1024: { perPage: 2 }, 768: { perPage: 1 }, 480: { perPage: 1 } },
            focus: "center",
            padding: { left: "1rem", right: "1rem" },
            gap: "1rem",
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
          }}
          className="w-full"
        >
          {pujaData?.map((product, index) => (
            <SplideSlide key={product.id}>
              <div className="bg-white shadow-xl m-2 my-10 rounded-lg">
                <a className="mx-3 mt-3 flex rounded-xl" href={`/poojaboxdetail/${product.id}`}>
                  <img
                    className="object-cover h-[140px] max-w-full"
                    src={product.image || "/images/logo.png"}
                    onError={(e) => (e.target.src = "/images/logo.png")}
                    alt={product.name}
                  />
                  <span className="m-2 rounded-full px-2 text-xl font-bold leading-relaxed text-black">
                    {product.name}
                    <div className="mt-5 text-base font-medium text-sm leading-relaxed">{product.description}</div>
                  </span>
                </a>
                <div className="my-4 px-5 pb-5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        aria-hidden="true"
                        className={`h-5 w-5 ${
                          idx < Math.round(product.rating_user / 2) ? "text-yellow-300" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                      <span className="text-sm ms-2 text-slate-400 line-through">M.R.P ₹{product.price}</span>
                      <span className="text-red-700 text-lg ms-3">({Math.floor(product.discount)}% off)</span>
                    </p>
                  </div>
                  {product.stock == false ? (
    <span className="text-red-600 text-lg font-bold shadow-xl p-2 w-full border rounded-xl">Out of Stock</span>
  ) : (
    <>
      <button
                    onClick={() => handleCartAction(product.id, index)}
                    className={`flex items-center justify-center w-full rounded-md px-5 py-2.5 text-center text-sm font-medium text-white
                      ${cartStatus[index] ? "bg-red-600 hover:bg-red-700" : "bg-[#E5644E] hover:bg-orange-700"}
                    `}
                  >
                    {cartStatus[index] ? "Remove from cart" : "Add to cart"}
                  </button>
    </>
  )}
                  
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
         {/* Custom Navigation Below */}
         <div className="flex justify-center items-center absolute -bottom-2 inset-x-0  gap-8">
                {/* Left Arrow */}
                <button
                  className="text-2xl text-gray-700 p-2 rounded-full"
                  onClick={() => splideRef.current.splide.go("-1")}
                >
                  <IoIosArrowBack   className="text-4xl"/>
                </button>
      
                {/* Pagination (Dots - Auto-generated by Splide) */}
                <div className="splide__pagination "></div>
      
                {/* Right Arrow */}
                <button
                  className=" text-gray-700 p-2 rounded-full"
                  onClick={() => splideRef.current.splide.go("+1")}
                >
                <IoIosArrowForward
                 className="text-4xl" />
      
                </button>
              </div>
      </div>
      
    </div>
  );
};

export default SliderTwo;
