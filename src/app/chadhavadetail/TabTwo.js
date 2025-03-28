import React, { useState } from "react";
import ProceedForm from "./ProceedForm.js"; // Import form component

const TabTwo = () => {
  const [offers, setOffers] = useState({});
  const [showProceed, setShowProceed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Weekly"); // State for active tab

  const subscriptionData = {
    Weekly: [
        { id: 1, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short description.Offer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread..", price: 51.00 },
    { id: 2, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Grand Offering", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
    { id: 3, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
],
    Monthly: [
        { id: 1, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short description.Offer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread..", price: 51.00 },
    { id: 2, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Grand Offering", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
    { id: 3, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
 ],
    Yearly: [
        { id: 1, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short description.Offer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread..", price: 51.00 },
        { id: 2, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Make a Grand Offering", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
        { id: 3, image: "https://www.srimandir.com/_next/image?url=https%3A%2F%2Fsrm-cdn.a4b.io%2Fyoda%2F1742584202337.png&w=96&q=75", title: "Offer a Prayer Thread", description: "Short descriptionOffer a Prayer ThreadOffer a Prayer ThreadOffer a Prayer Thread...", price: 51.00 },
        ],
  };

  const data1 = subscriptionData[selectedTab]; // Get data based on selected tab

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setOffers({}); // Reset selected offers when changing tab
    setShowProceed(false);
  };

  const handleOfferClick = (id) => {
    setOffers((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }));
    setShowProceed(true);
  };

  const handleIncrease = (id) => {
    setOffers((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id) => {
    setOffers((prev) => {
      const newCount = prev[id] - 1;
      const updatedOffers = { ...prev, [id]: newCount };

      if (newCount === 0) delete updatedOffers[id];
      if (Object.keys(updatedOffers).length === 0) setShowProceed(false);

      return updatedOffers;
    });
  };

  const totalPrice = Object.entries(offers).reduce(
    (sum, [id, qty]) => sum + qty * data1.find((item) => item.id === parseInt(id))?.price,
    0
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {["Weekly", "Monthly", "Yearly"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === tab ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between">
  {/* Offerings List (Left Side) */}
  <div className={`${showProceed ? "md:w-2/3" : "w-full"} transition-all duration-300`}>
    <h3 className="text-lg font-semibold text-center">Choose a Subscription</h3>
    {data1.map((item) => (
      <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
        <img src={item.image} alt={item.title} className="w-20 h-20 md:w-40 md:h-40 border-2 border-orange-400 object-contain p-3 rounded-lg" />
        <div className="ml-4 space-y-2">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-lg text-orange-600">Rs. {item.price}/-</p>

          {offers[item.id] ? (
            <div className="flex items-center mt-5">
              <button className="px-3 py-1 bg-green-600 text-white rounded-l-lg font-semibold" onClick={() => handleDecrease(item.id)}>-</button>
              <span className="px-4 py-1 bg-green-600 text-white font-semibold">{offers[item.id]}</span>
              <button className="px-3 py-1 bg-green-600 text-white rounded-r-lg font-semibold" onClick={() => handleIncrease(item.id)}>+</button>
            </div>
          ) : (
            <button className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg shadow-2xl font-semibold" onClick={() => handleOfferClick(item.id)}>
              Offer
            </button>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Order Summary (Right Side) */}
  {showProceed && (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg sticky top-4 mt-10 border transition-all duration-300 flex flex-col h-full">
      <h3 className="text-2xl font-semibold text-center mb-4">Order Summary</h3>
      <div className="flex flex-col gap-4 flex-grow">
        {Object.entries(offers).map(([id, qty]) => {
          const product = data1.find((item) => item.id === parseInt(id));
          return (
            <div key={id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="text-lg font-semibold mb-3">{product.title}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">x{qty}</p>
                <p className="text-sm text-orange-600">Rs. {product.price * qty}/-</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Total Price:</p>
          <p className="text-lg text-orange-600">Rs. {totalPrice}/-</p>
        </div>

        <button 
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-6"
          onClick={() => setShowForm(true)}
        >
          Proceed
        </button>
      </div>
    </div>
  )}
</div>


      {showForm && <ProceedForm handleClose={() => setShowForm(false)} handleSubmit={(formData) => console.log("Form Submitted:", formData)} />}
    </div>
  );
};

export default TabTwo;
