import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const pandits = Array(3).fill({
  name: "Mr. Prem Prakash",
  location: "Jaipur",
  speciality: "Ganesh Poojan",
  experience: "3 Years",
  language: "English",
  rating: 5,
  reviews: 135,
  image: "/images/logo.png", // Replace with actual image URL
});

const PanditCard = ({ pandit }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow-md rounded-xl p-2 border border-gray-200 w-full max-w-sm mx-auto flex flex-col items-center">
        <Link href={`/chadhavadetail/4`}>
      {/* Image Section */}
      <div className="w-full flex justify-center">
        <img
          src={pandit.image}
          alt="Pandit Ji"
          className="w-40 h-40 rounded-lg object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-800">
          Ganaga Mata Temple
        </h5>
        <p className="border-b-2 border-[#BA1A1A] w-20 mx-auto my-2"></p>
        <p className="mb-3 text-gray-700 text-base">
          Reducing mental agitation and enhancing clarity of thought. Brings balance and...
        </p>

        {/* Book Now Button */}
      
          <button className="block w-full uppercase p-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
            {t("BookNow")}
          </button>
       
      </div>
      </Link>
    </div>
  );
};

const List = () => {
  return (
    <div className=" py-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {pandits.map((pandit, index) => (
          <PanditCard key={index} pandit={pandit} />
        ))}
      </div>
    </div>
  );
};

export default List;
