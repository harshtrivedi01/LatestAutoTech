'use client';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "./../reduxrtk/slice.js";

export default function OtpVerificationPage() {
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.auth.otp);

  const handleOtpChange = (e) => {
    dispatch(setOtp(e.target.value));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("otp", otp);

    try {
      const response = await axios.post("http://13.235.230.223/api/otpVerification", data);
      console.log("OTP Verification Response:", response.data);
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded"
            onChange={handleOtpChange}
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
