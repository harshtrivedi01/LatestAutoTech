"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import api from "../lib/axiosInstance";

//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const Bookingpage = () => {
  const [activeStep, setActiveStep] = useState("Pooja Booking");
  const [Poojabookings, setPoojabookings] = useState([]);

  const steps = [
    { id: 1, title: "Pooja Booking" },
    { id: 2, title: "Pandit Booking" },
    { id: 3, title: "Pooja Box" },
  ];

  useEffect(() => {
    // Fetch data from API
    const fetchBookings = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "puja_booking_history");
     
  
        const response = await api.post("/puja", formData); // Replace with actual API endpoint
        const data = await response.json();

        if (data?.data?.booking_list) {
          setPoojabookings(data.data.booking_list);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const Panditbookings = [
    {
      bookingId: "#2029383825237598",
      name: "Pandit Ajit Ram",
      status: "Booked Successfully",
      amount: 2000,
      orderTime: "2:00pm , 20 Nov 2024",
      status: "Pending",
      image: "/images/panditji.png",
    },
    {
      bookingId: "#2029383825237599",
      name: "Pandit Ramesh Sharma",
      status: "Booked Successfully",
      amount: 2500,
      orderTime: "4:00pm , 22 Nov 2024",
      status: "Failed",
      image: "/images/panditji.png",
    },
    {
      bookingId: "#2029383825237600",
      name: "Pandit Vijay Kumar",
      status: "Booked Successfully",
      amount: 1800,
      orderTime: "11:00am , 25 Nov 2024",
      status: "Success",
      image: "/images/panditji.png",
    },
  ];

  const poojaBox = [
    {
      id: 1,
      name: "MAHA RUDRA HOMAM/HAVAN",
      description: "Turmeric Powder 100 gms , s...",
      deliveryDate: "Expected delivery by 22 May, 2024",
      amount: 745,
      status: "Pending",
      orderTime: "2:00pm, 20 Nov 2024",
      image: "/images/poojabox.png",
    },
    {
      id: 2,
      name: "NAVAGRAHA POOJA BOX",
      description: "Sandalwood Powder, Ghee, Cotton Wicks...",
      deliveryDate: "Expected delivery by 25 May, 2024",
      amount: 850,
      status: "Success",
      orderTime: "3:30pm, 18 Nov 2024",
      image: "/images/poojabox.png",
    },
    {
      id: 3,
      name: "GANESH POOJA KIT",
      description: "Betel Leaves, Modak, Dhoop...",
      deliveryDate: "Expected delivery by 28 May, 2024",
      amount: 500,
      status: "Failed",
      orderTime: "5:00pm, 22 Nov 2024",
      image: "/images/poojabox.png",
    },
  ];

  const statusColors = {
    Pending: "bg-[#87521B]",
    Failed: "bg-red-700",
    Success: "bg-green-700",
  };

  return (
    <div>
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

      <div className="max-w-7xl flex justify-betweeni tems-center mx-auto pt-14 px-5">
  <div className="flex-grow max-w-5xl mr-4">
    <form
      // onSubmit={handleSearch}
      className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden font-[sans-serif]"
    >
      <input
        type="text"
        placeholder="Search Something..."
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full outline-none bg-transparent text-gray-600 text-lg"
      />
      <button type="submit">
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
        
        <option value="" disabled selected>
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
{activeStep === "Pooja Booking" && (
  <div className="bg-gray-100 p-6 mt-12 rounded-lg">
    <div className="grid grid-cols-3 gap-5">
      {Poojabookings.map((booking) => (
        <div
          key={booking.booking_id}
          className="border-[#87521B] bg-white border-[2px] rounded-lg p-5"
        >
          <div className="flex justify-center items-center gap-4">
            <img
              src={booking.puja_image || "/images/poojabox.png"}
              alt="Pooja Image"
              className="w-5/12 h-[150px] border-2 border-white object-cover shadow-lg shadow-gray-400 rounded-lg"
            />

            <div className="w-7/12">
              <p className="text-gray-500 text-sm">#{booking.booking_id}</p>
              <h2 className="text-lg font-bold text-black">
                {booking.puja_name}
              </h2>
              <p
                className={`${
                  booking.booking_status === "success"
                    ? "text-green-700"
                    : "text-red-600"
                } font-semibold text-md`}
              >
                {booking.booking_status === "success"
                  ? "Booked Successfully"
                  : "Booking Failed"}
              </p>
              <p className="text-gray-800 font-semibold text-lg">
                Amount Rs.{booking.amount}/-
              </p>
              <p className="text-red-600 font-bold text-md">
                {booking.package_name || "N/A"}
              </p>
              {/* <p className="text-orange-600 font-semibold mt-1 cursor-pointer underline">
                Book Again
              </p> */}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 gap-3">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Order time & date:</span>{" "}
              {booking.create_date}
            </p>
            <div
              className={`${
                booking.booking_status === "success"
                  ? "bg-green-500"
                  : booking.booking_status === "failed"
                  ? "bg-red-500"
                  : "bg-yellow-500"
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


        {/* pandit booking div */}
        {activeStep === "Pandit Booking" && (
          <div className="bg-gray-100 p-6 mt-12 rounded-lg">
            <div className="grid grid-cols-3 gap-5">
              {Panditbookings.map((booking, index) => (
                <div
                  key={index}
                  className="border-[#87521B] bg-white border-[2px] rounded-lg p-4"
                >
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={booking.image}
                      alt="Pooja Image"
                      className="w-5/12 h-[140px] border-2 border-white object-cover shadow-md shadow-gray-400 rounded-lg"
                    />

                    <div className="items-center w-7/12">
                      <p className="text-gray-500 text-sm">
                        {booking.bookingId}
                      </p>
                      <h2 className="text-lg font-bold text-black">
                        {booking.name}
                      </h2>
                      <p className="text-green-700 font-semibold text-md">
                        {booking.status}
                      </p>
                      <p className="text-red-600 font-bold text-md">
                        Amount Rs.{booking.amount}/-
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 gap-3">
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Order time & date:</span>{" "}
                      {booking.orderTime}
                    </p>
                    <div
                      className={`${
                        statusColors[booking.status]
                      } rounded-full px-4 py-1`}
                    >
                      <p className="text-white text-sm">{booking.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* pooja box div */}
        {activeStep === "Pooja Box" && (
          <div className="bg-gray-100 p-6 mt-12 rounded-lg">
            <div className="grid grid-cols-3 gap-5">
              {poojaBox.map((booking) => (
                <div
                  key={booking.id}
                  className="border-[#87521B] bg-white border-[2px] rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.image}
                      alt="Pooja Image"
                      className="w-4/12 h-[180px] object-cover shadow-md shadow-gray-400 rounded-lg"
                    />

                    <div className="w-8/12">
                      <h2 className="text-[15px] font-[500] text-[#855318]">
                        {booking.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {booking.description}
                      </p>
                      <p className="text-[#7E570F] font-[400] text-[14px]">
                        {booking.deliveryDate}
                      </p>
                      <p className="text-gray-800 font-[500] text-[14px]">
                        Amount Rs.{booking.amount}
                      </p>

                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">
                          Order time & date:
                        </span>{" "}
                        {booking.orderTime}
                      </p>
                      <p className="text-[#FA8128] font-[400] mt-1 cursor-pointer underline">
                        Order Again
                      </p>
                      <div
                        className={`${
                          statusColors[booking.status]
                        } rounded-full w-20 px-4 py-1 mt-3`}
                      >
                        <p className="text-white text-sm">{booking.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookingpage;
