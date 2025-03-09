"use client";
import { Calendar } from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const PoojaDatePopup = ({ onClose, pujaData, date }) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  // Check user login status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Store member count in localStorage
  localStorage.setItem("membernumber", pujaData?.no_of_member);
  localStorage.setItem("productdeatil2", JSON.stringify(pujaData));

  // Extract available dates
  const availableDates = date?.dates || [];
  const sortedDates = availableDates.map((d) => new Date(d)).sort((a, b) => a - b);


const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Set initial date (first available date or tomorrow)
useEffect(() => {
  if (sortedDates.length > 0) {
    setSelectedDate(sortedDates[0]); // Use first available date
  } else {
    setSelectedDate(tomorrow); // Default to tomorrow
  }
}, [pujaData]);

// Handle date selection
const handleDateSelect = (date) => {
  if (date < tomorrow) { // Prevent selecting today or past dates
    alert("Please select a future date.");
    return;
  }
  setSelectedDate(date);
  setShowCalendar(false);
};

  // Handle form submission
  const handleSubmit = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectPath", pathname);
      router.push("/login");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (selectedDate <= today) {
      alert("Please select a future date.");
      return;
    }

    const selectedPackage = pujaData;

    if (selectedPackage) {
      const formData = {
        type: "book_puja",
        puja_id: id,
        package_id: selectedPackage.id,
        amount: selectedPackage.price.toString(),
        payment_id: "1232",
        payment_detail: "123",
        payment_status: "NA",
        date: selectedDate.toISOString().split("T")[0],
        currency: "INR",
        payment_type: "cashfree",
        user_id: JSON.parse(localStorage.getItem("formData") || "{}").Device_id || "",
      };

      localStorage.setItem("pujaBookingData", JSON.stringify(formData));

      // Redirect to Sankalp page
      router.push("/sankalpage");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-xl w-full relative">
        <button
          className="absolute top-0 right-3 text-red-500 hover:text-red-700 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-1">{t("SelectaDateforPoojaBooking")}</h3>
           
            <p className="mb-3 bg-orange-500 py-2 text-lg text-center rounded-lg text-white font-bold">
              {pujaData.name}
            </p>

            <button
              className="w-full p-2 border flex gap-2 rounded-lg text-left bg-gray-100"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <Calendar /> {selectedDate ? selectedDate.toDateString() : "Select a Date"}
            </button>

            {showCalendar && (
              <div className="absolute bg-white border rounded-lg mt-2 shadow-lg">
               <DatePicker
  selected={selectedDate}
  onChange={handleDateSelect}
  inline
  minDate={tomorrow} // Ensures today is not selectable
/>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/1 date-img">
            <img
              src="../images/poojaPackage/date.png"
              alt="Pooja"
              className="rounded-lg w-full object-cover"
              height="50%"
              width="50%"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            className={`w-full bg-green-600 text-white font-semibold p-2 rounded-lg transition 
              ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
            onClick={handleSubmit}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `${t("Saving")}...` : `${t("SaveContinue")}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoojaDatePopup;
