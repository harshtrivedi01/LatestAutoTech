"use client";
import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import Faq from "../poojadetail/Faq";
import api from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const JoinUs = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "101",
    state: "",
    city: "",
    speciality: "",
    address: "",
    description: "",
    reference: "",
    remark: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state) fetchCities(formData.state);
  }, [formData.state]);

  const fetchStates = async () => {
    try {
      let data = new FormData();
      data.append("type", "state_list");
      data.append("country_id", "101"); // India
      const response = await api.post("/address", data);
      setStates(response.data.data?.states || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      let data = new FormData();
      data.append("type", "city_list");
      data.append("state_id", stateId);
      const response = await api.post("/address", data);
      setCities(response.data.data?.cities || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const validate = () => {
    let newErrors = {};
  
    if (!formData.name.trim()) {
      newErrors.name = ` ${t("Nameisrequired")}`;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed in the name";
    }
    
    
    if (!formData.email.trim()) {
      newErrors.email = ` ${t("Emailisrequired")}`;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
  
    if (!formData.mobile.trim()) {
      newErrors.mobile =  ` ${t("Mobilenumberisrequired")}`;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
  
    if (!formData.state) newErrors.state =` ${t("Stateisrequired")}`;
    if (!formData.city) newErrors.city = ` ${t("Mobilenumberisrequired")}`;
    if (!formData.speciality.trim()) newErrors.speciality = ` ${t("Specialityisrequired")}`;
    if (!formData.address.trim()) newErrors.address = ` ${t("Addressisrequired")}`;
    if (!formData.description.trim()) newErrors.description = ` ${t("Descriptionisrequired")}`;
    if (!formData.reference.trim()) newErrors.reference = ` ${t("Referenceisrequired")}`;
    if (!formData.remark.trim()) newErrors.remark = ` ${t("Remarkisrequired")}`;
  
    // Image validation (optional)
    if (!formData.image) {
      newErrors.image = ` ${t("Imageisrequired")}`;
    } else if (!(formData.image.type.startsWith("image/"))) {
      newErrors.image = ` ${t("Onlyimagefilesareallowed")}`;
    }
  
    return newErrors;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const form = new FormData();
    form.append("type", "submit_joinus_form");
    form.append("pandit_name", formData.name);
    form.append("pandit_email", formData.email);
    form.append("pandit_phone_no", formData.mobile);
    form.append("pandit_country", formData.country);
    form.append("pandit_state", formData.state);
    form.append("pandit_city", formData.city);
    form.append("speciality", formData.speciality);
    form.append("pandit_address", formData.address);
    form.append("pandit_description", formData.description);
    form.append("reference", formData.reference);
    form.append("remark", formData.remark);
    
    if (formData.image) {
      form.append("pandit_image", formData.image);
    }
  
    try {
      const response = await api.post("/joinus", form);
      console.log("Response:", response.data);
  
      if (response.data.status === "1") {
        toast.success(response.data.message || "Form submitted successfully!");
        setErrors("")
        setFormData({
          name: "",
          email: "",
          mobile: "",
          country: "101",
          state: "",
          city: "",
          speciality: "",
          address: "",
          description: "",
          reference: "",
          remark: "",
          image: null,
        });
        document.getElementById("file-input").value = ""; // Reset file input field
      } else {
        toast.error(response.data.message || "Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };
  

  return (
    <div className="">
       <Toaster position="top-center" reverseOrder={false} />
      <div className=" bg-[#FFEEE2] p-10">
        <h2 className="container max-w-7xl  mx-auto text-3xl font-bold">{t("PanditRegistration")}</h2>
      </div>

      <section className="  bg-gray-100 py-8 px-4">
  <div className="container max-w-7xl  mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#E5644E] pb-5 text-start">
     {t("Register")}
    </h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {[
  { label: `${t("Name")}`, name: "name", type: "text" },
  { label: `${t("Email")}`, name: "email", type: "email" },
  { label: `${t("Phonenumber")}`, name: "mobile", type: "text" },
  { label: `${t("Speciality")}`, name: "speciality", type: "text" },
  { label: `${t("Address")}`, name: "address", type: "text" },
  { label: `${t("Description")}`, name: "description", type: "text" },
  { label: `${t("Reference")}`, name: "reference", type: "text" },
  { label: `${t("Remark")}`, name: "remark", type: "text" },
].map(({ label, name, type }) => (
  <div key={name}>
    <label className="block text-sm text-[#E5644E] pb-1">{label} *</label>
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={(e) => {
        let regex;
        if (name === "name" || name === "speciality" || name === "description" || name === "remark") {
          regex = /^[A-Za-z ]*$/; // Only letters and spaces
        } else if (name === "mobile") {
          regex = /^[0-9]*$/; // Only numbers
        } else if (name === "address") {
          regex = /^[A-Za-z0-9 \-\/\.\(\)]*$/; // Letters, numbers, spaces, and (- / . ( ))
        } else if (name === "reference") {
          regex = /^[A-Za-z0-9 ]*$/; // Letters, numbers, and spaces
        }

        // Skip regex filtering for email to allow typing
        if (name !== "email" && regex && !regex.test(e.target.value)) return;

        handleChange(e);
      }}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5644E]"
    />
    {errors[name] && <p className="text-red-700 text-xs">{errors[name]}</p>}
  </div>
))}



      <div>
        <label className="block text-sm text-[#E5644E] pb-1">{t("Country")} *</label>
        <input
          type="text"
          value={t("india")}
          disabled
          className="w-full px-4 py-2 border rounded-lg bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm text-[#E5644E] pb-1">{t("State")} *</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5644E]"
        >
          <option value="">{t("SelectState")}</option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_title}
            </option>
          ))}
        </select>
        {errors.state && <p className="text-red-700 text-xs">{errors.state}</p>}
      </div>

      <div>
        <label className="block text-sm text-[#E5644E] pb-1">{t("City")} *</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5644E]"
        >
          <option value="">{t("SelectCity")}</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_title}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-700 text-xs">{errors.city}</p>}
      </div>

      <div>
        <label className="block text-sm text-[#E5644E] pb-1">{t("UploadImage")} *</label>
        <input
  id="file-input"
  type="file"
  name="image"
  accept="image/*" // Restricts file selection to images only
  capture="environment" // Opens the camera for taking a photo (back camera)
  onChange={handleFileChange}
  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5644E]"
/>

        {errors.image && <p className="text-red-700 text-xs">{errors.image}</p>}
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#E5644E] text-white px-6 py-2 rounded-lg hover:bg-[#d14f3b] transition"
        >
        {t("submit")}
        </button>
      </div>
    </form>
  </div>
</section>

      <Faq />
    </div>
  );
};

export default JoinUs;
