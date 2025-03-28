"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TabOne from "./TabOne.js";
import TabTwo from "./TabTwo.js";
import ProceedForm from "./ProceedForm.js";
import LoginPopup from "./LoginPopup.js"; // Import login popup

const Content = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("tab1");
  const [offers, setOffers] = useState({});
  const [showProceed, setShowProceed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

 
  // Subscription data
  const subscriptionData = {
    Weekly: [
      { id: 1, title: "Offer a Prayer Thread", price: 51 },
      { id: 2, title: "Make a Grand Offering", price: 51 },
      { id: 3, title: "Offer a Prayer Thread", price: 51 },
    ],
    Monthly: [
      { id: 4, title: "Offer a Monthly Prayer", price: 101 },
      { id: 5, title: "Make a Monthly Offering", price: 101 },
    ],
    Yearly: [
      { id: 6, title: "Offer a Yearly Prayer", price: 501 },
      { id: 7, title: "Make a Grand Yearly Offering", price: 501 },
    ],
  };

  // Flatten all products into an array
  const allProducts = Object.values(subscriptionData).flat();

  // Get selected items
  const selectedItems = Object.entries(offers)
    .map(([id, qty]) => {
      const product = allProducts.find((item) => item.id === parseInt(id));
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  // Calculate total price
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);

// Check login status from localStorage (or API)
useEffect(() => {
  const authToken = localStorage.getItem("authToken");
  setIsLoggedIn(!!authToken); // ✅ Check if token exists
}, []);

const handleProceedClick = () => {
  if (!isLoggedIn) {
    setShowLoginPopup(true); // ✅ Show login popup only if user is not logged in
  } else {
    setShowForm(true);
  }
};

const handleLoginSuccess = (token) => {
  setIsLoggedIn(true);
  localStorage.setItem("authToken", token); // ✅ Store actual auth token from backend
  setShowLoginPopup(false);
  setShowForm(true);
};

  // Handle form close
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 p-4 container max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-4 justify-center border-b mb-4 p-2 bg-orange-800 text-white rounded-full">
        <button
          className={`py-1 px-4 ${activeTab === "tab1" ? "bg-white text-orange-800 font-semibold rounded-full" : "text-white"}`}
          onClick={() => setActiveTab("tab1")}
        >
          {t("OneTime")}
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "tab2" ? "bg-white text-orange-800 font-semibold rounded-full" : "text-white"}`}
          onClick={() => setActiveTab("tab2")}
        >
          {t("Subscription")}
        </button>
      </div>

      {/* Tab Content & Order Summary Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Switching Section */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`w-full transition-all duration-300 ${selectedItems.length > 0 ? "md:w-2/3" : "md:w-full"}`}
        >
          {activeTab === "tab1" ? (
            <TabOne 
              offers={offers} 
              setOffers={setOffers} 
              showProceed={showProceed} 
              setShowProceed={setShowProceed} 
              showForm={showForm} 
              setShowForm={setShowForm} 
            />
          ) : (
            <TabTwo offers={offers} setOffers={setOffers} />
          )}
        </motion.div>

        {/* Order Summary (Hide if empty) */}
        {selectedItems.length > 0 && (
          <div className="w-full mt-12 md:w-1/3 bg-white  p-6 rounded-lg shadow-lg sticky top-4 border border-orange-600 transition-all duration-300 flex flex-col h-full">
            <h3 className="text-2xl font-semibold text-start border-b border-orange-400 pb-2 mb-4">Order Summary</h3>
            {selectedItems.map(({ id, title, price, qty }) => (
              <div key={id} className="flex justify-between items-center border-b pb-3 mt-3">
                <div>
                  <p className="text-base text-gray-700">{title}
                  <span className="text-sm text-gray-600"> {" "}(x{qty})</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-600">Rs. {price * qty}/-</p>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="mt-4 pt-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total Price:</p>
                <p className="text-lg text-orange-600">Rs. {totalPrice}/-</p>
              </div>

              {/* Proceed Button */}
              <button
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-6"
                onClick={handleProceedClick}
              >
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login Popup - Show when not logged in */}
      {showLoginPopup && (
  <LoginPopup 
    onLoginSuccess={handleLoginSuccess} 
    totalPrice={totalPrice} 
    handleClose={() => { 
      setShowLoginPopup(false); // ✅ Close Login Popup
      setShowForm(false); // ✅ Ensure ProceedForm is also hidden
    }} 
    onClose={() => setShowLoginPopup(false)} 
  />
)}


      {/* Proceed Form - Show when Proceed is clicked */}
      {showForm && <ProceedForm handleClose={handleCloseForm} totalPrice={totalPrice} />}
    </div>
  );
};

export default Content;
