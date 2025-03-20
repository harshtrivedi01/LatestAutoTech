"use client";
import { useSearchParams } from "next/navigation";
import AuthGuard from "../component/AuthGuard";
import { useTranslation } from "react-i18next";
import Faq from "../poojadetail/Faq";

export default function BookingDetailspage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const bookingData = searchParams.get("data");
  const booking = bookingData ? JSON.parse(bookingData) : null;

  if (!booking) {
    return <p className="text-center text-red-500">Booking details not found.</p>;
  }

  return (
    <AuthGuard>
      <div className="  bg-white">
        <div className="container py-10 text-start px-5 bg-[#FFEEE2]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t("PoojaBooking")}</h2>
        </div>

        <div className="container px-4 sm:px-8 md:px-16 lg:px-40 mb-5">
          <p className="p-4 mt-2">
            <span className="font-semibold text-xl">Pooja and Participant's Details</span>
          </p>

          {/* Booking Details */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2 shadow-lg border rounded-lg p-4">
            {/* Image */}
            <div className="w-full md:w-5/12 flex justify-center">
              <img
                src={booking.puja_image || "/images/poojabox.png"}
                alt="Pooja Image"
                onError={(e) => (e.target.src = "/images/logo.png")}
                className="w-full max-w-sm h-[250px] border-2 border-white object-contain rounded-lg"
              />
            </div>

            {/* Booking Info */}
            <div className="w-full md:w-7/12">
              <h2 className="text-xl font-bold text-black my-2 border-b">{booking.puja_name} ({booking.booking_date})</h2>
              {booking.create_date && (
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">{t("Ordertimedate")}</span> {booking.create_date}
                </p>
              )}
              {booking.package_name && (
                <p className="text-red-600 font-bold text-lg mt-2">{booking.package_name}</p>
              )}
              {booking.amount && (
                <p className="text-red-600 my-2 font-semibold text-xl">{t("AmountRs")}{booking.amount}/-</p>
              )}
 <div className="flex items-center gap-1">
             <h1 className="text-lg font-semibold"> {t("Paymentstatus")}:{" "} </h1>
             <div
               className={`${
                 booking.payment_status === "success"
                   ? "text-green-500"
                   : booking.payment_status === "failed"
                   ? "text-red-500"
                   : "text-yellow-500"
               } rounded-full`}
             >
               <p className="text-lg p"> {" "}{booking.payment_status}</p>
             </div>
             </div>
             <div className="flex items-center gap-1">
             <h1 className="text-lg font-semibold">{t("Bookingstatus")} :{" "} </h1>
             <div
               className={`${
                 booking.booking_status === "success"
                   ? "text-green-500"
                   : booking.booking_status === "cancelled"
                   ? "text-red-500"
                   : "text-yellow-500"
               } rounded-full`}
             >
               <p className="text-lg p"> {" "}{booking.booking_status}</p>
             </div>
             </div>
              {/* Payment Status */}
              {/* <div className="mt-3 flex md:justify-start justify-center">
                <div className={`px-4 py-1 rounded-full text-white ${booking.booking_status === "success" ? "bg-green-500" : booking.booking_status === "cancelled" ? "bg-red-500" : "bg-yellow-500"}`}>
                  <p className="text-sm">{booking.booking_status}</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* User Details */}
          {booking.user_info && (
            <>
              <p className="p-4 mt-2">
                <span className="text-xl font-semibold">{t("UserDetail")}</span>
              </p>
              <div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
                {booking.user_info.name && (
                  <p className="border-b p-2">
                    <span className="font-semibold">{t("Name")}:</span> {booking.user_info.name}
                  </p>
                )}
                {booking.user_info.father_name && (
                  <p className="border-b p-2">
                    <span className="font-semibold">{t("FatherName")}:</span> {booking.user_info.father_name}
                  </p>
                )}
                {booking.user_info.gotra && (
                  <p className="border-b p-2">
                    <span className="font-semibold">{t("Gotra")}:</span> {booking.user_info.gotra}
                  </p>
                )}
                {booking.user_info.email && (
                  <p className="p-2">
                    <span className="font-semibold">{t("Email")}:</span> {booking.user_info.email}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Participants */}
          {booking.members?.length > 0 && (
            <>
              <p className="p-4 mt-2">
                <span className="text-xl font-semibold">{t("MembersParticipatinginPooja")}</span>
              </p>
              <div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
                {booking.members.map((member, index) => (
                  <div key={index} className="border-b p-2 last:border-none">
                    <p className="border-b p-2">
                      <span className="font-semibold">{t("Name")}:</span> {member.name || "N/A"}
                    </p>
                    {/* <p>
                      <span className="font-semibold">{t("FatherName")}:</span> {member.father_name || "N/A"}
                    </p> */}
                    <p className="p-2">
                      <span className="font-semibold">{t("Gotra")}:</span> {member.gotra || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Progress Bar (Hidden if Cancelled) */}
         {/* Progress Bar (Always Visible, Shows "Cancelled" if Needed) */}
<p className="p-4 mt-2">
  <span className="font-semibold text-xl">Pooja Updates</span>
</p>
<div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
 
  <p className="text-gray-600 text-sm">
    <span className="font-semibold">{t("poojadate")}:</span> {booking.booking_date}
  </p>
 

  {/* If booking is cancelled, show a clear message */}
  {booking.booking_status === "cancelled" ? (
    <div className="flex justify- mt-4">
      <p className="bg-red-500 text-white text-lg font-semibold px-4 py-2 rounded-full">
        {t("Cancelled")}
      </p>
    </div>
  ) : (
    <div className="mt-6 flex items-center justify-between relative">
      {["pending", "confirmed", "success"].map((status, index, arr) => (
        <div key={status} className="flex items-center w-full">
          {/* Progress Ball */}
          <div className="relative flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
              booking.booking_status === status || 
              (status === "confirmed" && booking.booking_status === "success") 
                ? "bg-green-500 border-green-500 text-white"
                : "bg-gray-200 border-gray-400 text-gray-500"
            }`}>
              {index + 1}
            </div>
            <span className="text-xs mt-2 text-gray-600">{t(status)}</span>
          </div>

          {/* Connecting Line (Except for last step) */}
          {index < arr.length - 1 && (
            <div className={`flex-1 h-1 items-center mb-4 ${booking.booking_status === arr[index + 1] || booking.booking_status === "success" ? "bg-green-500" : "bg-gray-300"} transition-all duration-300`} />
          )}
        </div>
      ))}
    </div>
  )}
</div>

        </div>
      </div>
      <Faq/>
    </AuthGuard>
  );
}
