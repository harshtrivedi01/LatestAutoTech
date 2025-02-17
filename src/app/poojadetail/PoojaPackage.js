


import React from "react";
import PoojaDatePopup from "./PoojaDatePopup";
import { useEffect, useState } from "react";
import Image from "next/image";



const PoojaPackages = ({detail}) => {

  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="package p-60 bg-grey" id="Package-section">
    <div className="container">
      <h1 className="title">Select Pooja Package</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {detail?.puja_detail?.packages?.map((pkg, index) => {
          // Ensure the first package is always highlighted
          const isHighlighted = index === 0 || pkg.highlight;
  
          return (
            <div
              key={index}
              className={`border rounded-lg ${isHighlighted ? "border-3 p-2  bg-orange-100 border-orange-500 active-package" : "bg-white border-2 border-orange-600"}`}
            >
              <div className="flex gap-2 justify-between top-card rounded-t-3xl p-4 rounded-lg items-center">
              <div className="pack-img w-20 h-20 relative">
  <img
    src={pkg.image.replace(/([^:]\/)\/+/g, "$1") || "/images/poojaPackage/single.png"}
    alt={pkg.name}
    width={80}
    height={80}
    className="object-cover rounded-lg"
  />
</div>
                <div className="text-left">
                  <h2 className="text-lg font-bold mb-2 f-26">{pkg.name}</h2>
                  <h2 className="text-lg font-bold mb-2">Package for {pkg.no_of_member}  Person</h2>
                  <p className="font-bold text-red-600 text-xl f-34">₹{Math.floor(pkg.price)}</p>
                </div>
              </div>
  
              <div className="p-5 mt-4">
                <ul className="text-sm list-disc pl-5">
                  {Array.isArray(pkg?.description) ? (
                    pkg.description.map((desc, i) => <li key={i} className="mb-2">{desc}</li>)
                  ) : (
                    <li className="mb-2">{pkg?.description || "No description available"}</li>
                  )}
                </ul>
  
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowPopup(true)}
                    className={`py-4 px-5 rounded-lg text-white w-full uppercase font-bold tracking-normal ${isHighlighted ? "package-dark-btn" : "package-light-btn"}`}
                  >
                    Participate
                  </button>
                </div>
              </div>
  
              {showPopup && <PoojaDatePopup pujaData={detail} onClose={() => setShowPopup(false)} />}
            </div>
          );
        })}
      </div>
    </div>
  </div>
  
  );
};

export default PoojaPackages;
