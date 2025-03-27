import React, { useState } from "react";

const EnterNumber = ({ onSendOtp }) => {
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    console.log("OTP sent to:", phone); // Replace with actual API call
    onSendOtp(phone);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enter Mobile Number</h2>
      <input
        type="tel"
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter your mobile number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp} className="w-full bg-orange-600 text-white py-2 rounded">
        Send OTP
      </button>
    </div>
  );
};

export default EnterNumber;
