import React from "react";

const pandits = Array(10).fill({
  name: "Mr. Prem Prakash",
  location: "Jaipur",
  speciality: "Ganesh Poojan",
  experience: "3 Years",
  language: "English",
  rating: 5,
  reviews: 135,
  image: "/images/panditji.png", // Replace with actual image URL
});

const PanditCard = ({ pandit }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 w-full max-w-sm">
      <div className="flex items-center">
        <img
          src={pandit.image}
          alt="Pandit Ji"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {pandit.name} <span className="text-gray-500">({pandit.location})</span>
          </h3>
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            {"★".repeat(pandit.rating)}
            <span className="text-gray-500 text-xs ml-1">({pandit.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm">
        <p><span className="font-semibold">Speciality:</span> {pandit.speciality}</p>
        <p><span className="font-semibold">Experience:</span> {pandit.experience}</p>
        <p><span className="font-semibold">Language:</span> {pandit.language}</p>
      </div>

      <div className="mt-4 flex justify-between gap-3">
        <button className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
          Book Now
        </button>
        <button className="border w-full border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100">
          Ask Question
        </button>
      </div>
    </div>
  );
};

const List = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Book Your Pandit Ji</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pandits.map((pandit, index) => (
          <PanditCard key={index} pandit={pandit} />
        ))}
      </div>
    </div>
  );
};

export default List;
