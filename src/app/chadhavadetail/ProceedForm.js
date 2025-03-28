import React, { useState } from "react";

const ProceedForm = ({ handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({ name: "", gotra: "" });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFormData({ ...formData, gotra: !isChecked ? "Kashyap" : "" });

    // Clear error if checkbox is checked
    if (!isChecked) setErrors({ ...errors, gotra: "" });
  };

  const validateForm = () => {
    let newErrors = {};
  
    // Regular expression to allow only alphabets (both uppercase and lowercase) and spaces
    const alphabetRegex = /^[A-Za-z\s]+$/;
  
    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (!alphabetRegex.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed!";
    }
  
    if (!formData.gotra.trim()) {
      newErrors.gotra = "Gotra is required!";
    } else if (!alphabetRegex.test(formData.gotra)) {
      newErrors.gotra = "Only alphabets are allowed!";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit(formData); // Send form data
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      
    <div className="bg-orange-50 relative p-6 rounded-2xl shadow-lg ">
    <button
    className=" absolute -top-5 -right-4  px-4 py-2 bg-red-700 text-white rounded-full"
    onClick={handleClose}
  >
    X
  </button>
      <h2 className="text-xl font-semibold text-start">Sankalp Form</h2>
      <p className="text-xs text-gray-600 text-start mb-4">
        Chadhava will be offered by the name provided below
      </p>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) => {
            if (/^[A-Za-z\s]*$/.test(e.target.value)) {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: "" });
            }
          }}
          className="w-full px-3 py-2 border rounded-lg mt-1"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Gotra Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Gotra</label>
        <input
          type="text"
          name="gotra"
          placeholder="Enter Gotra"
          value={formData.gotra}
          onChange={(e) => {
            if (/^[A-Za-z\s]*$/.test(e.target.value)) {
              setFormData({ ...formData, gotra: e.target.value });
              setErrors({ ...errors, gotra: "" });
            }
          }}
          disabled={isChecked}
          className="w-full px-3 py-2 border rounded-lg mt-1 disabled:bg-gray-100"
        />
        {errors.gotra && <p className="text-red-500 text-sm mt-1">{errors.gotra}</p>}
      </div>

      {/* Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm text-gray-700">I don't know my Gotra</label>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-between gap-4">

  <button
    className="w-full sm:w-auto px-6 sm:px-10 md:px-16 py-2 bg-orange-500 text-white rounded-full"
    onClick={handleSubmit}
  >
    Submit & Pay
  </button>
</div>

    </div>
  </div>
  );
};

export default ProceedForm;
