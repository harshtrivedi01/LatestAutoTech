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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Fetch token from localStorage
    setIsLoggedIn(!!token); // Convert token existence to a boolean
  }, []);
  // Load cart on mount
useEffect(() => {
  const storedCart = localStorage.getItem("orderSummary");
  if (storedCart) {
    setSelectedItems(JSON.parse(storedCart));
  }
}, []);


// // Persist the active section
// useEffect(() => {
//   localStorage.setItem("activeSection", activeSection);
// }, [activeSection]);

// // Persist the active subscription tab
// useEffect(() => {
//   localStorage.setItem("activeSubscriptionTab", activeSubscriptionTab);
// }, [activeSubscriptionTab]);

// Save cart whenever it changes
useEffect(() => {
  localStorage.setItem("orderSummary", JSON.stringify(selectedItems));
}, [selectedItems]);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token); // Store the token with correct key
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    setShowForm(true);
  };
  
  const handleProceedClick = () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      setShowLoginPopup(true); // Show login popup if no token is found
    } else {
      setShowForm(true);
    }
  };
  
  // Transform selectedItems into the required format
  const orderSummary = selectedItems.map(item => ({
    id: item.id,
    qty: item.qty,
    type: item.type,
  }));

  // Group subscription products by type (week, month, year)
  const groupedSubscriptions = detail?.subscription_products?.reduce((acc, item) => {
    const key = item.type.toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const availableSubscriptionTabs = ["week", "month", "year"].filter(tab => groupedSubscriptions?.[tab]);

  
  const handleOfferClick = (item, category) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.category === category && i.type === item.type
      );
  
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.category === category && i.type === item.type
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, qty: 1, category }];
      }
    });
  };
  
  
  

  const handleIncrease = (id, category, type) => {
    setSelectedItems((prev) =>
      prev.map((i) =>
        i.id === id && i.category === category && i.type === type
          ? { ...i, qty: i.qty + 1 }
          : i
      )
    );
  };
  

  const handleDecrease = (id, category, type) => {
    setSelectedItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.category === category && i.type === type
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0) // Remove items with qty <= 0
    );
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
      {(detail?.onetime_products?.length > 0 || detail?.subscription_products?.length > 0) && (
  <div className="flex space-x-4 justify-center border-b mb-4 p-2 bg-orange-800 text-white rounded-full">
   <button
  className={`px-4 py-2 rounded-full ${
    activeSection === "One-Time" ? "bg-white text-orange-800 font-semibold" : "text-white"
  }`}
  onClick={() => setActiveSection("One-Time")}
>
  {t("OneTime")}
</button>

    {detail?.subscription_products?.length > 0 && (
    <button
    className={`px-4 py-2 rounded-full ${
      activeSection === "Subscription" ? "bg-white text-orange-800 font-semibold" : "text-white"
    }`}
    onClick={() => setActiveSection("Subscription")}
  >
    {t("Subscription")}
  </button>
    )}
  </div>
)}


  
        {/* One-Time Products */}
        {activeSection === "One-Time" && (
          <div>
             <h3 className="text-2xl font-semibold text-start">{t("ChooseanOffering")}</h3>
            {detail?.onetime_products?.map((item) => {
            const selectedItem = selectedItems.find(
              (i) => i.id === item.id && i.category === "one-time"
            );
            
              return (
                <div key={`onetime-${item.id}`}  className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
                  <img src={item.image} alt={item.name} className="w-40 h-40 object-contain rounded-lg" />
                  <div className="ml-4 space-y-2">
                    <h3 className="text-lg font-semibold"  dangerouslySetInnerHTML={{
      __html: item.name,
    }}></h3>
                       <h3 className="text-sm" dangerouslySetInnerHTML={{
      __html: item.description,
    }}></h3>
                       <p className="text-lg text-orange-600">
  {item.price > 0 ? `₹${item.price}/-` : t("Free")}
</p>

                    {selectedItem ? (
                      <div className="flex items-center mt-5">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg" onClick={() => handleDecrease(item.id, "one-time", item.type)}> - </button>
                        <span className="px-4 py-1 bg-green-600 text-white">{selectedItem.qty}</span>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg"onClick={() => handleIncrease(item.id, "one-time", item.type)}> + </button>
                      </div>
                    ) : (
                      <button 
                      className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg" 
                      onClick={() => handleOfferClick(item, "one-time")}
                    >
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
       {activeSection === "Subscription" && detail?.subscription_products?.length > 0 && (
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
             const selectedItem = selectedItems.find(
              (i) => i.id === item.id && i.category === "subscription" && i.type === item.type
            );
            
              return (
                <div  key={`subscription-${item.id}-${item.type}`} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
                  <img src={item.image} alt={item.name} className="w-40 h-40 object-contain rounded-lg" />
                  <div className="ml-4 space-y-2">
                  <h3 className="text-lg font-semibold"  dangerouslySetInnerHTML={{
      __html: item.name,
    }}></h3>
                       <h3 className="text-sm" dangerouslySetInnerHTML={{
      __html: item.description,
    }}></h3>
                    <p className="text-lg text-orange-600">₹{item.price}/-   {t("Per")} {item.type}</p>
                    {selectedItem ? (
                      <div className="flex items-center mt-5">
                        <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg"  onClick={() => handleDecrease(item.id, "subscription", item.type)}> - </button>
                        <span className="px-4 py-1 bg-green-600 text-white">{selectedItem.qty}</span>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg"onClick={() => handleIncrease(item.id, "subscription", item.type)}> + </button>
                      </div>
                    ) : (
                      <button 
                      className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg" 
                      onClick={() => handleOfferClick(item, "subscription")}
                    >
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
    <h3 className="text-xl font-semibold text-start border-b pb-2 border-orange-400 mb-4">{t("OrderSummary")}</h3>

    {/* One-Time Items */}
    {selectedItems.some(item => item.category === "one-time") && (
      <>
        <h4 className="text-lg font-semibold mt-4 border-b mb-2"> {t("OneTime")}</h4>
        {selectedItems.filter(item => item.category === "one-time").map(({ id, name, price, qty }) => (
          <div key={id} className="flex justify-between items-center pb-2">
            <p className="text-sm">{name} (x{qty})</p>
            <p className="text-base text-orange-600">{price > 0 ? `₹${price}` : t("Free")}/-</p>
          </div>
        ))}
      </>
    )}

    {/* Subscription Items */}
    {selectedItems.some(item => item.category === "subscription") && (
      <>
        <h4 className="text-lg font-semibold mt-4 border-b mb-2">{t("Subscription")}</h4>
        {selectedItems.filter(item => item.category === "subscription").map(({ id, name, price, qty ,type}) => (
          <div key={id} className="flex justify-between items-center pb-2">
            <p className="text-sm">{name} (x{qty}) <span className="text-sm text-orange-500">{type}</span></p>
          
                        <p className="text-base text-orange-600">₹{price * qty}/-</p>
          </div>
        ))}
      </>
    )}

    {/* Total Price */}
    <div className="pt-4">
      <div className="flex justify-between border-t pt-4">
        <p className="text-lg font-semibold">{t("Total")}</p>
        <p className="text-lg text-orange-600">{totalPrice > 0 ? `₹${totalPrice}/-` : t("Free")}</p>
      </div>

      {/* Proceed Button */}
      <button
        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-6"
        onClick={handleProceedClick}
      >
        {t("Checkout")}
      </button>
    </div>
  </div>
)}

  {showLoginPopup && <LoginPopup  id={detail.chadhava_detail.id} carts={orderSummary}  onLoginSuccess={handleLoginSuccess} totalPrice={totalPrice} handleClose={handleCloseForm} onClose={() => setShowLoginPopup(false)} />}

{/* Proceed Form - Show when Proceed is clicked */}
{showForm && (
  <ProceedForm
    handleClose={handleCloseForm}
    id={detail.chadhava_detail.id}
    totalPrice={totalPrice}
    carts={orderSummary} // Pass order summary
  />
)}
    </div>
  );
};

export default Content;
