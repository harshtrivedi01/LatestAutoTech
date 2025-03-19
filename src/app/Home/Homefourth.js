import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../component/Headingname/Heading";
import Viewmore from "../component/Viewmorebutton/Viewmore";
import toast, { Toaster } from "react-hot-toast";
import api from "../lib/axiosInstance";
import { useTranslation } from "react-i18next";

export default function Homefourth({ pujaData }) {
    const { t } = useTranslation();
  const [cartStatus, setCartStatus] = useState([]);

  useEffect(() => {
    if (pujaData?.data?.product_list) {
      setCartStatus(pujaData.data.product_list.map((puja) => puja.cart_status));
    }
  }, [pujaData]); // Update cartStatus when pujaData changes
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

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
  
      if (response.data.status === 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        // ✅ Update cartStatus in state
        setCartStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[index] = !isCurrentlyInCart;
          return updatedStatus;
        });
  
        toast.success(
          response.data.message ||
            (isCurrentlyInCart ? "Removed from cart!" : "Added to cart!")
        );
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling cart action:", error);
    }
  };
  


  if (!pujaData || !pujaData.data || pujaData.data.product_list.length === 0) {
    return (
      <div className="bg-[#FFFFFF] px-2">
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text={t("PoojaBox")} color="black" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto my-8 px-2">
          <p>No results found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#FFFFFF] px-2">
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text={t("PoojaBox")} color="black" />
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="max-w-7xl mx-auto my-8 px-2">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
            {pujaData?.data?.product_list.map((puja, index) => (
              <li key={index}>
                <div className="bg-white w-full rounded-lg shadow-2xl">
                  <Link
                    className="mx-3 mt-3 flex rounded-xl"
                    href={`poojaboxdetail/${puja.id}`}
                  >
                    <div className="w-40 flex justify-center">
                      <img
                        className="object-cover"
                        src={
                          puja.image ||
                          "/images/logo.png"
                        }
                        alt={puja.name || "product image"}
                        onError={(e) =>
                        (e.target.src =
                          "/images/logo.png")
                        }
                      />
                    </div>
                    <span className="m-2 rounded-full px-2 lg:text-xl text-yellow-700 text-black leading-relaxed">
                      {puja.name || "Puja Title"}
                      <p className="mt-5 text-base font-medium text-sm text-black leading-relaxed">
  {puja.description 
    ? puja.description .split(" ").slice(0, 12).join(" ") + (puja.description .split(" ").length > 12 ? "..." : "")
    :  ` ${t("Pujadescriptiongoeshere")}`}
</p>
                      
                    </span>
                  </Link>
                  <div className="mt-4 px-5 pb-5">
                    <div className="flex items-center">
                      {[...Array(Math.floor(puja.rating))].map(
                        (_, starIndex) => (
                          <svg
                            key={starIndex}
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )
                      )}
                      <span className="mr-2 rounded text-yellow-900 px-2.5 py-0.5 text-xs font-semibold">
                        ({puja.rating_user})
                      </span>
                    </div>
                    <div className="mt-2 mb-5 flex items-center justify-between">

                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{puja.discounted_price}
                        </span>
                        <span className="text-sm ms-2 text-slate-900 line-through">
                        {t("MRP")} ₹{puja.discounted_price}
                        </span>
                        <span className="text-red-700 text-lg ms-3">
                          ({puja.discount}%  {t("off")})
                        </span>
                      </p>

                    </div>
                    {puja.stock ? (
                      <div className="flex justify-end">
                        {isLoggedIn ? (
                      <button
                      className={`flex items-center justify-center rounded-md px-10 shadow-xl py-2 text-center text-sm font-medium text-white
                        ${
                          cartStatus[index] 
                            ? "bg-red-600 hover:bg-red-700"  // Remove from Cart style
                            : "bg-green-600 hover:bg-green-700"
                        }
                      `}
                      onClick={() => handleCartAction(puja.id, index)}
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
                      {cartStatus[index] ? `${t("removefromcart")}` : `${t("addtocart")}` }
                    </button>
                    
                      
                       

                        )
                        : (
                         <a href="/login">
                           <button className="px-10 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white flex gap-2 shadow-lg"> <svg
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
                            </svg>{t("addtocart")}</button>
                         </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-600 font-bold  items-center justify-center rounded-md px-5 border shadow-xl py-2 text-center text-sm font-medium ">
                       {t("outOfStock")}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Viewmore />
      </div>
    </div>
  );
}
