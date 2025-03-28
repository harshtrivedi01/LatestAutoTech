"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TabOne from "./TabOne.js";
import TabTwo from "./TabTwo.js";

const Content = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="bg-gray-100 p-4 container max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-4 justify-center border-b mb-4 p-2 bg-orange-800 text-white rounded-full">
        <button
          className={`py-1 px-4 ${
            activeTab === "tab1"
              ? "bg-white text-orange-800 font-semibold rounded-full"
              : "text-white"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          {t("OneTime")}
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "tab2"
              ? "bg-white text-orange-800 font-semibold rounded-full"
              : "text-white"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          {t("Subscription")}
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "tab1" ? <TabOne /> : <TabTwo />}
      </motion.div>
    </div>
  );
};

export default Content;
