import React, { useState, useEffect } from "react";
import PoojaDatePopup from "./PoojaDatePopup";

const PoojaPackages = ({ detail }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState({}); // Track expanded state per package

  useEffect(() => {
    if (detail?.packages?.length > 0) {
      setSelectedPackage(detail.packages[0]);
    }
  }, [detail]);

  const handleParticipate = (pkg) => {
    setSelectedPackage(pkg);
    setShowPopup(true);
  };

  const toggleReadMore = (pkgId) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId],
    }));
  };

  const wordLimit = 20; // Adjust the word limit as needed

  return (
    <div className="package p-60 bg-grey" id="Package-section">
      <div className="container px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 mx-auto">
        <h1 className="title text-black my-5">Select Pooja Package</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 xl:space-y-4 mb-5">
          {detail.packages?.map((pkg) => {
            const isHighlighted = selectedPackage?.id === pkg.id;
            const isExpanded = expandedPackages[pkg.id] || false;

            // Ensure description is treated as an array
            const descriptions = Array.isArray(pkg.description) ? pkg.description : [pkg.description];

            return (
              <div
                key={pkg.id}
                className={`border  text-black rounded-lg cursor-pointer flex flex-col h-full ${
                  isHighlighted
                    ? "border-1 p-1 bg-orange-100 border-orange-500 active-package  mb-5"
                    : "bg-white border-2 border-orange-600"
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {/* Package Header */}
                <div className="flex gap-2 justify-between top-card rounded-t-3xl p-2 rounded-lg items-center">
                <div className="pack-img w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 lg:w-56 lg:h-32 aspect-[4/3]">
                    <img
                      src={pkg.image.replace(/([^:]\/)\/+/g, "$1") || "/images/logo.png"}
                      alt={pkg.name}
                      width={160}
                      height={96}
                      onError={(e) => (e.target.src = "/images/logo.png")}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="text-left ">
                    {pkg.tag && (
                      <div className="bg-gradient-to-r from-[#E89528] via-[#F1C644] to-[#FFFFFF] me-4  -4 p-0.5 ps-3 md:flex text-white uppercase text-[10px] items-center gap-1 rounded-full">
                        {pkg.tag} <img src="/images/dimond.png" className="lg:h-5 " />
                      </div>
                    )}
<h2 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold mb-1">
  {pkg.name}
</h2>
<h2 className="text-sm sm:text-lg md:text-xl lg:text-xl font-bold mb-1">
  Package for {pkg.no_of_member} Person
</h2>
<p className="font-bold text-red-600 text-lg sm:text-xl md:text-xl lg:text-2xl">
  ₹{Math.floor(pkg.price)}
</p>

                  </div>
                </div>

                {/* Description with Read More / Read Less */}
                <div className="p-3 flex-grow">
                  <ul className="text-sm text-start pl-2">
                    {descriptions.map((desc, i) => {
                      const words = desc?.split(" ") || [];
                      const shouldTruncate = words.length > wordLimit;
                      const displayedText = shouldTruncate && !isExpanded
                        ? words.slice(0, wordLimit).join(" ") + "..."
                        : desc;

                      return (
                        <li key={i} className="mb-2">
                          {displayedText}
                          {shouldTruncate && (
                            <button
                              className="text-black text-sm underline "
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent accidental package selection
                                toggleReadMore(pkg.id);
                              }}
                            >
                              {isExpanded ? "Read Less" : "Read More"}
                            </button>
                          )}
                        </li>
                      );
                    })}
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
        <PoojaDatePopup pujaData={selectedPackage} date={detail} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default PoojaPackages;
