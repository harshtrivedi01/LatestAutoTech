"use client";
import { useSearchParams } from "next/navigation";
import { IoReload } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

export default function BookingDetails() {
  const searchParams = useSearchParams();
  const bookingData = searchParams.get("data");
  const booking = bookingData ? JSON.parse(bookingData) : null;

  if (!booking) {
    return <p className="text-center text-red-500">Booking details not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="py-10 text-start px-5 bg-[#FFEEE2]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Pooja Booking Details</h2>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-40">
        <h1 className="text-xl sm:text-2xl font-bold mt-4">Order #{booking.booking_id}</h1>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-semibold">Order time & date:</span> {booking.create_date}
        </p>

        {/* Book Again Section */}
        {/* <div className="border flex flex-wrap justify-between items-center gap-2 mt-5 rounded-lg bg-[#FFEEE2] border-orange-300 border-2 p-2">
          <div className="flex items-center gap-1">
            <RiErrorWarningLine />
            <span className="font-bold">Book again the</span>
          </div>
          <button className="underline text-green-600 text-sm bg-green-100 flex items-center gap-1 p-1 rounded-lg px-4 sm:px-8">
            Book Again <IoReload />
          </button>
        </div> */}

        {/* Booking Details Section */}
        <div className="flex flex gap-4 mt-5 shadow-lg border rounded-lg p-4">
          {/* Image Section */}
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={booking.puja_image || "/images/poojabox.png"}
              alt="Pooja Image"
              onError={(e) => (e.target.src = "/images/logo.png")}
              className="w-full max-w-sm h-[250px] border-2 border-white object-cover rounded-lg"
            />
          </div>

          {/* Booking Info Section */}
          <div className="w-full md:w-7/12">
            <p className={`text-xl font-semibold ${booking.booking_status === "success" ? "text-green-500" : booking.booking_status === "failed" ? "text-red-500" : "text-yellow-500"}`}>
              {booking.booking_status}
            </p>
            <p className="text-green-600 text-sm mt-1">
              <span className="font-semibold">Order time & date:</span> {booking.create_date}
            </p>
            <h2 className="text-xl font-bold text-black my-2">{booking.puja_name}</h2>
            <p className="text-red-600 font-bold text-lg">{booking.package_name || "N/A"}</p>
            <p className="text-red-600 my-2 font-semibold text-xl">Amount Rs.{booking.amount}/-</p>
          </div>
          <div className="flex justify-center mt-3">
          <div>
          <div className={`px-4 py-1 rounded-full text-white ${booking.booking_status === "success" ? "bg-green-500" : booking.booking_status === "failed" ? "bg-red-500" : "bg-yellow-500"}`}>
            <p className="text-sm">{booking.booking_status}</p>
          </div>
          </div>
        </div>
        </div>

        {/* Status Section */}
       
      </div>
    </div>
  );
}
