"use client"

import React, { useEffect, useRef, useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { TbBuildingEstate, TbMail } from "react-icons/tb";
import { LiaCitySolid, LiaEditSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoIosArrowDown, IoMdTime } from "react-icons/io";
import { MdOutlinePlace, MdTransgender } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import api from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Profilepage = () => {
    const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState("https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"); // Default image
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    birth_time: "",
    marital_status: "",
    country_id: "101",
    state_id: "",
    city_id: "",
    address: "",
    gender: "",
    dobplace: "",
    pincode: "",
    anniversary:"",
  });
  

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile(); // Auto-fill profile data
    fetchStates();  // Load states
  }, []);

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "profile");
  
      const response = await api.post("/profile", formData);
  
      if (response.data.status == "1") {
        const userData = response.data.data;
  
        setFormData({
          name: userData.name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dob: userData.dob || "",
          birth_time: userData.birth_time || "",
          marital_status: userData.marital_status || "",
          country_id: userData.country_id || "101",
          state_id: userData.state_id || "",
          city_id: userData.city_id || "",
          address: userData.address || "",
          gender: userData.gender || "",
          dobplace: userData.dobplace || "",
          pincode: userData.pincode || "",
          anniversary:userData.anniversary||"",
        });
  
        if (userData.image) {
          setImagePreview(userData.image);
        }
  
        if (userData.state_id) {
          fetchCities(userData.state_id);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  

  const fetchStates = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "state_list");
      formData.append("country_id", "101"); // India

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

  const handleTimeChange = (e) => {
    let timeValue = e.target.value; // Example: "17:29"
    
    if (timeValue) {
      timeValue += ":00"; // Append seconds, making it "17:29:00"
    }
  
    setFormData((prev) => ({
      ...prev,
      birth_time: timeValue,
    }));
  };
 
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state_id") {
      setFormData((prev) => ({ ...prev, [name]: value, city_id: "" }));
      fetchCities(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("type", "profile_update");
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    if (imageFile) {
      form.append("image", imageFile);
    }
  
    try {
      const response = await api.post("/profile", form);
      toast.success("Profile updated successfully!");
      console.log("Profile updated successfully!", response);
    } catch (error) {
      toast.error("Error updating profile!");
      console.log("Error updating profile!", error);
    }
  };
  
  

  return (
    <div className="overflow-hidden">
        <div className="bg-[#FFEEE2] p-10">
        <h2 className="text-3xl font-bold">{t("Profile")}</h2>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
       <form onSubmit={handleSubmit} className="bg-white w-full overflow-hidden ">
       <div className=" h-40 bg-[#FEEE2] flex mt-10 justify-center">
          <div className="relative">
            <div className="w-44 h-44 border-4 border-[#E5644E] rounded-full overflow-hidden transition-transform duration-300 hover:scale-110">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-contain border-8 border-white rounded-full"
              />
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            <div
              className="absolute bottom-2 right-2 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-200 transition"
              onClick={() => fileInputRef.current.click()}
            >
              <LiaEditSolid className="text-xl text-gray-600" />
            </div>
          </div>
        </div>


        <div className=" pb-6 text-center xl:px-40 lg:px-40 md:px-20 sm:px-5 ">

           <div className="border-[#FA8128] border-2 my-14 py-10 mx-3 rounded-xl px-5">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
              <div className="flex justify-start items-center w-full gap-4 border-r-2">
                <IoPersonCircleOutline className="text-4xl text-gray-800" />

                <div className="w-full pr-4">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  
                    {t("FirstName")}
                  </h2>
                  <input
                    id="fname"
                    type="text" name="name"
                     placeholder= {t("FirstName")}
                     value={formData.name}
                      onChange={handleChange} required
                    className="px-6 py-[9px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full gap-4 border-r-2">
                <IoPersonCircleOutline className="text-4xl text-gray-800" />

                <div className="w-full pr-4">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("LastName")}
                  </h2>
                  <input
                    id="flastname"
                    value={formData.last_name}
                    type="text" name="last_name" placeholder=  {t("LastName")} onChange={handleChange} required
                    className="px-6 py-[9px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4">
                <HiOutlineCalendarDateRange className="text-4xl text-gray-800" />

                <div className="w-full">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("DOB")}
                  </h2>

                  <div className="">
                    <input
                      id="dob"
                      placeholder="25/08/2003"
                      value={formData.dob}
                      max={new Date().toISOString().split("T")[0]} // today's date
                      type="date" name="dob" onChange={handleChange} required
                      className="px-5 py-[12px] rounded-lg border w-full shadow-md text-md text-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 border-r-2">
                <LuPhoneCall className="text-4xl text-gray-800" />

                <div className="w-full pr-4">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("PhoneNumber")}
                  </h2>

                  <input
                    id="mobile"
                    value={formData.phone}
                    type="text" name="phone" placeholder={t("PhoneNumber")} onChange={handleChange} readOnly
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4">
                <TbMail className="text-4xl text-gray-800" />

                <div className="w-full">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("Email")}
                  </h2>

                  <input
                    id="email"
                    value={formData.email}
                    placeholder="punyasetu1210@gmail.com"
                    type="email" name="email" onChange={handleChange} required
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full border-r-2 gap-4 relative pr-4">
                <MdTransgender className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("Gender")}
                  </h2>

                  <select
                   name="gender" onChange={handleChange} required
                    id="gender"
                    value={formData.gender}
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md appearance-none outline-none pr-10"
                  >
                 <option value=""> {t("SelectGender")}</option>
        <option value="male"> {t("Male")}</option>
        <option value="female"> {t("Female")}</option>
                  </select>

                  <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className="text-gray-800" />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <BsPeopleFill className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("MaritalStatus")}
                  </h2>

                  <select
                 
                    id="marital_status"
                    value={formData.marital_status}
                    name="marital_status" onChange={handleChange} required
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md appearance-none outline-none pr-10"
                  >
                    <option value=""> {t("SelectMaritalStatus")}</option>
        <option value="single">{t("Single")}</option>
        <option value="married">{t("Married")}</option>
                  </select>

                  <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className="text-gray-800" />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative pr-4 border-r-2">
                <HiOutlineCalendarDateRange className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("AnniversaryDateifMarried")}
                  </h2>
                  <input
  type="date"
  name="anniversary"
  value={formData.anniversary || ""}
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]} // today's date
  className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
