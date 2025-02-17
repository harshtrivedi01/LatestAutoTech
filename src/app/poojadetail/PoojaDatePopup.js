import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PoojaDatePopup = ({ onClose, pujaData }) => {
  const router = useRouter();
  
  // Check if the user is logged in based on the token
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  // Extract available dates
  const availableDates = pujaData?.puja_detail?.dates || [];
  const sortedDates = [...availableDates]
    .map(date => new Date(date))
    .sort((a, b) => a - b);

  // State for selected date & calendar visibility
  const [selectedDate, setSelectedDate] = useState(sortedDates[0] || null);
  const [showCalendar, setShowCalendar] = useState(false);

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
  const handleSubmit = () => {
    if (isLoggedIn) {
      alert("Date selected: " + selectedDate.toLocaleDateString());
    } else {
      router.push("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full relative">
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
            <h3 className="text-lg font-semibold mb-1">Select a Date to Complete Your Pooja Booking</h3>
            <p className="mb-3">
              You've chosen your desired package <b>Individual Package</b> – now pick an auspicious
              date to finalize your booking.
            </p>

            {/* Button to Show Calendar */}
            <button
              className="w-full p-2 border rounded-lg text-left bg-gray-100"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {selectedDate ? selectedDate.toDateString() : "Select a Date"}
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
            className="w-full bg-green-700 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            {isLoggedIn ? "Save & Continue" : "Login to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoojaDatePopup;
