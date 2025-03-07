"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import api from "../lib/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "../component/AuthGuard";



const Page = () => {
   const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  const [activeStep, setActiveStep] = useState("Pooja Booking");
  const [Poojabookings, setPoojabookings] = useState([]);
  const [Panditbookings, setPanditbookings] = useState([]);
  const [poojaBox, setpoojaBox] = useState([]);
  const router = useRouter();
  const steps = [
    { id: 1, title: "Pooja Booking" },
    // { id: 2, title: "Pandit Booking" },
    { id: 3, title: "Pooja Box" },
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
      formData.append("type", "puja_bookings_history");
      formData.append("search", searchQuery);
      const response = await api.post("/search", formData);
  
      console.log("Search Response:", response?.data);
  
      // Ensure response contains valid data
      if (response?.data?.data?.booking_list) {
        setSearchResults(response.data.data.booking_list);
      } else {
        setSearchResults([]); // Reset if no data found
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

  return (
    <AuthGuard>
    <div className="bg-gray-100">
      <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
                  My Booking
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl flex justify-betweeni tems-center mx-auto pt-14 px-5 ">
  <div className="flex-grow max-w-5xl mr-4">
  <form onSubmit={handleSearch} className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden">
            <input
              type="text"
              placeholder="Search Something..."
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

  <div className="w-48 flex-shrink-0">
    <div className="relative">
      <select
        name="gender"
        id="gender"
        className="px-5 py-2 bg-white text-gray-400 rounded-lg border-2 border-orange-400 w-full  text-lg appearance-none outline-none"
      >
        
        <option value="Filter">
          Filter
        </option>
        <option value="male">Success</option>
        <option value="female">Pending</option>
        <option value="other">Failed</option>
        
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <IoIosArrowDown className="text-gray-400" />
      </div>
    </div>
  </div>
</div>


      <div className="max-w-7xl mx-auto py-10 pb-14 px-5">
        <div className="flex pb-8">
          <div className="flex border-y-[1px] py-2 gap-4 w-full ">
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
                }}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

{/* For pooja booking div */}
{/* Pooja Booking Section */}
{activeStep === "Pooja Booking" && (
  <div className="bg-gray-100 p-6 mt-12 rounded-lg">
    {loading ? (
      <p className="text-center text-lg font-semibold">Searching...</p>
    ) : searchQuery && searchResults.length === 0 ? (
      <p className="text-center text-lg text-red-500 font-semibold">
        No results found for "{searchQuery}"
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(searchQuery ? searchResults : Poojabookings).map((booking) => (
          <Link
          key={booking.booking_id}
          href={{
            pathname: "/booking-details",
            query: { data: JSON.stringify(booking) },
          }}
          className="border-[#87521B] bg-white border-[2px] rounded-lg p-5 cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={booking.puja_image || "/images/poojabox.png"}
              alt="Pooja Image"
              onError={(e) =>
                (e.target.src =
                  "/images/logo.png")
              }
              className="w-full sm:w-5/12 h-[150px] border-2 border-white object-fill shadow-lg shadow-gray-400 rounded-lg"
            />
            <div className="w-full sm:w-7/12 text-center sm:text-left">
              {/* <p className="text-gray-500 text-sm">#{booking.booking_id}</p> */}
              <h2 className="text-lg font-bold text-black">
                {booking.puja_name }
              </h2>
              <div
              className={`${
                booking.payment_status === "success"
                  ? "text-green-500"
                  : booking.payment_status === "failed"
                  ? "text-red-500"
                  : "text-yellow-500"
              } rounded-full `}
            >
              <p className=" text-xl">{booking.payment_status}</p>
            </div>
              <p className="text-gray-800 font-semibold text-lg">
                Amount Rs.{booking.amount}/-
              </p>
              <p className="text-red-600 font-bold text-md">
                {booking.package_name || "N/A"}
              </p>
              {/* <button className="text-orange-600 font-semibold mt-1 cursor-pointer underline">
                      <Link href="/">Book Again</Link>
                    </button> */}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3">
            <p className="text-gray-600 text-sm text-center sm:text-left">
              <span className="font-semibold">Order time & date:</span>{" "}
              {booking.create_date}
            </p>
            <div
              className={`${
                booking.payment_status === "success"
                  ? "bg-green-500"
                  : booking.payment_status === "failed"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              } rounded-full px-4 py-1`}
            >
              <p className="text-white text-sm">{booking.payment_status}</p>
            </div>
          </div>
        </Link>
        ))}
      </div>
    )}
  </div>
)}



        {/* pandit booking div */}
        {activeStep === "Pandit Booking" && (
  <div className="bg-gray-100 p-6 mt-12 rounded-lg">
    {Panditbookings.length > 0 ? (
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
                  #{booking.booking_code}
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
)}


        {/* pooja box div */}
        {activeStep === "Pooja Box" && (
   <div className="bg-gray-100 p-6 mt-6 rounded-lg">
   {poojaBox.length === 0 ? ( // Show message if no orders are available
     <p className="text-center text-gray-600 text-lg font-semibold">
       No orders available.
     </p>
   ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
       {poojaBox.map((order) => (
         <div
           key={order.order_id}
           className="border-[#87521B] bg-white border-[2px] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
           onClick={() => router.push(`/orderhistory/${order.order_id}`)}
         >
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <img
               src={order.image || "/images/logo.png"}
               alt={order.product_name}
               className="w-full sm:w-4/12 h-[180px] object-fill shadow-md rounded-lg"
               onError={(e) => (e.target.src = "/images/logo.png")}
             />
             <div className="w-full sm:w-8/12 text-center sm:text-left">
               <h2 className="text-[15px] font-[500] text-[#855318] font-semibold">
                 {order.product_name}
               </h2>
               {/* <p className="text-gray-500 text-sm">Order ID: {order.order_code}</p> */}
               <p className="text-gray-500 text-sm"> {order.description || "description"}</p>
               <p className="text-[#7E570F] font-[400] text-[14px]">
                 Expected Delivery by: {order.date}
               </p>
               <p className="text-gray-800 font-[500] text-[14px]">
                 Amount Rs. {order.grand_total}
               </p>
               <p className="text-gray-600 text-sm">
                 <span className="font-semibold">Order Date:</span> {order.order_date}
               </p>
               {/* <p className="text-[#FA8128] font-[400] mt-1 cursor-pointer underline">
                 Order Again
               </p> */}
               <div
                 className={`${
                   statusColors[order.delivery_status] || "bg-gray-500"
                 } rounded-full w-24 px-4 py-1 mt-3 mx-auto sm:mx-0`}
               >
                 <p className="text-white text-sm">{order.delivery_status}</p>
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   )}
 </div>
)}

      </div>
    </div>
    </AuthGuard>
  );
};

export default Page;
