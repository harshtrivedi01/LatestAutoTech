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

  return (
    <>
      <nav className="bg-white relative w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between gap-2 mx-auto p-4 pb-2">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
            <img
              src="/images/logo.png"
              className="h-6"
              alt="LatestAutoTech Logo"
            />
          </a>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden lg:flex">
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
              <a data-translate href="/poojabookingcart" className="text-black hover:text-orange-700">
                  EVs
                </a>
              </li>
            </ul>
          </div>

          {/* Search Bar Section */}
          <div className="">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-[400px] px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Visible only on mobile */}
        <div className="lg:hidden py-2">
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
              <a data-translate href="/poojabookingcart" className="text-black hover:text-orange-700">
                EVs
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
