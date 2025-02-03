"use client";import 


{ useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "./../reduxrtk/slice.js";


export default function LoginPage() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.auth.formData);

  useEffect(() => {
    // Get user's IP address
    axios.get("https://api64.ipify.org?format=json")
      .then(response => {
        dispatch(setFormData({ ip_address: response.data.ip }));
      })
      .catch(error => console.error("Error fetching IP address:", error));

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setFormData({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setFormData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${process.env.baseurl}authentication`, data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="phone" placeholder="Phone" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="language" placeholder="Language" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="longitude" value={formData.longitude} readOnly className="w-full p-2 border rounded bg-gray-200" />
          <input type="text" name="latitude" value={formData.latitude} readOnly className="w-full p-2 border rounded bg-gray-200" />
          <input type="text" name="ip_address" value={formData.ip_address} readOnly className="w-full p-2 border rounded bg-gray-200" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
}