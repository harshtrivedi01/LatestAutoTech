'use client'
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import { useRouter } from "next/navigation";

const Form = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [defaultFields, setDefaultFields] = useState({
    name: "",
    father_name: "",
    gotra: "",
    email: "",
    address: "",
  });
  const [dontKnowGotra, setDontKnowGotra] = useState(false);

  const memberLimit = parseInt(localStorage.getItem("membernumber") || "1", 10);
  const [members, setMembers] = useState([]);
  const [dontKnowMemberGotra, setDontKnowMemberGotra] = useState([]);
const router = useRouter();
const packagedetail = JSON.parse(localStorage.getItem("pujaBookingData") || "{}");


console.log(packagedetail.amount)
  useEffect(() => {
    if (memberLimit > 0) {
      setMembers([]);
      setDontKnowMemberGotra([]);
    }
  }, [memberLimit]);

  const handleDefaultChange = (field, value) => {
    setDefaultFields({ ...defaultFields, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (members.length < memberLimit - 1) {
      setMembers([...members, { name: "", gotra: "" }]);
      setDontKnowMemberGotra([...dontKnowMemberGotra, false]);
    } else {
      toast.error("Member limit reached");
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
    setDontKnowMemberGotra(dontKnowMemberGotra.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
  
    // Name validation (Only letters, no numbers or special characters)
    const nameRegex = /^[a-zA-Z\s]+$/;
    
    // Validate default fields
    Object.keys(defaultFields).forEach((key) => {
      if (!defaultFields[key]) {
        newErrors[key] = "This field is required";
        isValid = false;
      } else if (key === "name" || key === "father_name") {
        if (!nameRegex.test(defaultFields[key])) {
          newErrors[key] = "Only alphabets are allowed";
          isValid = false;
        }
      }
    });
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (defaultFields.email && !emailRegex.test(defaultFields.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
  
    // Address validation (Minimum 5 characters)
    if (defaultFields.address && defaultFields.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long";
      isValid = false;
    }
  
    // Gotra validation (Must be alphabetic)
    const gotraRegex = /^[a-zA-Z\s]+$/;
  
    // Validate members
    let memberErrors = members.map((member, index) => {
      let errorObj = {};
      
      if (!member.name) {
        errorObj.name = "Required";
      } else if (!nameRegex.test(member.name)) {
        errorObj.name = "Only alphabets are allowed";
      }
  
      if (!member.gotra && !dontKnowMemberGotra[index]) {
        errorObj.gotra = "Required";
      } else if (member.gotra && !gotraRegex.test(member.gotra)) {
        errorObj.gotra = "Only alphabets are allowed";
      }
  
      return errorObj;
    });
  
    // Check if any member has errors
    if (memberErrors.some((err) => Object.keys(err).length > 0)) {
      newErrors.members = memberErrors;
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  const submitForm = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields!");
      return;
    }
  
    try {
      // Retrieve stored form data from localStorage
      const storedData = JSON.parse(localStorage.getItem("pujaBookingData") || "{}");
  
      // Create FormData object for API request
      let formData = new FormData();
      formData.append("type", "new_pooja_booking");
      formData.append("puja_id", storedData.puja_id || "");
      formData.append("package_id", storedData.package_id || "");
      formData.append("amount", storedData.amount || "");
      formData.append("date", storedData.date || "");
      formData.append("currency", storedData.currency || "INR");
      formData.append("name", defaultFields.name);
      formData.append("father_name", defaultFields.father_name);
      formData.append("gotra", defaultFields.gotra);
      formData.append("email", defaultFields.email);
      formData.append("address", defaultFields.address);
  
      // Append dynamic members
      members.forEach((member) => {
        formData.append("member_name[]", member.name || "");
        // formData.append("member_father_name[]", member.father_name || "");
        formData.append("member_gotra[]", member.gotra || "");
      });
  
      // Call the API
      const response = await api.post("/puja", formData);
  
      if (response.data.status === "1") {
        toast.success("Pooja booked successfully!");
        router.push("/poojabookingcart");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to book pooja!");
    }
  };
  

  const fieldPlaceholders = {
    name: "First Member Name",
    father_name: "Enter your Father's Name",
    gotra: "Enter your Gotra",
    email: "Enter your Email",
    address: "Enter your Full Address",
  };

  const handleArrowClick = () => {
    if (window.history.length > 2) {
      router.back(); // Correct way to go back
    } else {
      router.push("/"); // Correct way to navigate
    }
  };
  return (
    <div className="p-6 min-h-scree">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="font-medium my-4 text-2xl">Choose Previous Sankalp Detail</h1>

      <div className="flex justify-between items-center bg-white p-2 px-4 shadow-md rounded-lg cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-lg font-semibold text-gray-800">+ Add Sankalp Form Detail</h2>
        {isOpen ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
      </div>

      <div className={`transition-all bg-white p-10 border-2 shadow-lg rounded-lg mt-5 ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
        <h2 className="text-lg font-semibold text-gray-800">Name of Members Participating In Pooja</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {Object.keys(defaultFields).map((field, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder={fieldPlaceholders[field]}
                value={defaultFields[field]}
                onChange={(e) => handleDefaultChange(field, e.target.value)}
                className="border text-sm p-3 rounded-xl shadow-xl w-full"
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" checked={dontKnowGotra} onChange={() => {
            setDontKnowGotra(!dontKnowGotra);
            handleDefaultChange("gotra", dontKnowGotra ? "" : "Kashyap");
          }} className="mr-2" />
          <label className="text-sm">I don’t know my Gotra</label>
        </div>
      {members > "2" && (
          <h2 className="text-lg font-semibold text-gray-800 mt-6">Added Member</h2>
      )}
      
        {members.map((member, index,field) => (
          <div key={index} className=" border-b pb-2 grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-4">
             
          <div className="">
          <input
              type="text"
              placeholder="Member Name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              className="border text-sm p-3  rounded-xl shadow-xl w-full"
            />
              {errors.members && errors.members[index]?.name && <p className="text-red-500 text-xs mt-1">{errors.members[index].name}</p>}
          </div>
          <div className="fel">
          <input
              type="text"
              placeholder="Gotra"
              value={member.gotra}
              onChange={(e) => handleMemberChange(index, "gotra", e.target.value)}
              className="border text-sm p-3 mt-8 rounded-xl shadow-xl w-full"
            />
              {errors.members && errors.members[index]?.gotra && <p className="text-red-500 text-xs mt-1">{errors.members[index].gotra}</p>}
                <div className="flex gap-2 mt-3">
              
            <input type="checkbox" className="" checked={dontKnowMemberGotra[index]} onChange={() => {
              const updatedCheck = [...dontKnowMemberGotra];
              updatedCheck[index] = !updatedCheck[index];
              setDontKnowMemberGotra(updatedCheck);
              handleMemberChange(index, "gotra", updatedCheck[index] ? "Kashyap" : "");
            }} />
         
              <label className="text-sm">I don’t know my Gotra</label>
                </div>
          </div>      
            <button onClick={() => removeMember(index)} className="text-red-400">
              <FaTrash />
            </button>
           


          </div>
          
        ))}

        {members.length < memberLimit - 1 && (
          <button onClick={addMember} className="mt-2 underline text-orange-500 rounded-lg shadow-2xl">
            + Add New Member
          </button>
        )}
<br/>
<div className="flex flex-col sm:flex-row sm:items-center">
  <button
    onClick={submitForm}
    className="mt-6 px-4 py-2 bg-green-700 w-full sm:w-80 text-white rounded-xl shadow-2xl hover:bg-green-800 transition"
  >
    Save
  </button>
  <button
    className="mt-6 sm:mt-6 sm:ms-4 px-4 py-2 bg-[#BA1A1A] w-full sm:w-80 text-white rounded-xl shadow-2xl hover:bg-red-900 transition"
    onClick={handleArrowClick}
  >
    Cancel
  </button>
</div>
      </div>
    </div>
  );
};

export default Form;
