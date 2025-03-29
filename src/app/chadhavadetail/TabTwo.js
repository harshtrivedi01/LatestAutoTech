import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TabTwo = ({ offers, setOffers, products = [] }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("week");

  // Group products by type (week, month, year)
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.type.toLowerCase();
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const availableTabs = Object.keys(groupedProducts);
  const selectedProducts = groupedProducts[selectedTab] || [];

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
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
        {availableTabs.length > 0 ? (
          availableTabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                tab === selectedTab ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {t(tab.charAt(0).toUpperCase() + tab.slice(1))} {/* Capitalize first letter */}
            </button>
          ))
        ) : (
          <p className="text-gray-500">{t("NoSubscriptionOptions")}</p>
        )}
      </div>

      {/* Offerings */}
      <div className="w-full transition-all duration-300">
        {selectedProducts.length > 0 ? (
          selectedProducts.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
              <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="w-40 h-40 border-2 border-orange-400 object-contain rounded-lg" />
              <div className="ml-4 space-y-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description || "No description available"}</p>
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
          ))
        ) : (
          <p className="text-center text-gray-600 mt-4">{t("NoProductsAvailable")}</p>
        )}
      </div>
    </div>
  );
};

export default TabTwo;
