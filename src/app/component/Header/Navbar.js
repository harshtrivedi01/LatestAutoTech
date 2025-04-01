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

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { t } = useTranslation();

  const [pujaData, setPujaData] = useState([]);
  const [header, setHeader] = useState(null); // Initialize header state
  useEffect(() => {
      fetchPujaData();   
  }, []);
	

	useEffect(() => {
		if (typeof window !== "undefined") {
			const formData = JSON.parse(localStorage.getItem("formData") || "{}");
			const authToken = localStorage.getItem("authToken");
      const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
      const userId = localStorage.getItem("idToken");

			const newHeader = {
				language: selectedLanguage,
				userId:userId,
				user_type:  userId ? "user" : "guest",
				Device_id: "upen",
				Longitude: formData.Longitude || "",
				Latitude: formData.Latitude || "",
				Ip_address: formData.Ip_address || "",
				web_token: authToken || "",
        "Content-Type": "application/json",

			};

			setHeader(newHeader);
			fetchPujaData(newHeader);
		}
	}, []);

	useEffect(() => {
		fetchPujaData();
	}, []);

	const fetchPujaData = async () => {
		try {
			let formData = new FormData();
			formData.append("type", "cart_count");


			const response = await axios.post(
			"http://13.50.195.64/websiteapi//cartcount",
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      setProfileImage("/Assests/Service/Vector.png");
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false); 
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-white relative  w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
            <img
              src="/images/logo.png"
              className="h-16 mb-2"
              alt="PunyaSetu Logo"
            />
            <span className="self-center text-2xl lg:text-3xl font-semibold whitespace-nowrap text-black">
            {t("PunyaSetu")}
            </span>
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div className="md:flex hidden">
        <Language/>
        </div>

            {isLoggedIn ? (
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
            )}

            {/* Mobile Menu Button */}

            <button
              type="button"
              className="inline-flex items-center p-2 w-8 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`z-30 absolute top-24 left-0 w-full bg-white md:hidden transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ul className="flex flex-col text-lg p-4 font-semibold border-t border-gray-200 bg-gray-50">
              <li>
              <Language/>
              </li>
            
              <li>
                <a data-translate
                  href="/poojabooking"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  {t("PoojaBooking")} 
                </a>
              </li>
            
              <li>
                <a data-translate
                  href="/chadhava"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  {t("chadhava")} 
                </a>
              </li>
              
              <li>
                <a data-translate
                  href="/poojabox"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                   {t("PoojaBox")} 
                </a>
              </li>
           
              <li>
                <a data-translate
                  href="https://play.google.com/store/apps/details?id=free.temple.mandir.darshan.dev.puja.panditji.sri.guruji.pravachan" target="_blank"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                {t("DownloadAPP")} 
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:w-auto md:order-1">
            <ul className="flex flex-row space-x-8 text-lg font-semibold">
              {/* <li>
                <a data-translate href="/" className="text-black hover:text-orange-700">
                {t("Home")}
                </a>
              </li> */}
              
              
              <li>
                <a data-translate href="/poojabooking" className="text-black hover:text-orange-700">
                {t("PoojaBooking")} 
                </a>
              </li>
             
              <li>
                <a data-translate href="/chadhava" className="text-black hover:text-orange-700">
                {t("chadhava")} 
                </a>
              </li>
             
              <li>
                <a data-translate href="/poojabox" className="text-black hover:text-orange-700">
                {t("PoojaBox")} 
                </a>
              </li>
             
              <li>
                <a data-translate href="https://play.google.com/store/apps/details?id=free.temple.mandir.darshan.dev.puja.panditji.sri.guruji.pravachan" target="_blank" className="text-black hover:text-orange-700">
                {t("DownloadAPP")} 
                </a>
              </li>
             
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
