"use client"
import React, { useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import DOMPurify from 'dompurify';
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const PrivacyPolicy = () => {

  const [pujaData, setPujaData] = useState([]);

  useEffect(() => {
      fetchPujaData();   
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "privacy_policy");
  
      const response = await api.post("/pages", formData); // Use the new axios instance
  
      console.log("te", response.data);
      setPujaData(response.data.data.privacy_policy.description)
     
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#FFF8F5]">
        <div className=" p-60 overflow-hidden">
          <div className="container">
          <h2 className="text-3xl font-bold mb-4 text-start"> Privacy Policy</h2>

          <div className="py-12"   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pujaData) }}>

          </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
