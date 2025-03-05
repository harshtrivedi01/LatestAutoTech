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
    <div className="">
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
      <h1 className="text-2xl font-bold px-40 mt-4 text-start mb-3">Order  #{booking.booking_id}</h1>
      <p className="text-gray-600 text-sm px-40">
               <span className="font-semibold ">Order time & date:</span>{" "}
               {booking.create_date}
             </p>
      <div className="flex justify-center items-center gap-4 mx-40 shadow-lg border rounded-lg p-4">
       <div className="w-5/12 flex justify-center  rounded-lg">
       <img
          src={booking.puja_image || "/images/poojabox.png"}
          alt="Pooja Image"
          onError={(e) =>
            (e.target.src = "/images/logo.png")
          }
          className=" h-[250px] border-2 border-white object-cov   rounded-lg"
        />
       </div>
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
        <div className="flex justify-between align-top items-center mt-3 gap-3">
          
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
    </div>
  );
}
