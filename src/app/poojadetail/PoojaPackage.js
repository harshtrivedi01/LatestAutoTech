import React from "react";
import PoojaDatePopup from "./PoojaDatePopup";
import { useEffect, useState } from "react";



const PoojaPackages = () => {
  const packages = [
    {
      title: "Individual Pooja",
      price: "₹851",
      personimg: "images/poojaPackage/single.png",
      person: "Package for 1 Person",
      description: [
        "Pandit Ji will call out your name and gotra during the Pooja sankalpa, along with the names of other Pooja participants.",
        "Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.",
        "Upon completion, a video of your Pooja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days."
      ],
    },
    {
      title: "Couple Pooja",
      price: "₹1000",
      personimg:"images/poojaPackage/couple.png",
      person: "Package for 2 Person",
      description: [
        "Pandit Ji will call out your name and gotra during the Pooja sankalpa, along with the names of other Pooja participants.",
        "Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.",
        "Upon completion, a video of your Pooja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days."
      ],
    },
    {
      title: "Family + Bhog",
      price: "₹2000",
      personimg: "images/poojaPackage/family.png",
      person: "Package for 4 Person",
      highlight: true,
      description: [
        "Pandit Ji will call out your name and gotra during the Pooja sankalpa, along with the names of other Pooja participants.",
        "Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.",
        "Upon completion, a video of your Pooja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days."
      ],
    },
    {
      title: "Joint Family",
      price: "₹4000",
      personimg: "images/poojaPackage/jointFamily.png",
      person: "Package for 6 Person",
      description: [
        "Pandit Ji will call out your name and gotra during the Pooja sankalpa, along with the names of other Pooja participants.",
        "Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.",
        "Upon completion, a video of your Pooja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days."
      ],
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="package p-60 bg-grey" id="Package-section">
      <div className="container">
        <h1 className="title ">Select Pooja Package</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={` border rounded-lg border-orange-600 ${pkg.highlight ? "border-3 bg-orange-100 border-orange-500 active-package" : "bg-white border-1"}`}
            >
              <div className="flex gap-2 justify-content-between top-card p-4 rounded-lg align-items-center">
                <div className="pack-img">
               <img  src={pkg.personimg} height="100%" width="100%" />
                </div>
                <div className="text-left">
                <h2 className="text-lg font-bold  mb-2 f-26">{pkg.title}</h2>
              <h2 className="text-lg font-bold  mb-2">{pkg.person}</h2>
              <p className=" font-bold red f-28 text-xl f-34">{pkg.price}</p>
                </div>
           
              </div>
<div className="p-5 mt-4">

              <ul className=" text-sm list-disc">
                {pkg.description.map((desc, i) => (
                  <li key={i} className="mb-2 list">{desc}</li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <button
                 onClick={() => setShowPopup(true)}
                  className={`py-4 px-5 rounded-lg text-white w-full uppercase font-bold tracking-normal ${pkg.highlight ? " package-dark-btn" : "package-light-btn"}`}
                >
                  Participate
                </button>
                 
              </div>
</div>

{showPopup && <PoojaDatePopup onClose={() => setShowPopup(false)} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoojaPackages;
