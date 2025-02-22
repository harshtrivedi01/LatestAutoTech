"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Sankalp = ({ handleNextStep }) => {
  const [defaultFields, setDefaultFields] = useState({
    name: "",
    father_name: "",
    gotra: "",
    email: "",
    address: "",
  });

  const memberLimit = parseInt(localStorage.getItem("membernumber") || "1", 10);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (memberLimit > 0) {
      setMembers(Array(memberLimit-1).fill({ name: "", fatherName: "", gotra: "" }));
    }
  }, [memberLimit]);

  const handleDefaultChange = (field, value) => {
    setDefaultFields({ ...defaultFields, [field]: value });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const submitForm = async () => {
    if (!defaultFields.name || !defaultFields.father_name || !defaultFields.gotra || !defaultFields.email || !defaultFields.address) {
      toast.error("All default fields are required!");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("type", "store_pooja_member");
      formData.append("booking_id", localStorage.getItem("bookingID"));
      formData.append("name", defaultFields.name);
      formData.append("father_name", defaultFields.father_name);
      formData.append("gotra", defaultFields.gotra);
      formData.append("email", defaultFields.email);
      formData.append("address", defaultFields.address);

      members.forEach((member) => {
        formData.append("member_name[]", member.name);
        formData.append("member_father_name[]", member.fatherName);
        formData.append("member_gotra[]", member.gotra);
      });

      const response = await axios.post("https://dakshhousing.com/satsambhav/websiteapi/puja", formData, {
        headers: {
          "language": "en",
          "userId": "2",
          "user_type": "user",
          "Device_id": "upen",
          "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
          "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
          "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
          "web_token": localStorage.getItem("authToken"),
        },
      });

      if (response.data.status === "1") {
        toast.success("Data saved successfully!");
        handleNextStep();
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit data!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Name of Members Participating In Pooja</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(defaultFields).map((field, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={field.replace("_", " ")}
            value={defaultFields[field]}
            onChange={(e) => handleDefaultChange(field, e.target.value)}
            className="border text-sm border-gray-300 p-3 rounded-xl shadow-xl w-full"
            required
          />
        ))}
      </div>

      {members.map((member, index) => (
        <div key={index} className="mb-6 pb-5 border-b-2 border-gray-300">
          <h3 className="text-lg font-bold text-gray-700 mb-2">{index + 1} Member Detail</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter Member Name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              className="border text-sm border-gray-300 p-3 rounded-xl shadow-xl w-full"
            />
            <input
              type="text"
              placeholder=" Enter Father's Name"
              value={member.fatherName}
              onChange={(e) => handleMemberChange(index, "fatherName", e.target.value)}
              className="border text-sm border-gray-300 p-3 rounded-xl shadow-xl w-full"
            />
            <input
              type="text"
              placeholder="Enter Gotra"
              value={member.gotra}
              onChange={(e) => handleMemberChange(index, "gotra", e.target.value)}
              className="border text-sm border-gray-300 p-3 rounded-xl shadow-xl w-full"
            />
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-[#BA1A1A] text-white rounded-lg shadow-2xl hover:bg-green-700 transition"
          onClick={submitForm}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default Sankalp;
