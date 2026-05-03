"use client";
import { useEffect, useRef, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Language from "../Language/Language";
import { useTranslation } from "react-i18next";
import api from "../../lib/axiosInstance";
import axios from "axios";
// Add import for search icon if needed, e.g., import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { t } = useTranslation();

  const [pujaData, setPujaData] = useState([]);
  const [header, setHeader] = useState(null); // Initialize header state
  // useEffect(() => {
  //     fetchPujaData();   
  // }, []);
    

    // useEffect(() => {
    // 	if (typeof window !== "undefined") {
    // 		const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    // 		const authToken = localStorage.getItem("authToken");
  //     const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
  //     const userId = localStorage.getItem("idToken");

    // 		const newHeader = {
    // 			language: selectedLanguage,
    // 			userId:userId,
    // 			user_type:  userId ? "user" : "guest",
    // 			Device_id: "upen",
    // 			Longitude: formData.Longitude || "",
    // 			Latitude: formData.Latitude || "",
    // 			Ip_address: formData.Ip_address || "",
    // 			web_token: authToken || "",
  //       "Content-Type": "application/json",

    // 		};

    // 		setHeader(newHeader);
    // 		fetchPujaData(newHeader);
    // 	}
    // }, []);

    // useEffect(() => {
    // 	fetchPujaData();
    // }, []);

    const fetchPujaData = async () => {
        try {
            let formData = new FormData();
            formData.append("type", "cart_count");


            const response = await axios.post(
            "http://13.50.195.64/websiteapi/cartcount",
                formData,
                {
                    headers: header

                }
            );
      console.log("Puja API Response:",response.data?.data?.cart_count);
      setPujaData(response.data?.data?.cart_count);

        } catch (error) {
            console.error("Error fetching puja data:", error);
        }
    };

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     setProfileImage("/Assests/Service/Vector.png");
  //   }

  //   const handleClickOutside = (e) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setShowDropdown(false); 
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   setIsLoggedIn(false);
  //   window.location.reload();
  // };

  return (
    <>
      <nav className="bg-white relative  w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex items-center gap-2 mx-auto p-4 pb-2">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
            <img
              src="/images/logo.png"
              className="h-6 "
              alt="LatestAutoTech Logo"
            />
          </a>

          {/* Search Bar Section - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="relative ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-[400px]  px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                {/* Add search icon here, e.g., <FiSearch /> */}
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
              </button>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="md:flex hidden">
              <Language/>
            </div>

            {/* {isLoggedIn ? (
              <div className="flex items-center lg:gap-2">
                <div className="relative" ref={dropdownRef}>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-8 h-8 me-2 rounded-full cursor-pointer border-2 hover:border-orange-500"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setShowDropdown(!showDropdown); 
                    }}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 z-50 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <a href="/profile"
                       className="my-1 block border-b border-gray-100 px-4 py-2 font-semibold text-gray-500 hover:text-black">
                        {t("Profile")}
                      </a>
                      <a  href="/mybooking"
                      className="my-1 block border-b border-gray-100 px-4 py-2 font-semibold text-gray-500 hover:text-black">
                        {t("orderhistory")}
                      </a>

                      <div data-translate
                        className="px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-100 hover:rounded-lg"
                        onClick={handleLogout}
                      >
                          {t("Logout")}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
  <Link href="/cartpoojabox">
    <HiOutlineShoppingCart className="w-8 h-8 text-black" />
    {pujaData > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {pujaData}
      </span>
    )}
  </Link>
</div>
              </div>
            ) : (
              <Link href="/login">
                <button data-translate
                  type="button"
                  className="text-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-2xl shadow-xl px-4 lg:px-12 lg:py-3 py-2 text-center bg-orange-600 hover:bg-orange-700 focus:ring-orange-800"
                  style={{ backgroundColor: "#E5644E" }}
                >
                   {t("Login")}
                </button>
              </Link>
            )} */}

            
          </div>
        </div>

       

        {/* Desktop Menu */}
        <div className="py-2">
          <ul className="flex flex-row justify-center space-x-8 text-lg font-semibold">
    
            
            
            <li>
              <a data-translate href="/poojabooking" className="text-black hover:text-orange-700">
             Phones
              </a>
            </li>
           
            <li>
              <a data-translate href="/chadhava" className="text-black hover:text-orange-700">
             Cars
              </a>
            </li>
           
            <li>
              <a data-translate href="/poojabox" className="text-black hover:text-orange-700">
            Bikes
              </a>
            </li>
           
            <li>
              <a data-translate href="https://play.google.com/store/apps/details?id=free.temple.mandir.darshan.dev.puja.panditji.sri.guruji.pravachan" target="_blank" className="text-black hover:text-orange-700">
           EVs
              </a>
            </li>
           
            <li></li>
          </ul>
        </div>
      </nav>
    </>
  );
}
