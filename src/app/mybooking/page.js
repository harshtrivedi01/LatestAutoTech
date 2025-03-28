"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import api from "../lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "../component/AuthGuard";
import { useTranslation } from "react-i18next";



const Page = () => {
  const { t } = useTranslation();
   const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  const [activeStep, setActiveStep] = useState(`${t("PoojaBooking")}`);
  const [Poojabookings, setPoojabookings] = useState([]);
  const [Panditbookings, setPanditbookings] = useState([]);
  const [poojaBox, setpoojaBox] = useState([]);
  const router = useRouter();
  const steps = [
    { id: 1, title: `${t("PoojaBooking")}`  },
    { id: 3, title: `${t("chadhava")}` },
    { id: 2, title: `${t("PoojaBox")}` },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "puja_booking_history");
  
        const response = await api.post("/puja", formData);
  
        console.log("Full Response:", response);
        console.log("Response Data:", response?.data);
  
        // Ensure response.data exists and is an object
    
  
        // Ensure booking_list exists; if missing, set an empty array
        const bookingList = response.data.data.booking_list ?? []; // Default to []
        if (!Array.isArray(bookingList)) {
          console.error("Invalid booking_list format:", response.data);
          setPoojabookings([]);
        } else {
          setPoojabookings(bookingList);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, []);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "booking_history");
  
        const response = await api.post("/panditji", formData);
  
        console.log("Full Response:", response);
        console.log("Response Data:", response?.data);
  

        const bookingList = response.data.data.booking_list ?? []; // Default to []
        if (!Array.isArray(bookingList)) {
          console.error("Invalid booking_list format:", response.data);
          setPanditbookings([]);
        } else {
          setPanditbookings(bookingList);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, []);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "order_list");
  
        const response = await api.post("/orders", formData);
  
        console.log("Full Response:", response);
        console.log("Response Data:", response?.data);
  

        const bookingList = response.data.data.order_list ?? []; // Default to []
        if (!Array.isArray(bookingList)) {
          console.error("Invalid booking_list format:", response.data);
          setpoojaBox([]);
        } else {
          setpoojaBox(bookingList);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
  
    setLoading(true);
    try {
      let formData = new FormData();
      if (activeStep === `${t("PoojaBooking")}`) {
        formData.append("type", "puja_bookings_history");
        formData.append("search", searchQuery);
        const response = await api.post("/search", formData);
        console.log("Pooja Booking Search Response:", response?.data);
        setSearchResults(response?.data?.data?.booking_list || []);
      } else if (activeStep === `${t("PoojaBox")}`) {
        formData.append("type", "order_history");
        formData.append("search", searchQuery);
        const response = await api.post("/order_search", formData);
        console.log("Pooja Box Search Response:", response?.data?.data?.order_list);
        setSearchResults(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  
  const statusColors = {
    Pending: "bg-[#87521B]",
    Failed: "bg-red-700",
    Success: "bg-green-700",
  };
  const statusColorspoojabox = {
    Pending: "bg-[#87521B]",
    cancelled: "bg-red-700",
    confirmed: "bg-green-700",
  };

  
const itemsPerPage = 9; // Change this value to set how many bookings per page
const [currentPage, setCurrentPage] = useState(1);

const bookings = searchQuery ? searchResults : Poojabookings;
const totalPages = Math.ceil(bookings.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

const poojaBoxOrders = searchQuery ? searchResults?.order_list ?? [] : poojaBox ?? [];
const totalPoojaBoxPages = Math.ceil(poojaBoxOrders.length / itemsPerPage);
const currentPoojaBoxOrders = poojaBoxOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AuthGuard>
    <div className="bg-gray-200">
      <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container max-w-7xl flex">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
                {t("booking")}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl flex justify-betweeni tems-center mx-auto pt-14 px-5 ">
  <div className="flex-grow  mr-4">
  <form onSubmit={handleSearch} className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden">
            <input
              type="text"
              placeholder={t("SearchSomething")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-600 text-lg"
            />
            <button type="submit" disabled={loading} className="ml-3">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600 ml-3 rotate-90"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
            </button>
          </form>
  </div>


</div>


      <div className="max-w-7xl mx-auto py-10 pb-14 px-5">
        <div className="flex pb-8">
        <div className="flex border-y-[1px] py-2 gap-4 w-full">
  {steps.map((step) => (
    <button
      key={step.title}
      className={`font-semibold text-[16px] py-[9px] px-4 transition duration-300 ${
        activeStep === step.title
          ? "bg-[#F37A32] rounded-xl text-white shadow-md shadow-gray-400"
          : "text-gray-600"
      }`}
      onClick={() => {
        setActiveStep(step.title);
        setSearchQuery(""); // Clear search query
        setSearchResults([]); // Clear search results
      }}
    >
      {step.title}
    </button>
  ))}
</div>

        </div>

{/* For pooja booking div */}
{/* Pooja Booking Section */}


{activeStep === `${t("PoojaBooking")}` && (
  <div className="bg-gray-100 p-6 rounded-lg">
    {loading ? (
      <p className="text-center text-lg font-semibold">{t("SearchSomething")}</p>
    ) : searchQuery && searchResults.length === 0 ? (
      <p className="text-center text-lg min-h-screen text-red-500 font-semibold">
        {t("Noresultsfoundfor")} "{searchQuery}"
      </p>
    ) : !searchQuery && Poojabookings.length === 0 ? (
      <p className="text-center text-lg text-gray-500 font-semibold">
        {t("Nobookinghistoryavailable")}
      </p>
    ) : (
      <>
        {/* Pooja Booking List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentBookings.map((booking) => (
            <div
              key={booking.booking_id}
              onClick={() => router.push(`/booking-details/${booking.booking_id}`)}
              className="border-[#87521B] bg-white border-[2px] rounded-lg p-5 cursor-pointer flex flex-col justify-between h-full"
            >
              {/* Content */}
              <div className="flex flex-col sm:flex-row items-center gap-4 text-start flex-grow">
                {/* Image Section */}
                <div className="w-full sm:w-5/12 flex justify-center">
                  <img
                    src={booking.puja_image || "/images/poojabox.png"}
                    alt="Pooja Image"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                    className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] border-2 border-white object-contain shadow-lg shadow-gray-400 rounded-lg"
                  />
                </div>

                {/* Details Section */}
                <div className="w-full sm:w-7/12 text-center sm:text-left">
               
                  <h2 className="text-lg font-bold text-black">{booking.puja_name}</h2>
                  <p className="text-red-600 font-bold text-md">{booking.package_name || "N/A"}</p>
 {/* Amount */}
 <p className="text-black font-semibold text-base mt-1">
                    {t("AmountRs")} {booking.amount}/-
                  </p>
                  {/* Payment Status */}
                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-1">
                    <span className="text-base font-semibold">{t("Payment")}: </span>
                    <div
                      className={`${
                        booking.payment_status === "success"
                          ? "text-green-600"
                          : booking.payment_status === "failed"
                          ? "text-red-500"
                          : "text-yellow-600"
                      } rounded-full`}
                    >
                      <p className="text-sm uppercase font-bold"> {booking.payment_status}</p>
                    </div>
                  </div>

                 

                  {/* Booking Status */}
                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-1">
                    <span className="text-base font-semibold">{t("booking")}: </span>
                    <div
                      className={`${
                        booking.payment_status === "success"
                          ? "text-green-600"
                          : booking.payment_status === "failed"
                          ? "text-red-500"
                          : "text-yellow-600"
                      } font-bold`}
                    >
                      {booking.payment_status === "success"
                        ? t("Confirmed")
                        : booking.payment_status === "failed"
                        ? t("Failed")
                        : t("Pending")}
                    </div>
                  </div>

                  {/* Pooja Status */}
                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-1">
                    <span className="text-base font-semibold">{t("Pooja")}: </span>
                    <div
                      className={`${
                        booking.booking_status === "success"
                          ? "text-green-500"
                          : booking.booking_status === "failed"
                          ? "text-red-500"
                          : "text-yellow-600"
                      } font-bold`}
                    >
                      {booking.booking_status === "success"
                        ? t("Confirmed")
                        : booking.booking_status === "failed"
                        ? t("Failed")
                        : t("Pending")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
                <p className="text-gray-600 text-sm text-center sm:text-left">
                <h2 className="text-sm font-light text-gray-400"></h2>
                <span className="font-semibold">{t("OrderID")} </span>
                #{booking.booking_code}
                  <br />
                  <span className="font-semibold">{t("poojadate")}: </span>
                  {booking.booking_date}
                  <br />
                  <span className="font-semibold">{t("Ordertimedate")} </span>
                  {booking.create_date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 border rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
          >
            {t("Prev")}
          </button>

          <span className="px-4 py-2 font-base">
            {t("Page")} {currentPage} {t("of")} {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 border rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
          >
            {t("Next")}
          </button>
        </div>
      </>
    )}
  </div>
)}

  {/* Pooja Box Section */}
  {activeStep === `${t("PoojaBox")}` && (
      <div className="bg-gray-100 p-6 mt-6 rounded-lg">
        {loading ? (
          <p className="text-center text-lg font-semibold">{t("wait")}...</p>
        ) : searchQuery && (!searchResults?.order_list || searchResults?.order_list.length === 0) ? (
          <p className="text-center text-lg text-red-500 min-h-screen font-semibold">
            {t("Noresultsfoundfor")} "{searchQuery}"
          </p>
        ) : !poojaBox || poojaBox.length === 0 ? (
          <p className="text-center text-gray-600 min-h-screen text-lg font-semibold">
            {t("Nobookinghistoryavailable")}
          </p>
        ) : (
          <>
            {/* Pooja Box List */}
            <div className="grid grid-row gap-5">
              {currentPoojaBoxOrders.map((order) => (
                <div
                  key={order.order_id}
                  className="border-[#87521B] bg-white border-[2px] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => router.push(`/orderhistory/${order.order_id}`)}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={order.image || "/images/logo.png"}
                      alt={order.product_names}
                      className="w-full sm:w-4/12 h-[180px] object-contain shadow-md rounded-lg"
                      onError={(e) => (e.target.src = "/images/logo.png")}
                    />
                    <div className="w-full sm:w-8/12 text-center sm:text-left">
                      <h2 className="text-[15px] font-[500] text-[#855318] font-semibold">
                        {order.product_names || order.product_name}
                      </h2>
                      <p className="text-gray-500 text-sm">{t("OrderID")} {order.order_code}</p>
                      <p className="text-gray-500 text-sm">{t("DeliveryDate")} {order.delivery_date || order.order_date}</p>
                      <p className="text-gray-800 font-[500] text-[14px]">
                        {t("AmountRs")} {Math.floor(order.grand_total)}/-
                      </p>
                      <p className="text-gray-500 text-sm">{t("DiscountRS")} {Math.floor(order.discount) || Math.floor(order.total_discount) || "NA"}/-</p>
                      <div
                        className={`${
                          statusColorspoojabox[order.delivery_status] || "bg-gray-500"
                        } rounded-full w-28 px-4 py-1 mt-3 mx-auto sm:mx-0`}
                      >
                        <p className="text-white text-sm uppercase">{order.delivery_status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 border rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
              >
                {t("Prev")}
              </button>
              <span className="px-4 py-2 font-base">
                {t("Page")} {currentPage} {t("of")} {totalPoojaBoxPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPoojaBoxPages))}
                disabled={currentPage === totalPoojaBoxPages}
                className="px-4 py-2 mx-1 border rounded-md disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
              >
                {t("Next")}
              </button>
            </div>
          </>
        )}
      </div>
    )}



        {/* pandit booking div
        {activeStep ===`${t("chadhava")}` && (
  <div className="bg-gray-100 p-6 mt-12 rounded-lg">
    {Panditbookings.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Panditbookings.map((booking, index) => (
          <div
            key={index}
            className="border-[#87521B] bg-white border-[2px] rounded-lg p-4"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <img
                src={booking.pandit_image}
                alt="Pooja Image"
                onError={(e) =>
                  (e.target.src =
                    "/images/logo.png")
                }
                className="w-full sm:w-5/12 h-[140px] border-2 border-white object-cover shadow-md shadow-gray-400 rounded-lg"
              />
              <div className="text-center sm:text-left w-full sm:w-7/12">
                <p className="text-gray-500 text-sm">
                  #{booking.booking_code} ||
                </p>
                <h2 className="text-lg font-bold text-black">
                  Pt.{booking.pandit_name}
                </h2>
                <p
                  className={`${
                    booking.booking_status === "success"
                      ? "text-green-700"
                      : "text-red-600"
                  } font-semibold text-md`}
                >
                  {booking.booking_status}
                </p>
                <p className="text-red-600 font-bold text-md">
                  Paid Rs.{booking.net_amount}/-
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3">
              <p className="text-gray-600 text-sm text-center sm:text-left">
                <span className="font-semibold">Order time & date:</span>{" "}
                {booking.booking_date}
              </p>
              <div
                className={`${
                  statusColors[booking.booking_status]
                } rounded-full px-4 py-1`}
              >
                <p className="text-white text-sm">{booking.booking_status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 text-lg font-semibold">
        No bookings found.
      </div>
    )}
  </div>
)} */}

{activeStep === `${t("chadhava")}` && (
  <div className="bg-gray-100 p-6 mt-12 rounded-lg">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[
        {
          pandit_image: "/images/pandit1.jpg",
          booking_code: "PB12345",
          pandit_name: "Offer water to loard shiva",
          booking_status: "success",
          net_amount: "Free",
          booking_date: "25th March 2025",
        },
        {
          pandit_image: "/images/pandit2.jpg",
          booking_code: "PB12346",
          pandit_name: "Offer water to loard shiva",
          booking_status: "pending",
          net_amount: "751",
          booking_date: "26th March 2025",
        },
        {
          pandit_image: "/images/pandit3.jpg",
          booking_code: "PB12347",
          pandit_name: "Offer water to loard shiva",
          booking_status: "cancelled",
          net_amount: "601",
          booking_date: "27th March 2025",
        },
      ].map((booking, index) => (
        <div
          key={index}
          className="border-[#87521B] bg-white border-[2px] rounded-lg p-4"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <img
              src={booking.pandit_image}
              alt="Pooja Image"
              onError={(e) => (e.target.src = "/images/logo.png")}
              className="w-full sm:w-5/12 h-[140px] border-2 border-white object-contain shadow-md shadow-gray-400 rounded-lg"
            />
            <div className="text-center sm:text-left w-full sm:w-7/12">
              
              <h2 className="text-lg font-bold text-black">
                {booking.pandit_name}
              </h2>
              <p
                className={`${
                  booking.booking_status === "success"
                    ? "text-green-700"
                    : booking.booking_status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                } font-semibold text-md`}
              >
                {booking.booking_status}
              </p>
              <p className="text-red-600 font-bold text-md">
                Amount Rs.{booking.net_amount}/-
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-3">
          OrderId:  #{booking.booking_code} 
              </p>
          <div className="flex flex-col sm:flex-row justify-between items-center  gap-3">
        
            <p className="text-gray-600 text-sm text-center sm:text-left">
              <span className="font-semibold">Order time & date:</span>{" "}
              {booking.booking_date}
            </p>
            <div
              className={`${
                booking.booking_status === "success"
                  ? "bg-green-600"
                  : booking.booking_status === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              } rounded-full px-4 py-1`}
            >
              <p className="text-white text-sm">{booking.booking_status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {/* pooja box div */}
      

      </div>
    </div>
    </AuthGuard>
  );
};

export default Page;
