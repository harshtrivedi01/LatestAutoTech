import React, { useState } from "react";
import EnterNumber from "./EnterNumber";
import EnterOTP from "./EnterOTP";

const LoginPopup = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (enteredPhone) => {
    setPhone(enteredPhone);
    setStep(2); // Move to OTP screen
  };

  const handleVerifyOtp = (enteredOtp) => {
    setOtp(enteredOtp);
    localStorage.setItem("authToken", "dummy_token"); // Store token after verification
    onClose(); // Close popup after login
  };

  return (
    <div className="fixed inset-1 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full">
        {step === 1 ? (
          <EnterNumber onSendOtp={handleSendOtp} />
        ) : (
          <EnterOTP phone={phone} onVerifyOtp={handleVerifyOtp} />
        )}
        <button onClick={onClose} className="w-full mt-4 text-gray-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
