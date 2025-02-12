"use client";

import React, { useState } from "react";

const Sankalp = () => {
  const [members, setMembers] = useState([
    { name: "", fatherName: "", gotra: "", email: "", address: "", sameAsAbove: false },
    { name: "", fatherName: "", gotra: "", sameAsAbove: false },
    { name: "", fatherName: "", gotra: "", sameAsAbove: false },
    { name: "", fatherName: "", gotra: "", sameAsAbove: false },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;

    if (field === "sameAsAbove" && value) {
      updatedMembers[index] = { ...members[index - 1] };
    }

    setMembers(updatedMembers);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Choose Shipping Address
      </h2>

      {members.map((member, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            {index === 0
              ? "First Member Detail"
              : `Member ${index + 1} Detail`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder={`${index === 0 ? "First" : `Member ${index + 1}`} member name`}
              value={member.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Enter Your Father Name"
              value={member.fatherName}
              onChange={(e) =>
                handleInputChange(index, "fatherName", e.target.value)
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Enter Your Gotra"
              value={member.gotra}
              onChange={(e) =>
                handleInputChange(index, "gotra", e.target.value)
              }
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            {index === 0 && (
              <>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={member.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  value={member.address}
                  onChange={(e) =>
                    handleInputChange(index, "address", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </>
            )}
          </div>

          {index > 0 && (
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id={`sameAsAbove-${index}`}
                checked={member.sameAsAbove}
                onChange={(e) =>
                  handleInputChange(index, "sameAsAbove", e.target.checked)
                }
                className="mr-2"
              />
              <label
                htmlFor={`sameAsAbove-${index}`}
                className="text-gray-700 text-sm"
              >
                Same As Above
              </label>
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <button className=" common-btn text-white py-2 px-6 rounded-md font-semibold  ">
          Save
        </button>
        <button className="bg-red-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-400 transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Sankalp;
