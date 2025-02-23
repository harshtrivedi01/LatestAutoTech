"use client";
import { useEffect, useRef, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Language from "../Language/Language";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

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
              src="https://www.punyasetu.com/assets/images/logo.png"
              className="h-16 mb-2"
              alt="PunyaSetu Logo"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-black">
              PunyaSetu
            </span>
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <Language/>

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
                    <div className="absolute left-0 z-50 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <a className="my-1 block border-b border-gray-100 px-4 py-2 font-semibold text-gray-500 hover:text-black">
                        <Link href="/profile">Profile</Link>
                      </a>
                      <a className="my-1 block border-b border-gray-100 px-4 py-2 font-semibold text-gray-500 hover:text-black">
                        <Link href="/mybooking">My Booking</Link>
                      </a>

                      <div
                        className="px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-100 hover:rounded-lg"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/cartpoojabox">
                  <HiOutlineShoppingCart className="w-8 h-8 text-black" />
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  className="text-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-2xl shadow-xl px-4 lg:px-12 lg:py-3 py-2 text-center bg-orange-600 hover:bg-orange-700 focus:ring-orange-800"
                  style={{ backgroundColor: "#E5644E" }}
                >
                  Login
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
            className={`absolute top-24 left-0 w-full bg-white md:hidden transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ul className="flex flex-col text-lg p-4 font-semibold border-t border-gray-200 bg-gray-50">
              <li>
                <div className="group relative cursor-pointer py-2">
                  <div className="flex items-center justify-between bg-white px-4">
                    <a className="menu-hover flex gap-1 items-center  text-lg font-bold text-black ">
                      <TbWorld className="text-xl" />
                      English
                    </a>
                    <span className="font-bold">
                      <RiArrowDropDownLine className="text-3xl" />
                    </span>
                  </div>
                  <div className="invisible absolute  z-50 flex w-full flex-col bg-gray-100 py-1 rounded-b-xl px-4 text-gray-800 shadow-xl group-hover:visible">
                    <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Hindi
                    </a>
                    <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      English
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/service"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/join"
                  className="block py-2 px-3 text-black hover:bg-gray-100"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:w-auto md:order-1">
            <ul className="flex flex-row space-x-8 text-lg font-semibold">
              <li>
                <a href="/" className="text-black hover:text-orange-700">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-black hover:text-orange-700">
                  About Us
                </a>
              </li>
              <li>
                <a href="/service" className="text-black hover:text-orange-700">
                  Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-black hover:text-orange-700">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/join" className="text-black hover:text-orange-700">
                  Join Us
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
