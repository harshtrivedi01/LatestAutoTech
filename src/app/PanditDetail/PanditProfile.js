import React from "react";

const PanditProfile = () => {
  return (
    <div className="p-60">

    <div className="container">
      <div className="flex items-center space-x-6">
        <img
          src="./images/pandit.png"
          alt="Pandit Ji"
          className=" rounded-lg object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-xl font-bold">Mr. Prem Prakash <span className="text-gray-500">(Jaipur)</span></h2>
          <div className="flex items-center space-x-2 text-yellow-500">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600 text-sm">(135) | Exp: 10 Years</span>
          </div>
          <p className="text-gray-700 mt-1">English</p>
          <p className="text-red-500 text-lg font-semibold">Booking Fees - Rs.3000/-</p>
          <div className="flex space-x-4 mt-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Book Pooja</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Q&A</button>
          </div>
          <button className="border border-gray-400 px-4 py-2 rounded-lg mt-2">Previous Chat</button>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Specialization</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Career & Job", "Cheating & Affair", "Career & Job", "Career & Job", "Career & Job", "Hawan", "Career & Job"].map((item, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{item}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">About My Service</h3>
        <p className="text-gray-700 mt-1">
          Pandit ji is known for his expertise in performing Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of Vedic rituals and mantras and has over 20 years of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles.
        </p>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Experience & Qualification</h3>
        <p className="text-gray-700 mt-1">
          Pandit ji is known for his expertise in performing Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of Vedic rituals and mantras and has over 20 years of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles.
        </p>
      </div>
    </div>
    </div>
  );
};

export default PanditProfile;
