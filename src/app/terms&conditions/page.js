"use client"
import React, { useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";
const TermsandConditions = () => {
  const { t } = useTranslation();
  const [pujaData, setPujaData] = useState([]);

  useEffect(() => {
      fetchPujaData();   
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "terms_condition");
  
      const response = await api.post("/pages", formData); // Use the new axios instance
  
      console.log("te", response.data);
      setPujaData(response.data.data.terms_condition.description)
     
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#FFF8F5]">
        <div className=" p-60 overflow-hidden">
          <div className="container">
          <h2 className="text-2xl font-bold mb-4 text-start"> {t("TermsANDConditions")}</h2>

          <div className="py-12"   dangerouslySetInnerHTML={{ __html:(pujaData) }}>

          </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default TermsandConditions;