import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TabTwo = ({ offers, setOffers }) => {
  const [selectedTab, setSelectedTab] = useState("Weekly");
  const { t } = useTranslation();
  const subscriptionData = {
    Weekly: [
      { id: 1, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short description..", price: 51.00 },
      { id: 2, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Grand Offering", description: "Short description...", price: 51.00 },
      { id: 3, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short description...", price: 51.00 },
    ],
    Monthly: [
      { id: 4, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Monthly Prayer", description: "Short description..", price: 101.00 },
      { id: 5, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Monthly Offering", description: "Short description...", price: 101.00 },
    ],
    Yearly: [
      { id: 6, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Yearly Prayer", description: "Short description..", price: 501.00 },
      { id: 7, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Grand Yearly Offering", description: "Short description...", price: 501.00 },
    ],
  };

  const data1 = subscriptionData[selectedTab];

  const tabKeys = {
    [t("Weekly")]: "Weekly",
    [t("Monthly")]: "Monthly",
    [t("Yearly")]: "Yearly",
  };
  
  const handleTabChange = (tab) => {
    setSelectedTab(tabKeys[tab]); // Convert translated tab back to original key
  };
  

  const handleOfferClick = (id) => {
    setOffers((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const handleIncrease = (id) => {
    setOffers((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setOffers((prev) => {
      if (!prev[id] || prev[id] <= 1) {
        const updatedOffers = { ...prev };
        delete updatedOffers[id];
        return updatedOffers;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <h3 className="text-2xl font-semibold text-center">{t("ChooseaSubscription")}</h3>
      <div className="flex justify-center space-x-4 mb-4">
      {Object.keys(tabKeys).map((tab) => (
  <button
    key={tab}
    className={`px-4 py-2 rounded-lg font-semibold transition ${
      tabKeys[tab] === selectedTab ? "bg-orange-500 text-white" : "bg-gray-200"
    }`}
    onClick={() => handleTabChange(tab)}
  >
    {tab}
  </button>
))}

      </div>

      {/* Offerings */}
      <div className="w-full transition-all duration-300">
       
        {data1.map((item) => (
          <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
            <img src={item.image} alt={item.title} className="w-40 h-40 border-2 border-orange-400 object-contain  rounded-lg" />
            <div className="ml-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg text-orange-600">₹{item.price}/-</p>

              {offers[item.id] ? (
                <div className="flex items-center mt-5">
                  <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg font-semibold" onClick={() => handleDecrease(item.id)}>-</button>
                  <span className="px-4 py-1 bg-green-600 text-white font-semibold">{offers[item.id]}</span>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg font-semibold" onClick={() => handleIncrease(item.id)}>+</button>
                </div>
              ) : (
                <button className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg shadow-2xl font-semibold" onClick={() => handleOfferClick(item.id)}>
                  {t("Offer")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabTwo;
