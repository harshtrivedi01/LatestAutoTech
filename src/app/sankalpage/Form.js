'use client'
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

  const memberLimit = parseInt(localStorage.getItem("membernumber") || "1", 10);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (memberLimit > 0) {
      setMembers(Array(memberLimit - 1).fill({ name: "", fatherName: "", gotra: "" }));
    }
  }, [memberLimit]);

  const handleDefaultChange = (field, value) => {
    setDefaultFields({ ...defaultFields, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user starts typing
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
    
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.members) {
        newErrors.members[index] = { ...newErrors.members[index], [field]: "" };
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Default Fields
    Object.keys(defaultFields).forEach((key) => {
      if (!defaultFields[key]) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    });

    // Validate Member Fields
    let memberErrors = members.map((member) => {
      let errorObj = {};
      if (!member.name) errorObj.name = "Required";
      if (!member.fatherName) errorObj.fatherName = "Required";
      if (!member.gotra) errorObj.gotra = "Required";
      return errorObj;
    });

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
  const fieldPlaceholders = {
    name: "First Member Name",
    father_name: "Enter your Father's Name",
    gotra: "Enter your Gotra",
    email: "Enter your Email",
    address: "Enter your Full Address",
  };

  return (
    <div className="p-6 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="font-medium my-4 text-2xl">
Choose Pervious Sankalp Detail
</h1>
<div className="flex flex-col md:flex-row gap-4 items-start my-5">
  {/* Radio Button */}
  <label className="flex items-center space-x-2 mt-2">
    <input
      type="radio"
      name="default_address"
      className="form-radio w-5 h-5 border bg-orange-500"
    />
  </label>

  {/* Address Card */}
  <div className="w-full md:w-auto min-w-[200px] max-w-sm flex justify-between rounded-lg border bg-white p-4 flex-shrink-0">
    <div>
      <h3 className="font-medium text-gray-800">tsetse</h3>
      <p className="font-medium text-gray-600">testset</p>
      <p className="font-medium text-gray-600">123123</p>
      <p className="font-medium text-gray-600">123123123</p>
    </div>

    {/* Edit Icon */}
    <EditIcon className="text-orange-400 cursor-pointer" onClick={() => handleEditClick(address)} />
  </div>
</div>

          
      <div className="flex justify-between items-center bg-white p-2 px-4 shadow-md rounded-lg cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-lg font-semibold text-gray-800">+ Add Sankalp Form Detail</h2>
        {isOpen ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
      </div>

      <div className={` transition-all bg-white p-10 border-2 shadow-lg rounded-lg mt-5 ${isOpen ? " opacity-100" : "max-h-0 opacity-0"}`}>
        <h2 className="text-lg font-semibold text-gray-800">Name of Members Participating In Pooja</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {Object.keys(defaultFields).map((field, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder={fieldPlaceholders[field]}
                value={defaultFields[field]}
                onChange={(e) => handleDefaultChange(field, e.target.value)}
                className={`border text-sm p-3 rounded-xl shadow-xl w-full ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        {members.map((member, index) => (
          <div key={index} className="mb-6 pb-5 border-b-2 border-gray-300">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Member Detail</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["name", "fatherName", "gotra"].map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    value={member[field]}
                    onChange={(e) => handleMemberChange(index, field, e.target.value)}
                    className={`border text-sm p-3 rounded-xl shadow-xl w-full ${
                      errors.members && errors.members[index] && errors.members[index][field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.members && errors.members[index] && errors.members[index][field] && (
                    <p className="text-red-500 text-xs mt-1">{errors.members[index][field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#BA1A1A] w-80 text-white rounded-lg shadow-2xl hover:bg-green-700 transition" onClick={submitForm}>
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
