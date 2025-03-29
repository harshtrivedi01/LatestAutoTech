import React from "react";
import ProceedForm from "./ProceedForm.js"; // Import form component
import { useTranslation } from "react-i18next";

const TabOne = ({ offers, setOffers, showProceed, setShowProceed, showForm, setShowForm, products = [] }) => {
  const { t } = useTranslation();

  const handleOfferClick = (id) => {
    setOffers((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
    setShowProceed(true);
  };

  const handleIncrease = (id) => {
    setOffers((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
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

  const totalQuantity = Object.values(offers).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(offers).reduce(
    (sum, [id, qty]) => sum + qty * products.find((item) => item.id === parseInt(id))?.price,
    0
  );

  const handleProceedClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Offerings List */}
      <div className={`w-full transition-all duration-300`}>
        <h3 className="text-2xl font-semibold text-start">{t("ChooseanOffering")}</h3>
        
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
              <img src={item.image} alt={item.title} className="w-40 h-40  border-orange-400 object-contain rounded-lg" />
              <div className="ml-4 space-y-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
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
          ))
        ) : (
          <p className="text-center text-gray-600 mt-4">{t("NoProductsAvailable")}</p>
        )}
      </div>

      {showForm && <ProceedForm handleClose={handleCloseForm} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default TabOne;
