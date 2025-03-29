"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Faq({ detail }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq px-4 py-10 bg-[#FFF8F5] ">
      <div className="container max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-start my-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("FAQ")}</h2>
        </div>

        {/* Accordion Section */}
        <div className="space-y-4">
          {detail?.faq_list?.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 bg-white px-4 rounded-lg shadow-sm">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 text-gray-700 text-lg sm:text-xl text-left"
              >
                <span>{faq?.question || "No Title"}</span>
                <span
                  className={`transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-[1000px] opacity-100 py-3" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="text-gray-600 text-base text-start"
                  dangerouslySetInnerHTML={{ __html: faq?.answer || "No description available." }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
