import React, { useState, useEffect } from "react";
import PoojaDatePopup from "./PoojaDatePopup";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";

const PoojaPackages = ({ detail }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState({}); // Track expanded state per package
  const router = useRouter(); // Initialize useRouter
   const pathname = usePathname();
  useEffect(() => {
    if (detail?.packages?.length > 0) {
      setSelectedPackage(detail.packages[0]);
    }
  }, [detail]);

  const handleParticipate = (pkg) => {
    const isLoggedIn = localStorage.getItem("authToken"); // Check if user is logged in

    if (!isLoggedIn) {
      localStorage.setItem("redirectPath", pathname);
      router.push("/login"); // Redirect to login page
      return;
    }

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
    <div className="package  bg-grey" id="Package-section">
   <div className=" container max-w-7xl mx-auto lg:py-40 min ">
        <h1 className="title text-black my-5">  {t("SelectPoojapackage")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 mb-5">
  {detail.packages?.map((pkg) => {
    const isHighlighted = selectedPackage?.id === pkg.id;
    const isExpanded = expandedPackages[pkg.id] || false;
    const descriptions = Array.isArray(pkg.description) ? pkg.description : [pkg.description];

    return (
      <div
  key={pkg.id}
  className={`border text-black rounded-lg cursor-pointer flex flex-col h-full transition-all duration-300 ease-in-out transform ${
    isHighlighted
      ? "border-1 p-1 bg-orange-100 border-orange-500 active-package  mb-5"
                    : "bg-white border-2 border-orange-600"
  }`}
  onClick={() => setSelectedPackage(pkg)}
>

        {/* Header */}
        <div className="flex flex-col sm:flex-rol gap-3 sm:gap-4 bg-linear-to-t from-[#FFFFFF] to-[#FFE1CE] bg-[#FFE1CE] rounded-t-2xl items-center sm:items-center justify-center p-3">
          <div className="flex justify-center w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-40 lg:w-52 lg:h-32">
            <img
              src={pkg.image.replace(/([^:]\/)\/+/g, "$1") || "/images/logo.png"}
              alt={pkg.name}
              width={160}
              height={96}
              onError={(e) => (e.target.src = "/images/logo.png")}
              className="object-contain  rounded-lg"
            />
          </div>
          <div className="text-center flex-1">
            {pkg.tag && (
              <div className="bg-gradient-to-r from-[#E89528] via-[#F1C644] to-[#FFFFFF] inline-flex items-center gap-1 px-2 py-1 rounded-full text-white uppercase text-[8px] sm:text-[8px] md:text-[8px] mb-1">
                {pkg.tag}
                <img src="/images/dimond.png" className="h-4 sm:h-5 lg:h-4" alt="Diamond" />
              </div>
            )}
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 text-black">{pkg.name}</h2>
            <h2 className="text-sm sm:text-base md:text-lg font-medium mb-1 text-black">
              {t("Packagefor1Person")} {pkg.no_of_member} {t("Person")}
            </h2>
            <p className="text-red-600 text-lg text-black sm:text-xl md:text-2xl font-bold">
              ₹{Math.floor(pkg.price)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pt-2 pb-2">
          <ul className="text-sm pl-3 list-discc space-y-1">
            {descriptions.map((desc, i) => {
              const words = desc?.split(" ") || [];
              const shouldTruncate = words.length > wordLimit;
              const displayedText =
                shouldTruncate && !isExpanded
                  ? words.slice(0, wordLimit).join(" ") + "..."
                  : desc;

              return (
                <li key={i}>
                  {displayedText}
                  {shouldTruncate && (
                    <button
                      className="text-black font-bold text-xs underline ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadMore(pkg.id);
                      }}
                    >
                      {isExpanded ? t("ReadLess") : t("ReadMore")}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

      
<div className="p-4 mt-auto">
  <button
    onClick={() => handleParticipate(pkg)}
    className={`w-full py-3 px-4 text-sm sm:text-base rounded-2xl text-white font-semibold uppercase tracking-wide ${
      isHighlighted ? "package-dark-btn" : "package-light-btn"
    }`}
  >
    {t("PARTICIPATE")}
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
