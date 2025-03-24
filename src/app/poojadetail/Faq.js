"use client"

import { useState, useEffect } from "react";
import api from "../lib/axiosInstance";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

export default function Faq() {
  const { t } = useTranslation();
  const [pujaData, setPujaData] = useState([]);

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "faqs");

      const response = await api.post("/pages", formData);
      setPujaData(response.data.data.faqs);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const toggleAccordion = (index) => {
    setPujaData((prevData) =>
      prevData.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : false, // Close other accordions
      }))
    );
  };

  return (
    <div className="faq p-10 bg-[#FFF8F5] ">
      <div className="'container max-w-7xl mx-auto ">
      <div className=" mb-4 overflow-hidden">
        <div className="container">
          <div className="items-center gap-10">
            <div>
              <h2 className="lg:text-2xl md:text-xl text-2xl font-bold mb-">
              {t("FAQ")}
              </h2>
            </div>
          </div>
        </div>
      
      </div>
        <div className="space-y-4 ">
          {pujaData?.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 bg-white px-2">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-5 text-slate-600 text-xl text-start"
              >
                <span>{faq?.title || "No Title"}</span>
                <span
                  className={`text-slate-600 transition-transform duration-300 ${
                    faq.isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 "
                  >
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  faq.isOpen ? "" : "max-h-0"
                }`}
              >
                <div className="pb-5 text-base text-start text-slate-500"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( faq?.description || "No description available.") }}>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

