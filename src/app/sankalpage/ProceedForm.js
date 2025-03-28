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
    setFormData({ ...formData, gotra: !isChecked ? "Kahsp" : "" });

    // Clear error if checkbox is checked
    if (!isChecked) setErrors({ ...errors, gotra: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.gotra.trim()) newErrors.gotra = "Gotra is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit(formData); // Send form data
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center mb-4">Enter Your Details</h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg mb-1"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        {/* Gotra Input */}
        <input
          type="text"
          name="gotra"
          placeholder="Enter Gotra"
          value={formData.gotra}
          onChange={handleChange}
          disabled={isChecked} // Disable if checkbox is checked
          className="w-full px-3 py-2 border rounded-lg mb-1"
        />
        {errors.gotra && <p className="text-red-500 text-sm mb-2">{errors.gotra}</p>}

        {/* Checkbox */}
        <div className="flex items-center mb-3">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="mr-2" />
          <label className="text-sm text-gray-700">Use "Kahsp" as Gotra</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedForm;
