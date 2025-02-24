"use client"
import axios from "axios";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

const PoojaDatePopup = ({ onClose, pujaData ,date}) => {
  const router = useRouter();
   const { id } = useParams(); 
  // Check if the user is logged in based on the token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  localStorage.setItem("membernumber",pujaData?.no_of_member);
  
  console.log(localStorage.getItem("membernumber"),"tes")
  console.log(pujaData,"te")

  // Extract available dates
  const availableDates = date?.puja_detail?.dates || [];
  const sortedDates = [...availableDates]
    .map(date => new Date(date))
    .sort((a, b) => a - b);

  // State for selected date & calendar visibility
  const [selectedDate, setSelectedDate] = useState(sortedDates[0] || null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);


  useEffect(() => {
    if (sortedDates.length > 0) {
      setSelectedDate(sortedDates[0]); // Set nearest date initially
    }
  }, [pujaData]);

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // Handle submit
 const handleSubmit = async () => {
  
  if (isLoggedIn) {
    
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
  
    // Check if the selected date is in the future
    const today = new Date();
    if (selectedDate <= today) {
      alert("Please select a future date.");
      return;
    }

    const selectedPackage = pujaData;

    if (selectedPackage) {
      const formData = new FormData();
      formData.append("type", "book_puja");
      formData.append("puja_id", id); // Use puja id from params
      formData.append("package_id", selectedPackage.id); // Package ID selected
      formData.append("amount", selectedPackage.price.toString()); // Package price
      formData.append("payment_id", "1232"); // Add payment_id if needed
      formData.append("payment_detail", "123"); // Add payment details if available
      formData.append("payment_status", "failed");
      formData.append("date", selectedDate ? selectedDate.toISOString().split('T')[0] : ""); // Selected date
      formData.append("currency", "inr");
      formData.append("payment_type", "cashfree"); 
      formData.append("user_id",JSON.parse(localStorage.getItem("formData") || "{}").Device_id || ""); // Add user id or other identifiers

      setIsResendDisabled(true); 
      try {
        const response = await axios.post(
          "https://dakshhousing.com/satsambhav/websiteapi/puja", // Your API URL
          formData,
          {
            headers: {
              // Your headers if needed, like auth tokens, etc.
              "language": "en",
              "userId": "2",
              "user_type": "user",
              "Device_id": "upen",
              "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
              "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
              "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
              "web_token":localStorage.getItem("authToken")
            },
          }
        );

        if (response.data?.status == "0") {
          // Handle error when status is "0"
          toast.error(response.data?.message || "Something went wrong!");
          setIsResendDisabled(false);
        }
        if (response.data?.status == "1") {
          // Handle error when status is "0"
          toast.success(response.data?.message || "Something went wrong!");
          
          const bookingID = response.data?.data?.booking_id
       
          localStorage.setItem("bookingID", bookingID);
          router.push("/sankalpage");
          
        }
        else {
          console.error("Failed to book puja:", response.data?.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error submitting puja booking:", error);
      }
    } 
  } else {
    setIsResendDisabled(false);
    router.push("/login"); // Redirect to login if not logged in
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <Toaster position="top-right" reverseOrder={false} />  
      <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-xl w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-0 right-3 text-red-500 hover:text-red-700 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Date Selection */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-1">Select a Date to  Pooja Booking</h3>
            <p className="mb-3">
              You've chosen your desired package <b>Individual Package</b> – now pick an auspicious
              date to finalize your booking.
            </p>
            <p className="mb-3 bg-orange-500 py-2 text-lg text-center rounded-lg text-white font-bold">
            {pujaData.name}
            </p>

            {/* Button to Show Calendar */}
            <button
              className="w-full p-2 border flex gap-2 rounded-lg text-left bg-gray-100"
              onClick={() => setShowCalendar(!showCalendar)}
            >
        <Calendar/>     {selectedDate ? selectedDate.toDateString() : "Select a Date"} 
            </button>

            {/* Calendar (Hidden until clicked) */}
            {showCalendar && (
              <div className="absolute bg-white border rounded-lg mt-2 shadow-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  includeDates={sortedDates}
                  inline
                />
              </div>
            )}
          </div>

          {/* Image */}
          <div className="w-full md:w-1/1 date-img">
            <img
              src="../images/poojaPackage/date.png"
              alt="Pooja"
              className="rounded-lg w-full object-cover"
              height="100%"
              width="100%"
            />
          </div>
        </div>

        {/* Save & Continue Button */}
        <div className="mt-6">
      <button
        className={`w-full bg-green-600 text-white font-semibold p-2 px- rounded-lg transition 
          ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
        onClick={handleSubmit}
        disabled={isResendDisabled}
      >
        {isResendDisabled ? "Saving..." : isLoggedIn ? "Save & Continue" : "Login to Continue"}
      </button>
    </div>
      </div>
    </div>
  );
};

export default PoojaDatePopup;