/>

                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <IoMdTime className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("BirthTime24Hrsformat")}
                  </h2>
                  <input
  type="time"
  name="birth_time"
  value={formData.birth_time || ""}
  onChange={handleTimeChange}


                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start ">
                  {t("PlaceofBirth")}
                  </h2>
                  <input
                    id="dobplace"
                    value={formData.dobplace}
                    type="text" name="dobplace" placeholder= {t("PlaceofBirth")} onChange={handleChange}
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("CurrentAddress")}
                  </h2>
                  <input
                    type="text"
                    value={formData.address}
                    id="current_address"
                    name="address" placeholder={t("address")} onChange={handleChange}

                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-md outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("Country")}
                  </h2>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder={t("india")}
                    readOnly
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <TbBuildingEstate className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("State")}
                  </h2>
                  <select
  name="state_id"
  value={formData.state_id}
  onChange={handleChange}
  className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"

>
  <option value="">{t("SelectState")}</option>
  {states.map((state) => (
    <option key={state.state_id} value={state.state_id}>
      {state.state_title}
    </option>
  ))}
</select>

                </div>
              </div>

             

              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <LiaCitySolid className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("City")}
                  </h2>
                  <select
  name="city_id"
  value={formData.city_id}
  onChange={handleChange}
  className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"

  disabled={!formData.state_id}
>
  <option value=""> {t("SelectCity")}</option>
  {cities.map((city) => (
    <option key={city.city_id} value={city.city_id}>
      {city.city_title}
    </option>
  ))}
</select>

                </div>
              </div>

             

              <div className="flex justify-start items-center w-full gap-4 relative">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                  {t("PinCode")}
                  </h2>
                  <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    value={formData.pincode}
                    placeholder="302025"
                    onChange={handleChange} required
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        <div className="">
        <div className=" text-lg flex justify-center items-center">
            <button
            type="submit"
             className="hover:border register text-white bg-[#E5644E]  rounded-lg shadow-lg shadow-gray-400 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
            {t("UpdateProfile")}
            </button>
          </div>
        {/* <div className=" text-sm flex justify-center items-center">
            <button className="hover:border register text-white bg-[#E5644E] w-40 rounded-lg shadow-lg shadow-gray-400 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
              Log Out
            </button>
          </div> */}
        
        </div>
        </div>
       
      </form>
    </div>
  );
};

export default Profilepage;