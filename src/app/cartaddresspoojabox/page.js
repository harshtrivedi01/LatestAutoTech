"use client"

import axios from "axios";
import { CheckIcon, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import api from "../lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function Address() {
  const router = useRouter();
  const [pujaData, setPujaData] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [countries, setCountries] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
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
      const defaultAddress = pujaData.address_list.find((address) => address.set_default === "1");
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    }
  }, [pujaData]); // Runs when `pujaData` is loaded
  
  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    setIsButtonDisabled(false); // Enable button when address is selected
  };

  // Redirect to next step
  const handleNextStep = () => {
    if (selectedAddress) {
    //   router.push(`/next-step?addressId=${selectedAddress}`); // Update with actual next page route
    router.push(`/cartpaymentpoojabox`); 
    }
  };

  const sendAddressToComponent = (addressId) => {
    console.log("Selected Address ID:", addressId);
    handleNextStep();
    return <Sankalp sendAddress={sendAddressToComponent} />;
  };
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
  
    // Validation: Ensure required fields are filled
    if (!formData.name || !formData.phone_no || !formData.address || !formData.city_id || !formData.state_id || !formData.country_id || !formData.pincode) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      let formData = new FormData();
  
      Object.keys(formData).forEach((key) => {
        formData.append(key, formData[key]);
      });
  
      formData.set("type", "update_address"); // Set update type
  
       const response = await api.post("/address", formData); // Use the new axios instance
  
      // Check API response
      if (response.data.status === 0) {
        toast.error(response.data.message || "Failed to update address.");
        return;
      }
  
      toast.success("Address updated successfully!");
      console.log("Address Update Response:", response.data);
  
      fetchPujaData(); // Refresh the address list
      setShowForm(false); // Hide form after updating
    } catch (error) {
      console.error("Error updating address:", error);
  
      // Handle different error scenarios
      if (error.response) {
        toast.error(error.response.data.message || "Server error. Please try again later.");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
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
  
    // Validation: Ensure required fields are filled
    if (!formData.name || !formData.phone_no || !formData.address || !formData.city_id || !formData.state_id || !formData.country_id || !formData.pincode) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      let formData = new FormData();
      Object.keys(formData).forEach((key) => formData.append(key, formData[key]));
  
       const response = await api.post("/address", formData);
  
      // Check API response
      if (response.data.status === 0) {
        toast.error(response.data.message || "Failed to add address.");
        return;
      }
  
      toast.success("Address added successfully!");
      console.log("Address Added Response:", response.data);
  
      fetchPujaData(); // Refresh the list after adding
      setShowForm(false); // Hide form after submission
  
      // Clear form after successful submission
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
  
      // Handle different error scenarios
      if (error.response) {
        toast.error(error.response.data.message || "Server error. Please try again later.");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
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
  
  return (
    <>
     <h1 className="f-34 mb-2 font-semibold text-lg mx-40 my-10">Shopping Cart</h1>
<div className="flex mx-40 flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
  <div className="flex items-center mb-4 md:mb-0">
  <div
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white `}
            >
      <span className="font-bold"><CheckIcon/></span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Booking 
      <br />
      <span className="text-sm font-semibold text-gray-700">Review booking </span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}
    >
      <span className="font-bold">{2}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
     Add Address
      <br />
      <span className="text-sm font-semibold text-gray-400">Select a delivery address</span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>
  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}
    >
      <span className="font-bold">{3}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Pay info
      <br />
      <span className="text-sm font-semibold text-gray-400">Select a payment method</span>
    </p>
  </div>
</div>


      <section className="mb-4 mx-40 max-w-full">
        <div className="mx-auto">
          {/* Dropdown to Toggle Form */}
          
<h1 className="font-medium my-4 text-3xl">
Choose Shipping Address
</h1>
<br/>

<div className="overflow-x-auto overflow-hidden">
    <div className="flex space-x-4 p-4">
      {pujaData?.address_list?.length > 0 ? (
        pujaData.address_list.map((address) => (
          <div
            key={address.id}
            className="flex gap-2 items-start"
          >
              <label className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                name="default_address"
                checked={selectedAddress === address.id} // Default selected
                onChange={() => handleAddressSelect(address.id)}
                className="form-radio w-6 h-6 border  bg-orange-500"
              />
              {/* <span className="text-xs text-green-600 font-semibold">
                {address.set_default === "1" ? "Default Address" : "Select Address"}
              </span> */}
            </label>
       <div className="w-[300px] md:min-w-[200px] flex justify-between   rounded-lg border bg-white p-4 flex-shrink-0">
      <div>
      <h3 className=" font-medium text">{address.name}</h3>
            <p className="font-medium">
               {address.address}, {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="font-medium"> {address.phone_no}</p>
            <p className="font-medium"> {address.email}</p>

      </div>
          
             <EditIcon className="text-orange-400"  onClick={() => handleEditClick(address)}/>
        

       </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Address not available, Please addd your address to continue.</p>
      )}
    </div>
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
  {showForm ? "- Address Detail" : "+ Add New Address"}
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
                 placeholder="Enter your Name"
                 value={formData.name}
                 onChange={(e) =>
                   setFormData({ ...formData, name: e.target.value })
                 }
                 className="w-full p-2  rounded-lg border "
               />
             </label>

             <label className="block mb-2">
             
             <input
  type="text"
  placeholder="Enter your phone"
  value={formData.phone_no}
  onChange={(e) => handlePhoneChange(e)}
  maxLength={10}
  className="w-full p-2 rounded-lg border"
/>
{phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

             </label>

             <label className="block mb-2">
             
               <input
                 type="email"
                 value={formData.email}
                   placeholder="Enter your email"
                 onChange={(e) =>
                   setFormData({ ...formData, email: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
             </label>

             <label className="block mb-2">
              
               <input
                 type="text"
                   placeholder="Enter your address"
                 value={formData.address}
                 maxLength={50}
                 onChange={(e) =>
                   setFormData({ ...formData, address: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
             </label>
             <label className="block mb-2">
             <select name="country_id" value={formData.country_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
 <option value="">Select Country</option>
 {countries.map((country) => (
   <option key={country.id} value={country.id}>
     {country.country_name}
   </option>
 ))}
</select>
</label>

             <label className="block mb-2">
            <select name="state_id" value={formData.state_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
 <option value="">Select State</option>
 {states.map((state) => (
 <option key={state.state_id} value={state.state_id}>{state.state_title}</option> 
 ))}
</select>

             </label>

             <label className="block mb-2">
               <select name="city_id" value={formData.city_id} onChange={handleChange}   className="w-full p-2  rounded-lg border ">
                 <option value="">Select City</option>
                 {cities.map((city) => (
                   <option key={city.city_id} value={city.city_id}>{city.city_title}</option>
                 ))}
               </select>
             </label>

             <label className="block mb-2">
               
               <input
                 type="text"
                   placeholder="Enter pincode"
                 value={formData.pincode}
                 maxLength={6}
                 onChange={(e) =>
                   setFormData({ ...formData, pincode: e.target.value })
                 }
                   className="w-full p-2  rounded-lg border "
               />
             </label>
          </div>

            <button type="submit" className="bg-[#E5644E] text-white px-8 py-3 rounded-2xl">
    {formData.address_id ? "Update Address" : "Save Address"}
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
          Proceed to Next Step
        </button>
      </section>
     
    </>
  );
}