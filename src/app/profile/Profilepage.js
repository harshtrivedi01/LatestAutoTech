"use client";
import React, { useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { TbBuildingEstate, TbMail } from "react-icons/tb";
import { LiaCitySolid, LiaEditSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlinePlace, MdTransgender } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import "rsuite/DatePicker/styles/index.css";
import { TimePicker } from "rsuite";

const page = () => {
  const [maritalStatus, setMaritalStatus] = useState("");

  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 100) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleNoChild = (e) => {
    if (e.target.value === "no") {
      setCount(0);
    } else {
      setCount(1);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="bg-white w-full overflow-hidden ">
        <div className="relative xl:h-32 lg:h-32 md:h-28 sm:h-24 h-20 bg-[#FFEEE2]">
          <div className=" ">
            <div className="absolute border-[#E5644E] border-4 bottom-0 left-1/2 transform items-center -translate-x-1/2 translate-y-1/2 xl:w-44 lg:w-44 md:w-36 sm:w-36 w-28 xl:h-44 lg:h-44 md:h-36 sm:h-36 h-28  rounded-full transition-transform duration-300 hover:scale-105">
              <img
                src="https://i.pravatar.cc/300"
                alt="John Doe"
                className=" rounded-full border-8 border-white "
              ></img>
            </div>
            <div className="absolute xl:top-52 lg:top-52 md:top-44 sm:top-40 top-28 right-1/2 translate-x-12 -translate-y-4 bg-white xl:h-10 xl:w-10 lg:h-10 lg:w-10 md:h-8 md:w-8 h-8 w-8 rounded-full flex items-center justify-center shadow-gray-400 shadow-lg cursor-pointer ">
              <LiaEditSolid className="text-xl text-gray-600" />
            </div>
          </div>
        </div>

        <div className="xl:pt-28 lg:pt-28 md:pt-24 sm:pt-24 pt-20 pb-6 text-center xl:px-20 lg:px-20 md:px-20 sm:px-5 py-20">
          <h1 className="xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-xl font-semibold text-gray-800">
            Sejal Khandelwal 💕
          </h1>

          <div className="border-[#FA8128] border-2 xl:my-14 lg:my-14 md:my-12 sm:my-8 my-8 xl:py-10 lg:py-10 md:py-8 sm:py-5 py-5 mx-3 rounded-xl px-5">
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 pt-5">
              <div className="flex justify-start items-center w-full gap-2 ">
                <IoPersonCircleOutline className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    First Name <span className=" text-[#FA8128]">*</span>
                  </h2>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="Sejal "
                    required
                    className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 ">
                <IoPersonCircleOutline className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Last Name <span className=" text-[#FA8128]">*</span>
                  </h2>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Khendelwal"
                    required
                    className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 ">
                <LuPhoneCall className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Phone Number <span className=" text-[#FA8128]">*</span>
                  </h2>

                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="6205326564"
                    required
                    className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2">
                <TbMail className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Email <span className=" text-[#FA8128]">*</span>
                  </h2>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="punyasetu1210@gmail.com"
                    className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2">
                <HiOutlineCalendarDateRange className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    DOB <span className=" text-[#FA8128]">*</span>
                  </h2>

                  <div className="">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      required
                      placeholder="25/08/2003"
                      className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] text-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2">
                <HiOutlineCalendarDateRange className="text-2xl text-gray-800" />

                <div className="w-full">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Birth Time
                  </h2>

                  <div className="">
                    <TimePicker
                      format="hh:mm aa"
                      showMeridiem
                      className="rounded-lg border w-full shadow-md text-[14px] text-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative ">
                <MdOutlinePlace className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[16px] text-gray-800 font-semibold text-start ">
                    Place of Birth
                  </h2>
                  <input
                    type="text"
                    name="place_of_birth"
                    id="place_of_birth"
                    placeholder="Jaipur"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative">
                <MdTransgender className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[16px] text-gray-800 font-semibold text-start">
                    Gender
                  </h2>

                  <select
                    name="gender"
                    id="gender"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] appearance-none outline-none pr-10"
                  >
                    <option value="" disabled selected>
                      Female
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className="text-gray-800" />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative">
                <BsPeopleFill className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Marital Status
                  </h2>

                  <select
                    name="marital_status"
                    id="marital_status"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] appearance-none outline-none pr-10"
                  >
                    <option value="" disabled selected>
                      Single
                    </option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>

                  <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className="text-gray-800" />
                  </div>
                </div>
              </div>

              {maritalStatus === "married" && (
                <div className="flex justify-start items-center w-full gap-2 relative ">
                  <HiOutlineCalendarDateRange className="text-2xl text-gray-800 flex-shrink-0" />

                  <div className="flex-1 relative">
                    <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                      Anniversary Date (if Married)
                    </h2>
                    <input
                      type="date"
                      name="anniversary_date"
                      id="anniversary_date"
                      className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                    />
                  </div>
                </div>
              )}

              {maritalStatus === "married" && (
                <div className="flex justify-start items-center w-full gap-2 relative">
                  <BsPeopleFill className="text-2xl text-gray-800 flex-shrink-0" />
                  <div className="relative flex-1">
                    <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                      No of Child
                    </h2>

                    <select
                      onChange={handleNoChild}
                      className="px-6 py-[9px] bg-white rounded-lg border w-full shadow-md text-[14px] outline-none"
                    >
                      <option value="no">No Child</option>
                      <option value="yes">Select No of Children</option>
                    </select>

                    {count > 0 && (
                      <div className="relative mt-2">
                        <input
                          type="text"
                          name="no-of-child"
                          id="no-of-child"
                          value={count}
                          placeholder="Number of Child"
                          className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                        />
                        <button
                          onClick={decrement}
                          className="absolute right-2 top-4 px-1 text-gray-400"
                          disabled={count === 1}
                        >
                          <MdArrowDropDown />
                        </button>

                        <button
                          onClick={increment}
                          className="absolute right-2  bottom-4 px-1 text-gray-400"
                          disabled={count === 100}
                        >
                          <MdArrowDropUp />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-start items-center w-full gap-2">
                <MdOutlinePlace className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Current Address
                  </h2>
                  <input
                    type="text"
                    name="current_address"
                    id="current_address"
                    placeholder="Jaipur, Rajasthan"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative ">
                <LiaCitySolid className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    City
                  </h2>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Jaipur"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative">
                <TbBuildingEstate className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    State
                  </h2>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Rajasthan"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative ">
                <MdOutlinePlace className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Country
                  </h2>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="India"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[16px] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-2 relative">
                <MdOutlinePlace className="text-2xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                    Pin Code
                  </h2>
                  <input
                    type="text"
                    name="pin_code"
                    id="pin_code"
                    placeholder="302025"
                    className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] outline-none"
                  />
                </div>
              </div>
            </div>

            {maritalStatus === "married" && (
              <div>
                <div className="w-full gap-10 py-8 ">
                  <h1 className="text-2xl font-bold py-3 text-start">
                    Partner details:
                  </h1>

                  <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-5">
                    <div className="flex justify-start items-center w-full gap-2 ">
                      <IoPersonCircleOutline className="text-2xl text-gray-800" />

                      <div className="w-full">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          First Name <span className=" text-[#FA8128]">*</span>
                        </h2>
                        <input
                          type="text"
                          name="fname"
                          id="fname"
                          required
                          placeholder="Sejal "
                          className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start items-center w-full gap-2 ">
                      <IoPersonCircleOutline className="text-2xl text-gray-800" />

                      <div className="w-full">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          Last Name<span className=" text-[#FA8128]">*</span>
                        </h2>
                        <input
                          type="text"
                          name="lname"
                          id="lname"
                          required
                          placeholder="Khendelwal"
                          className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start items-center w-full gap-2">
                      <TbMail className="text-2xl text-gray-800" />

                      <div className="w-full">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          Email<span className=" text-[#FA8128]">*</span>
                        </h2>

                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          placeholder="punyasetu1210@gmail.com"
                          className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start items-center w-full gap-2 ">
                      <LuPhoneCall className="text-2xl text-gray-800" />

                      <div className="w-full">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          Phone Number
                        </h2>

                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          placeholder="6205326564"
                          className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start items-center w-full gap-2">
                      <HiOutlineCalendarDateRange className="text-2xl text-gray-800" />

                      <div className="w-full">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          DOB<span className=" text-[#FA8128]">*</span>
                        </h2>

                        <div className="">
                          <input
                            type="date"
                            name="dob"
                            id="dob"
                            required
                            placeholder="25/08/2003"
                            className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] text-gray-400 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start items-center w-full gap-2 relative">
                      <MdTransgender className="text-2xl text-gray-800 flex-shrink-0" />

                      <div className="flex-1 relative">
                        <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                          Gender
                        </h2>

                        <select
                          name="gender"
                          id="gender"
                          className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] appearance-none outline-none pr-10"
                        >
                          <option value="" disabled selected>
                            Female
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                        <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                          <IoIosArrowDown className="text-gray-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {count > 0 && (
              <div className="w-full py-8">
                <h1 className="text-2xl font-bold py-3 text-start">
                  Child Details:
                </h1>
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    className="border bg-[#FFEEE2] px-4 py-10 rounded-lg shadow-lg mb-6"
                  >
                    <h2 className="text-lg font-semibold">
                      Child {index + 1} Details
                    </h2>

                    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-5">
                      <div className="flex items-center w-full gap-2">
                        <IoPersonCircleOutline className="text-2xl text-gray-800" />
                        <div className="w-full">
                          <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                            First Name{" "}
                            <span className=" text-[#FA8128]">*</span>
                          </h2>
                          <input
                            type="text"
                            placeholder="Sejal"
                            required
                            className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center w-full gap-2">
                        <IoPersonCircleOutline className="text-2xl text-gray-800" />
                        <div className="w-full">
                          <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                            Last Name <span className=" text-[#FA8128]">*</span>
                          </h2>
                          <input
                            type="text"
                            required
                            placeholder="Khendelwal"
                            className="px-6 py-[9px] rounded-lg border w-full shadow-md text-[14px] outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center w-full gap-2">
                        <HiOutlineCalendarDateRange className="text-2xl text-gray-800" />
                        <div className="w-full">
                          <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                            DOB<span className=" text-[#FA8128]">*</span>
                          </h2>
                          <input
                            type="date"
                            required
                            className="px-5 py-[9px] rounded-lg border w-full shadow-md text-[14px] text-gray-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center w-full gap-2 relative">
                        <MdTransgender className="text-2xl text-gray-800 flex-shrink-0" />
                        <div className="flex-1 relative">
                          <h2 className="xl:text-[16px] lg:text-[16px] text-[13px] text-gray-800 font-semibold text-start">
                            Gender
                          </h2>
                          <select className="px-5 py-[9px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-[14px] appearance-none outline-none pr-10">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="absolute right-4 top-2/3 transform -translate-y-1/2 pointer-events-none">
                            <IoIosArrowDown className="text-gray-800" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-8 flex justify-start">
              <button className="register text-white bg-[#E5644E] w-40 rounded-lg shadow-lg shadow-gray-400 py-[11px] px-5 hover:scale-100 font-semibold duration-300">
                Save
              </button>
            </div>
          </div>

          <div className="mt-6 text-sm flex justify-center items-center">
            <button className=" register text-white bg-[#E5644E] w-40 rounded-lg shadow-lg shadow-gray-400 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
