import React, { useState, useEffect } from "react";
import PoojaDatePopup from "./PoojaDatePopup";

const PoojaPackages = ({ detail }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Set the first package as default selected when component mounts
  useEffect(() => {
    if (detail?.puja_detail?.packages?.length > 0) {
      setSelectedPackage(detail.puja_detail.packages[0]);
    }
  }, [detail]);

  const handleParticipate = (pkg) => {
    setSelectedPackage(pkg); // Update the selected package
    setShowPopup(true);
  };

  return (
    <div className="package p-60 bg-grey" id="Package-section">
     <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 mx-auto">
        <h1 className="title text-black my-5">Select Pooja Package</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {detail?.puja_detail?.packages?.map((pkg) => {
            const isHighlighted = selectedPackage?.id === pkg.id;

            return (
              <div
              key={pkg.id}
              className={`border text-black rounded-lg cursor-pointer flex flex-col h-full ${
                isHighlighted
                  ? "border-1 p-1  bg-orange-100 border-orange-500 active-package"
                  : "bg-white border-2 border-orange-600"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {/* Package Header */}
              <div className="flex gap-2 justify-between top-card rounded-t-3xl p-4 rounded-lg items-center">
                <div className="pack-img w-20 h-10 ">
                  <img
                    src={
                      "https://www.punyasetu.com/assets/images/logo.png" ||
                      pkg.image.replace(/([^:]\/)\/+/g, "$1")
                    }
                    alt={pkg.name}
                    width={80}
                    height={80}
                    className="object-cove h-24 rounded-lg"
                  />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold mb-2 f-26">{pkg.name}</h2>
                  <h2 className="text-lg font-bold mb-2">
                    Package for {pkg.no_of_member} Person
                  </h2>
                  <p className="font-bold text-red-600 text-xl f-34">
                    ₹{Math.floor(pkg.price)}
                  </p>
                </div>
              </div>
            
              {/* Description & Features */}
              <div className="p-3 flex-grow">
                <ul className="text-sm pl-5">
                  {Array.isArray(pkg?.description) ? (
                    pkg.description.map((desc, i) => (
                      <li key={i} className="mb-2">{desc}</li>
                    ))
                  ) : (
                    <li className="mb-2">{pkg?.description || "No description available"}</li>
                  )}
                </ul>
              </div>
            
              {/* Participate Button Always at Bottom */}
              <div className="p-4 mt-auto">
                <button
                  onClick={() => handleParticipate(pkg)}
                  className={`py-4 px-5 rounded-3xl text-white w-full uppercase font-bold tracking-normal ${
                    isHighlighted ? "package-dark-btn" : "package-light-btn"
                  }`}
                >
                  Participate
                </button>
              </div>
            </div>
            
            );
          })}
        </div>
      </div>

      {/* Show Popup with selected package data */}
      {showPopup && selectedPackage && (
        <PoojaDatePopup
          pujaData={selectedPackage}
          date={detail}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default PoojaPackages;
