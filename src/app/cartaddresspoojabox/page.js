"use client"

import axios from "axios";
import { CheckIcon, ChevronLeft, ChevronRight, EditIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import api from "../lib/axiosInstance";
import { useRouter } from "next/navigation";
import SliderTwo from "../poojaboxdetail/SliderTwo";
import { useTranslation } from "react-i18next";

export default function Address() {
  const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);
    
      useEffect(() => {
        setIsClient(true);
      }, []);
  const router = useRouter();
  const [pujaData, setPujaData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const sliderRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    type: "add_address",
    address_id: "", // For update
    phone_no: "",
    name: "",
    email: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pincode: "",
    address: "",
  });
  const [phoneError, setPhoneError] = useState("");

const handlePhoneChange = (e) => {
  const value = e.target.value;

  // Allow only numbers
  if (!/^\d*$/.test(value)) {
    return;
  }

  // Update state
  setFormData({ ...formData, phone_no: value });

  // Validate length
  if (value.length !== 10 && value.length > 0) {
    setPhoneError("Phone number must be exactly 10 digits.");
  } else {
    setPhoneError("");
  }
};

const validateForm = () => {
  let errors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name =`${t("Nameisrequired")}`;
  } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
    errors.name = `${t("Enteravalidname")}`;
  }

  // Phone number validation
  if (!formData.phone_no) {
    errors.phone_no = `${t("Mobilenumberisrequired")}`;
  } else if (!/^[0-9]{10}$/.test(formData.phone_no)) {
    errors.phone_no = `${t("Pleaseenteravaliddigitphonenumber")}`;
  }

  // Email validation
  if (!formData.email) {
    errors.email =`${t("Emailisrequired")}`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = `${t("Enteravalidemail")}`;
  }

  // Country, state, city validation
  if (!formData.country_id) errors.country_id = `${t("Countryisrequired")}`;
  if (!formData.state_id) errors.state_id = `${t("Stateisrequired")}`;
  if (!formData.city_id) errors.city_id = `${t("Cityisrequired")}`;

  // Pincode validation
  if (!formData.pincode) {
    errors.pincode =`${t("Pincodeisrequired")}`;
  } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
    errors.pincode = `${t("Enteravalid6digitpincode")}`;
  }

  // Address validation
  if (!formData.address.trim()) {
    errors.address = `${t("Addressisrequired")}`;
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


  useEffect(() => {
    fetchPujaData();
    fetchCountries();
  }, []);
  
  useEffect(() => {
    if (formData.country_id) fetchStates(formData.country_id);
  }, [formData.country_id]);
  
  useEffect(() => {
    if (formData.state_id) fetchCities(formData.state_id);
  }, [formData.state_id]);
  
  useEffect(() => {
    if (pujaData?.address_list?.length > 0) {
      const defaultAddress = pujaData.address_list.find(
        (address) => address.set_default === "1"
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
        setIsButtonDisabled(false); // Enable the button if a default address exists
      }
    }
  }, [pujaData]);
  
  
  
  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    setIsButtonDisabled(false); // Enable the button when any address is selected
  };
  
  

  // Redirect to next step
  const handleNextStep = () => {
    if (selectedAddress) {
    //   router.push(`/next-step?addressId=${selectedAddress}`); // Update with actual next page route
    router.push(`/cartpaymentpoojabox?addressId=${selectedAddress}`); 
    }
  };

  const sendAddressToComponent = (addressId) => {
    console.log("Selected Address ID:", addressId);
    handleNextStep();
    return <Sankalp sendAddress={sendAddressToComponent} />;
  };
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fill the correct data before submitting.");
      return;
    }
  
    try {
      let formPayload = new FormData();
      Object.keys(formData).forEach((key) => formPayload.append(key, formData[key]));
  
      formPayload.set("type", "update_address"); // Ensure update type is correct
      formPayload.set("address_id", formData.address_id); // Ensure address ID is included
  
      const response = await api.post("/address", formPayload);
  
      if (response.data.status === 0) {
        toast.error(response.data.message || "Failed to update address.");
        return;
      }
  
      toast.success("Address updated successfully!");
      console.log("Address Update Response:", response.data);
  
      await fetchPujaData(); // Ensure data refresh before hiding form
      setShowForm(false); 
  
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  
  
  const handleEditClick = (address) => {
    setShowForm(true); // Show the form
    setFormData({
      type: "update_address",
      address_id: address.id, // Set the ID for updating
      phone_no: address.phone_no,
      name: address.name,
      email: address.email,
      country_id: address.country_id,
      state_id: address.state_id,
      city_id: address.city_id,
      pincode: address.pincode,
      address: address.address,
    });
  
    fetchStates(address.country_id); // Load states
    fetchCities(address.state_id); // Load cities
  };
  
  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "address_list");
      const response = await api.post("/address", formData);
      setPujaData(response.data.data);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "country_list");
  
      const response = await api.post("/address", formData);
      const countryList = response.data.data?.country_list || [];
    const indiaOnly = countryList.filter(country => country.id === 101);
    
    setCountries(indiaOnly);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]); // Set empty array to prevent map error
    }
  };
   
  const fetchStates = async (country_id) => {
    try {
      let formData = new FormData();
      formData.append("type", "state_list");
      formData.append("country_id", country_id);
      const response = await api.post("/address", formData);
      setStates(response.data.data?.states || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  
  const fetchCities = async (stateId) => {
    try {
      let formData = new FormData();
      formData.append("type", "city_list");
      formData.append("state_id", stateId);
      const response = await api.post("/address", formData);   
      setCities(response.data.data?.cities || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fill the correct data before submitting.");
      return;
    }
  
    try {
      let formPayload = new FormData();
      Object.keys(formData).forEach((key) => formPayload.append(key, formData[key]));
      formPayload.set("type", "add_address"); // Ensure type is set correctly
  
      const response = await api.post("/address", formPayload);
  
      if (response.data.status === 0) {
        toast.error(response.data.message || "Failed to add address.");
        return;
      }
  
      toast.success("Address added successfully!");
      console.log("Address Added Response:", response.data);
  
      await fetchPujaData(); // Ensure the latest data is fetched before hiding the form
      setShowForm(false); 
  
      // Reset form
      setFormData({
        type: "add_address",
        phone_no: "",
        name: "",
        email: "",
        country_id: "",
        state_id: "",
        city_id: "",
        pincode: "",
        address: "",
      });
  
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "country_id") {
      setStates([]); // Clear states before fetching
      setCities([]); // Clear cities before fetching
      fetchStates(value);
    } else if (name === "state_id") {
      setCities([]); // Clear cities before fetching
      fetchCities(value);
    }
  };
  
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // Large screens (Desktops & Laptops)
        settings: {
          slidesToShow: 2, // Show 2 cards at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Medium screens (Tablets)
        settings: {
          slidesToShow: 2, // Show 2 cards at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens (Mobile Landscape)
        settings: {
          slidesToShow: 1.5, // Show 1.5 cards to give a preview of the next card
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Extra small screens (Mobile Portrait)
        settings: {
          slidesToShow: 1, // Show only 1 card at a time
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <>
     <h1 className="f-34 mb-2 m-5 font-semibold text-lg md:mx-10 lg:mx-20 xl:mx-40 my-10">{t("ShoppingCart")} </h1>
     <div className="flex flex-col m-5 lg:mx-40 md:flex-row items-center bg-orange-100 rounded-2xl cart  px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40  justify-center p-8 md:p-30 mb-4">
      <div className="flex items-center  md:mb-0">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
          <span className="font-bold">1</span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("BookingReviewbooking")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-700">Review booking</span> */}
        </p>
      </div>
      <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

      <div className="flex items-center">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <span className="font-bold">2</span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("AddAddressSelectadeliveryaddress")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-400">Select a delivery address</span> */}
        </p>
      </div>
      <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <span className="font-bold">3</span>
        </div>
        <p className="ml-2 text-sm font-semibold text-gray-700">
        {t("PayinfoSelectapaymentmethod")} 
          <br />
          {/* <span className="text-sm font-semibold text-gray-400">Select a payment method</span> */}
        </p>
      </div>
    </div>

<section className="mb-4 mx-4 md:mx-10 lg:mx-20 xl:mx-40 max-w-full">

        <div className="mx-auto">
          {/* Dropdown to Toggle Form */}
          
<h1 className="font-medium my-4 text-3xl">
{t("ChooseShippingAddress")} 
</h1>
<br/>

<div className="w-full px-4 relative">
      {pujaData?.address_list?.length > 0 ? (
        <div className="relative">
          {/* Slider */}
          <Slider ref={sliderRef} {...sliderSettings} className="p-4">
            {pujaData.address_list.map((address) => (
             <div key={address.id} className="px-8 w-full">
             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
               {/* Radio Button */}
               <label className="flex items-center space-x-2">
                 <input
                   type="radio"
                   name="default_address"
                   checked={selectedAddress === address.id}
                   onChange={() => handleAddressSelect(address.id)}
                   className="form-radio w-5 h-5 sm:w-6 sm:h-6 border bg-orange-500"
                 />
               </label>
           
               {/* Address Card */}
               <div className="w-full sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] flex justify-between rounded-lg border shadow-lg bg-white p-4">
                 <div className="flex-1">
                   <h3 className="font-medium text-base sm:text-lg lg:text-xl">{address.name}</h3>
                   <p className="font-medium text-sm sm:text-base lg:text-lg">
                     {address.address}, {address.city} <br />
                     {address.state}
                     <br /> {address.pincode}
                   </p>
                   <p className="font-medium text-sm sm:text-base lg:text-lg">{address.phone_no}</p>
                   <p className="font-medium text-sm sm:text-base lg:text-lg">{address.email}</p>
                 </div>
           
                 {/* Edit Icon */}
                 <EditIcon
                   className="text-orange-400 cursor-pointer text-lg sm:text-xl lg:text-2xl"
                   onClick={() => handleEditClick(address)}
                 />
               </div>
             </div>
           </div>
           
            ))}
          </Slider>

          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 disabled:opacity-50"
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={!pujaData || pujaData.address_list.length <= 1}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 disabled:opacity-50"
            onClick={() => sliderRef.current?.slickNext()}
            disabled={!pujaData || pujaData.address_list.length <= 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600">Address not available, Please add your address to continue.</p>
      )}
    </div>
    
<br/> <br/> 
  <div className="mt-4 border rounded-lg shadow-2xl">
          <button
  onClick={() => {
    if (!showForm) {
      // Reset form fields only when opening the form for a new address
      setFormData({
        type: "add_address",
        address_id: "", // Ensure it's empty for new addresses
        phone_no: "",
        name: "",
        email: "",
        country_id: "",
        state_id: "",
        city_id: "",
        pincode: "",
        address: "",
      });
    }
    setShowForm(!showForm);
  }}
  className="px-4 py-2  font-bold  "
>
  {showForm ?  `+${t("AddressDetails")}`  : `+${t("AddnewAddress")}`}
</button>

          </div>
          <Toaster position="top-right" reverseOrder={false} /> 
          {/* Address Form (Hidden by default) */}
          {showForm && (
            <form onSubmit={formData.address_id ? handleUpdateAddress : handleSubmit} className="mt-5 border-2 rounded-xl bg-white p-4 gap-3">
          <div className="mt-5 lg:grid grid-cols-3   gap-3">
          <label className="block mb-2 col-1">
               
               <input
                 type="text"
                 placeholder={t("Enteryourname")}
                 value={formData.name}
                 onChange={(e) =>
                   setFormData({ ...formData, name: e.target.value })
                 }
                 className="w-full p-2  rounded-lg border "
               />
                {formErrors.name && <p className="error text-red-500 text-sm">{formErrors.name}</p>}
             </label>

             <label className="block mb-2">
             
             <input
  type="text"
  placeholder={t("Enteryourphone")}
  value={formData.phone_no}
  onChange={(e) => handlePhoneChange(e)}
  maxLength={10}
  className="w-full p-2 rounded-lg border"
/>
{/* {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>} */}
{formErrors.phone_no && <p className="error text-red-500 text-sm">{formErrors.phone_no}</p>}

             </label>

             <label className="block mb-2">
             
               <input
                 type="email"
                 value={formData.email}
                   placeholder=  {t("Enteryouremail")} 
                 onChange={(e) =>
                   setFormData({ ...formData, email: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
                 {formErrors.email && <p className="error text-red-500 text-sm">{formErrors.email}</p>}
             </label>

             <label className="block mb-2">
              
               <input
                 type="text"
                   placeholder= {t("Enteryourfulladdress")} 
                 value={formData.address}
                 maxLength={50}
                 onChange={(e) =>
                   setFormData({ ...formData, address: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
                  {formErrors.address && <p className="error text-red-500 text-sm">{formErrors.address}</p>}
               
             </label>
             <label className="block mb-2">
             <select name="country_id" value={formData.country_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
 <option value="">{t("Country")} </option>
 {countries.map((country) => (
   <option key={country.id} value={country.id}>
     {country.country_name}
   </option>
 ))}
</select>
{formErrors.country_id && <p className="error text-red-500 text-sm">{formErrors.country_id}</p>}
</label>

             <label className="block mb-2">
            <select name="state_id" value={formData.state_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
 <option value="">{t("State")} </option>
 {states.map((state) => (
 <option key={state.state_id} value={state.state_id}>{state.state_title}</option> 
 ))}
</select>
{formErrors.state_id && <p className="error text-red-500 text-sm">{formErrors.state_id}</p>}

             </label>

             <label className="block mb-2">
               <select name="city_id" value={formData.city_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
                 <option value="">{t("City")} </option>
                 {cities.map((city) => (
                   <option key={city.city_id} value={city.city_id}>{city.city_title}</option>
                 ))}
               </select>
               {formErrors.city_id && <p className="error text-red-500 text-sm">{formErrors.city_id}</p>}
             </label>

             <label className="block mb-2">
               
               <input
                 type="text"
                   placeholder={t("PinCode")} 
                 value={formData.pincode}
                 maxLength={6}
                 onChange={(e) =>
                   setFormData({ ...formData, pincode: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
               {formErrors.pincode && <p className="error text-red-500 text-sm">{formErrors.pincode}</p>}
             </label>
          </div>

            <button type="submit" className="bg-[#E5644E] text-white px-8 py-3 rounded-2xl">
    {formData.address_id ?  `${t("UpdateAddress")}`  : `${t("SaveAddress")}`}
  </button>
            </form>
          )}
        </div>

        <button
            onClick={handleNextStep}
            disabled={isButtonDisabled}
            className={`mt-7 px-20 py-2  rounded-lg text-white font-medium ${
              isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
          {t("Proceedtonextstep")} 
          </button>
      </section>
      <br/>   <br/>  <br/>
     <SliderTwo/>
    </>
  );
}