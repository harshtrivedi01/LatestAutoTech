import React from "react";

const TabTwo = () => {
  const data2 = [
    {
      image: "/images/logo.png",
      title: "Monthly Prayer Subscription",
      description: "A monthly prayer offering for blessings.",
      price: "199.00",
      button: "Subscribe",
    },
    {
      image: "/images/logo.png",
      title: "Annual Grand Ritual",
      description: "A yearly grand offering for divine blessings.",
      price: "999.00",
      button: "Offer",
    },
  ];

  return (
    <div className="grid gap-4">
             <h3 className="text-lg font-semibold text-center">Choose an Subscription</h3>
      {data2.map((item, index) => (
        <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
          <img
            src={item.image}
            alt={item.title}
            className="w-40 h-40 border-2 border-orange-400 object-contain p-3 rounded-lg"
          />
          <div className="ml-4 space-y-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-lg text-orange-600">Rs. {item.price}/-</p>
            <button className="text-sm text-white bg-green-600 px-4 py-2 mt-5 rounded-lg shadow-2xl font-semibold">
              {item.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabTwo;
