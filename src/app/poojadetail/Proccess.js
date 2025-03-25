import React from "react";

const Proccess = () => {
  // Static benefits data
  const benefits = [
    {
      id: 1,
      title:"Select Puja",
      description: "Choose from puja packages listed below.",
    },
    {
      id: 2,
      title:"Add Offerings",
      description: "Enhance your puja experience with optional offerings like Kaal Bhairav Shringar Seva, Khappar Seva, Kashi Bhairav Aarti, Baba Adikaal Bhairav Panchamrit Abhishek, etc.",
    },
    {
      id: 3,
      title:"Provide Sankalp details",
      description: "Enter your Name and Gotra for the Sankalp.",
    },
    {
      id: 4,
      title:"Puja Day Updates",
      description: "Our experienced pandits perform the sacred puja. All Sri Mandir devotees' pujas will be conducted collectively on the day of the puja. You will receive real-time updates of the puja on your registered WhatsApp number.",
    },
    {
      id: 5,
      title:"Puja Video & Divine Aashirwad Box",
      description: "Get the puja video within 3-4 days on WhatsApp. Receive Divine Aashirwad Box delivered to your doorstep within 8-10 days.",
    },
  ];

  return (
    <div id="benefit-section mx-2">
      <div className="container max-w-7xl  my-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pooja Process</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-start">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="relative p-6 flex flex-col  text-start"
            >
              {/* Armor Style Number Icon */}
              <div className="absolute top-8 -left-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-10 text-orange-600"
                >
                  <path d="M12 2L2 7v6c0 5.52 3.87 10.74 10 13 6.13-2.26 10-7.48 10-13V7l-10-5zm0 17.2c-4.02-1.58-7-5.36-7-9.2V8.3l7-3.5 7 3.5v1.7c0 3.84-2.98 7.62-7 9.2z" />
                </svg>
                <span className="absolute text-black font-bold text-lg">
                  {index + 1}
                </span>
              </div>

              {/* Benefit Title */}
              <p className="text-black text-lg font-semibold mt-4 text-start flex justify-start">
                {benefit.title}
              </p>

              {/* Benefit Description */}
              <p className="text-gray-500 mt-2 text-start leading-6">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Proccess;
