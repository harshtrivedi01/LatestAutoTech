"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const [pujaData, setPujaData] = useState("");

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "privacy_policy");

      const response = await api.post("/pages", formData);
      console.log("Response Data:", response.data);

      // Sanitize only in the client
      if (typeof window !== "undefined") {
        setPujaData(DOMPurify.sanitize(response.data.data.privacy_policy.description));
      } else {
        setPujaData(response.data.data.privacy_policy.description);
      }
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  return (
    <div className="bg-[#FFF8F5]">
      <div className="p-60 overflow-hidden">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 text-start"> {t("PrivacyPolicy")}</h2>

          <div className="py-12 px-4 space-y-4 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: pujaData }}></div>

        </div>
        <br />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
