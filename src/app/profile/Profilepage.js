import React from "react";
import { LuPhoneCall } from "react-icons/lu";
import { TbBuildingEstate, TbMail } from "react-icons/tb";
import { LiaCitySolid, LiaEditSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoIosArrowDown, IoMdTime } from "react-icons/io";
import { MdOutlinePlace, MdTransgender } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

const Profilepage = () => {
  return (
    <div className="overflow-hidden">
      <div class="bg-white w-full overflow-hidden ">
        <div class="relative h-32 bg-[#FFEEE2]">
          <div className=" ">
            <div className="absolute border-[#E5644E] border-4 bottom-0 left-1/2 transform items-center -translate-x-1/2 translate-y-1/2 w-44 h-44 rounded-full transition-transform duration-300 hover:scale-105">
              <img
                src="https://i.pravatar.cc/300"
                alt="John Doe"
                class=" rounded-full border-8 border-white "
              ></img>
            </div>
            <div className="absolute top-52 right-1/2 translate-x-12 -translate-y-4 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-gray-400 shadow-lg cursor-pointer ">
              <LiaEditSolid className="text-xl text-gray-600" />
            </div>
          </div>
        </div>

        <div class="pt-28 pb-6 text-center xl:px-40 lg:px-40 md:px-20 sm:px-5 py-20">
          <h1 class="text-2xl font-semibold text-gray-800">
            Sejal Khandelwal 💕
          </h1>

           <div className="border-[#FA8128] border-2 my-14 py-10 mx-3 rounded-xl px-5">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
              <div className="flex justify-start items-center w-full gap-4 border-r-2">
                <IoPersonCircleOutline className="text-4xl text-gray-800" />

                <div className="w-full pr-4">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Name
                  </h2>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="Sejal Khendelwal"
                    className="px-6 py-[9px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4">
                <HiOutlineCalendarDateRange className="text-4xl text-gray-800" />

                <div className="w-full">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    DOB
                  </h2>

                  <div className="">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      placeholder="25/08/2003"
                      className="px-5 py-[12px] rounded-lg border w-full shadow-md text-md text-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 border-r-2">
                <LuPhoneCall className="text-4xl text-gray-800" />

                <div className="w-full pr-4">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Phone Number
                  </h2>

                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="6205326564"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4">
                <TbMail className="text-4xl text-gray-800" />

                <div className="w-full">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Email
                  </h2>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="punyasetu1210@gmail.com"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full border-r-2 gap-4 relative pr-4">
                <MdTransgender className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Gender
                  </h2>

                  <select
                    name="gender"
                    id="gender"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md appearance-none outline-none pr-10"
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

              <div className="flex justify-start items-center w-full gap-4 relative">
                <BsPeopleFill className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Marital Status
                  </h2>

                  <select
                    name="marital_status"
                    id="marital_status"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md appearance-none outline-none pr-10"
                  >
                    <option value="" disabled selected>
                      Single
                    </option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
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
                    Anniversary Date (if Married)
                  </h2>
                  <input
                    type="date"
                    name="anniversary_date"
                    id="anniversary_date"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <IoMdTime className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Birth Time (24 Hrs format)
                  </h2>
                  <input
                    type="time"
                    name="birth_time"
                    id="birth_time"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start ">
                    Place of Birth
                  </h2>
                  <input
                    type="text"
                    name="place_of_birth"
                    id="place_of_birth"
                    placeholder="Jaipur"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Current Address
                  </h2>
                  <input
                    type="text"
                    name="current_address"
                    id="current_address"
                    placeholder="Jaipur, Rajasthan"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-md text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <LiaCitySolid className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    City
                  </h2>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Jaipur"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <TbBuildingEstate className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    State
                  </h2>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Rajasthan"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-smd outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative border-r-2 pr-4">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Country
                  </h2>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="India"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-start items-center w-full gap-4 relative">
                <MdOutlinePlace className="text-4xl text-gray-800 flex-shrink-0" />

                <div className="flex-1 relative">
                  <h2 className="text-[20px] text-gray-800 font-semibold text-start">
                    Pin Code
                  </h2>
                  <input
                    type="text"
                    name="pin_code"
                    id="pin_code"
                    placeholder="302025"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-md outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 text-sm flex justify-center items-center">
            <button class="hover:border register text-white bg-[#E5644E] w-40 rounded-lg shadow-lg shadow-gray-400 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
