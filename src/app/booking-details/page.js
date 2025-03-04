"use client";
import { useSearchParams } from "next/navigation";

export default function BookingDetails() {
  const searchParams = useSearchParams();
  const bookingData = searchParams.get("data");
  const booking = bookingData ? JSON.parse(bookingData) : null;

  if (!booking) {
    return <p className="text-center text-red-500">Booking details not found.</p>;
  }

  return (
    <div className="p-">
        <div className="bg-[#FFEEE2]">
        <div className="p-60 overflow-hidden">
          <div className="container">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
                Pooja booking detail
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mx-40 mt-4 text-start mb-3">Order  #{booking.booking_id}</h1>
      <div className="flex justify-center items-center gap-4 mx-40 shadow-lg border rounded-lg p-4">
        <img
          src={booking.puja_image || "/images/poojabox.png"}
          alt="Pooja Image"
          onError={(e) =>
            (e.target.src = "https://www.punyasetu.com/assets/images/logo.png")
          }
          className="w-5/12 h-[250px] border-2 border-white object-fit shadow-lg shadow-gray-400 rounded-lg"
        />
        <div className="w-7/12 items-start aligin-top">
          <p className="text-gray-500 text-sm">#{booking.booking_id}</p>
          <h2 className="text-lg font-bold text-black">{booking.puja_name}</h2>
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
    </div>
  );
}
