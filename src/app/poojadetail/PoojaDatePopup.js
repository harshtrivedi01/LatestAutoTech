
  import React, { useState } from "react";



const PoojaDatePopup = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (ranges) => {
    setSelectedDate(ranges.selection.startDate);
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
          {/* Date Picker */}
          <div>
            <h3 className="text-lg font-semibold -700 mb-1">Select a Date to Complete Your Pooja Booking</h3>
            <p className="mb-3">You've chosen your desired package <b>Individual Package</b> – now pick an auspicious date to finalize your booking and prepare for a divine experience</p>

           <input type="date" className="p-2 border-[1px] text-sm  rounded-lg w-full" />
          </div>

          {/* Image */}
          <div className="w-full md:w-1/1 date-img">
            <img
              src="../images/poojaPackage/date.png"
              alt="Pooja"
              className="rounded-lg  w-full object-cover"
              height="100%"
              width="100%"
            />
          </div>
        </div>

        {/* Save & Continue Button */}
        <div className="mt-6">
          <button
            className="w-full bg-green-700 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => alert("Date selected: " + selectedDate.toLocaleDateString())}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoojaDatePopup;
