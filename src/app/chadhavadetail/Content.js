"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProceedForm from "./ProceedForm.js";
import LoginPopup from "./LoginPopup.js";

const Content = ({ detail }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("One-Time");
  const [activeSubscriptionTab, setActiveSubscriptionTab] = useState("week");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

    // Handle proceed button click
    const handleProceedClick = () => {
      if (!isLoggedIn) {
        setShowLoginPopup(true); // Show login popup if user is not logged in
      } else {
        setShowForm(true);
      }
    };
  
    // Handle successful login
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setShowLoginPopup(false);
      setShowForm(true);
    };
  // Group subscription products by type (week, month, year)
  const groupedSubscriptions = detail?.subscription_products?.reduce((acc, item) => {
    const key = item.type.toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const availableSubscriptionTabs = ["week", "month", "year"].filter(tab => groupedSubscriptions?.[tab]);

  const handleOfferClick = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const handleIncrease = (id) => {
    setSelectedItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const handleDecrease = (id) => {
    setSelectedItems((prev) => {
      const updatedItems = prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
      return updatedItems;
    });
  };

 // Handle form close
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="relative bg-gray-100 p-4 container max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Left Section */}
      <div className="w-full ">
        {/* Main Section Tabs */}
        <div  className="flex space-x-4 justify-center border-b mb-4 p-2 bg-orange-800 text-white rounded-full">
          <button
            className={`px-4 py-2 rounded-full ${activeSection === "One-Time" ? "bg-white text-orange-800 font-semibold rounded-full" : "text-white"}`}
            onClick={() => setActiveSection("One-Time")}
          >
                {t("OneTime")}
          </button>
          <button
            className={`px-4 py-2 rounded-full ${activeSection === "Subscription" ? "bg-white text-orange-800 font-semibold rounded-full" : "text-white"}`}
            onClick={() => setActiveSection("Subscription")}
          >
            {t("Subscription")}
          </button>
        </div>

  
        {/* One-Time Products */}
        {activeSection === "One-Time" && (
          <div>
             <h3 className="text-2xl font-semibold text-start">{t("ChooseanOffering")}</h3>
            {detail?.onetime_products?.map((item) => {
              const selectedItem = selectedItems.find((i) => i.id === item.id);
              return (
                <div key={`onetime-${item.id}`} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
                  <img src={item.image} alt={item.name} className="w-40 h-40 object-contain rounded-lg" />
                  <div className="ml-4 space-y-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                       <h3 className="text-sm">{item.description}</h3>
                    <p className="text-lg text-orange-600">₹{item.price}/-</p>
                    {selectedItem ? (
                      <div className="flex items-center mt-5">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg" onClick={() => handleDecrease(item.id)}>-</button>
                        <span className="px-4 py-1 bg-green-600 text-white">{selectedItem.qty}</span>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg" onClick={() => handleIncrease(item.id)}>+</button>
                      </div>
                    ) : (
                      <button className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg" onClick={() => handleOfferClick(item)}>
                        {t("Offer")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Subscription Products with Tabs */}
        {activeSection === "Subscription" && (
          <div>
          <h3 className="text-2xl font-semibold text-start my-3">{t("ChooseaSubscription")}</h3>
            <div className="flex justify-center space-x-4 mb-4">
              {availableSubscriptionTabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    activeSubscriptionTab === tab ? "bg-orange-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveSubscriptionTab(tab)}
                >
                  {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
                </button>
              ))}
            </div>

            {/* Subscription Offerings */}
            {groupedSubscriptions?.[activeSubscriptionTab]?.map((item) => {
              const selectedItem = selectedItems.find((i) => i.id === item.id);
              return (
                <div key={`subscription-${item.id}-${item.type}`} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
                  <img src={item.image} alt={item.name} className="w-40 h-40 object-contain rounded-lg" />
                  <div className="ml-4 space-y-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <h3 className="text-sm">{item.description}</h3>
                    <p className="text-lg text-orange-600">₹{item.price}/- Per {item.type}</p>
                    {selectedItem ? (
                      <div className="flex items-center mt-5">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg" onClick={() => handleDecrease(item.id)}>-</button>
                        <span className="px-4 py-1 bg-green-600 text-white">{selectedItem.qty}</span>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg" onClick={() => handleIncrease(item.id)}>+</button>
                      </div>
                    ) : (
                      <button className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg" onClick={() => handleOfferClick(item)}>
                        {t("Offer")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {selectedItems.length > 0 && (
        <div className="w-full md:w-2/4 mt-10 bg-white p-6 rounded-2xl border-orange-400 shadow-lg sticky top-4 border transition-all duration-300 flex flex-col h-full">
          <h3 className="text-2xl font-semibold text-start border-b pb-2 border-orange-400 mb-4">Order Summary</h3>
          {selectedItems.map(({ id, name, price, qty }) => (
            <div key={id} className="flex space-y-3 justify-between items-center  pb-2">
              <div>
                <p className="text-lg font-">{name} x{qty}</p>
             
              </div>
              <div className="text-right">
                <p className="text-base text-orange-600">Rs. {price * qty}/-</p>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className=" pt-4">
            <div className="flex justify-between border-t pt-4">
              <p className="text-lg font-semibold">Total </p>
              <p className="text-lg text-orange-600">Rs. {totalPrice}/-</p>
            </div>

            {/* Proceed Button */}
            <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-6" onClick={() => setShowForm(true)}>
              Proceed
            </button>
          </div>
        </div>
      )}
  {showLoginPopup && <LoginPopup onLoginSuccess={handleLoginSuccess} totalPrice={totalPrice} handleClose={handleCloseForm} onClose={() => setShowLoginPopup(false)} />}

{/* Proceed Form - Show when Proceed is clicked */}
{showForm && <ProceedForm handleClose={handleCloseForm} totalPrice={totalPrice} />}
    </div>
  );
};

export default Content;
