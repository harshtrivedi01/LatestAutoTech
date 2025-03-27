import React, { useState, useEffect } from "react";
import PoojaDatePopup from "./PoojaDatePopup";
import LoginPopup from "./LoginPopup"; // Import LoginPopup component
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const PoojaPackages = ({ detail }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    if (detail?.packages?.length > 0) {
      setSelectedPackage(detail.packages[0]);
    }
  }, [detail]);

  const handleParticipate = (pkg) => {
    const isLoggedIn = localStorage.getItem("authToken");

    if (!isLoggedIn) {
      localStorage.setItem("redirectPath", pathname);
      setShowLoginPopup(true); // Open login popup
      return;
    }

    setSelectedPackage(pkg);
    setShowPopup(true);
  };

  return (
    <div className="package z-40 bg-grey" id="Package-section">
      <div className="container max-w-7xl mx-auto lg:py-40">
        <h1 className="title text-black my-5">{t("SelectPoojapackage")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 mb-5">
          {detail.packages?.map((pkg) => (
            <div key={pkg.id} className="border text-black rounded-lg bg-white">
              <div className="p-4">
                <h2 className="text-lg font-bold">{pkg.name}</h2>
                <p>₹{pkg.price}</p>
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleParticipate(pkg)}
                  className="w-full py-3 px-4 text-white bg-orange-600 rounded-lg"
                >
                  {t("PARTICIPATE")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedPackage && (
        <PoojaDatePopup pujaData={selectedPackage} date={detail} onClose={() => setShowPopup(false)} />
      )}

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
};

export default PoojaPackages;
