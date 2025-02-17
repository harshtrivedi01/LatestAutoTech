"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Faq from "../poojadetail/Faq";

const Joinpage = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 100) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div>
      <div className="bg-[#FFEEE2]">
        <div className=" p-60 overflow-hidden">
          <div className="container">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
                  Pandit Registration
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-100 py-16">
        <div className="rounded-2xl m-auto bg-white max-w-7xl px-10 py-14">
          <div className="  flex max-w-full gap-10  box-border justify-center items-center">
            <div className="md:w-2/3">
              <h2 className="font-bold text-3xl text-[#E5644E] pb-10">
                Register Now !
              </h2>

              <form action="#" className="grid grid-cols-2 gap-5">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your name"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email ID*"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="mobile"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter Your Mobile Number*"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="gender"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Select Language
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                  >
                    <option value="" disabled selected>
                      Select your Language*
                    </option>
                    <option value="male">Hindi</option>
                    <option value="female">english</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className=" text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="gender"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Gender *
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                  >
                    <option value="" disabled selected>
                      Select your Gender*
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className=" text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="register-as"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Register As *
                  </label>
                  <select
                    name="register-as"
                    id="register-as"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                  >
                    <option value="" disabled selected>
                      Select Register As* (Can Choose Upto 2)
                    </option>
                    <option value="pandit">Pandit ji</option>
                    <option value="astrologer">Astrologers</option>
                    <option value="motivational-guide">
                      Motivational Guide
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className=" text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="primary-skill"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Primary Skill *
                  </label>
                  <select
                    name="primary-skill"
                    id="primary-skill"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                  >
                    <option value="" disabled selected>
                      Select Primary Skill* (Can Choose Upto 4)
                    </option>
                    <option value="vedic-puja">Vedic Puja</option>
                    <option value="karamkand">Karamkand</option>
                    <option value="kathavachak">Kathavachak</option>
                    <option value="vastu">Vastu</option>
                    <option value="vedic-astrology">Vedic Astrology</option>
                    <option value="tarot">Tarot</option>
                    <option value="lal-kitab">Lal Kitab</option>
                    <option value="nadi-astrology">Nadi Astrology</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className=" text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="secondary-skills"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Secondary Skills *
                  </label>
                  <select
                    name="secondary-skills"
                    id="secondary-skills"
                    className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                  >
                    <option value="" disabled selected>
                      Select Secondary Skills (Can Choose Upto 6)
                    </option>
                    <option value="birth-chart-analysis">
                      Birth Chart Analysis
                    </option>
                    <option value="gemstone-consultation">
                      Gemstone Consultation
                    </option>
                    <option value="kundali-matching">Kundali Matching</option>
                    <option value="marriage-consultation">
                      Marriage Consultation
                    </option>
                    <option value="love-relationship-advice">
                      Love and Relationship Advice
                    </option>
                    <option value="spiritual-healing">
                      Spiritual/Reiki Healing
                    </option>
                    <option value="puja-path-consultation">
                      Puja-path Consultation
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <IoIosArrowDown className=" text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="experience"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Experience (In Years) *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    value={count}
                    placeholder="Experience* (In Year)"
                    className="px-5 py-[12px] rounded-lg text-gray-500 border w-full shadow-lg text-sm outline-none"
                  />
                  <button
                    onClick={increment}
                    className="absolute right-2 top-8 px-1 text-gray-400"
                    disabled={count === 100}
                  >
                    <IoIosArrowUp />
                  </button>
                  <button
                    onClick={decrement}
                    className="absolute right-2 bottom-2 px-1 text-gray-400"
                    disabled={count === 1}
                  >
                    <IoIosArrowDown />
                  </button>
                </div>

                <div className="">
                  <label
                    htmlFor="dob"
                    className="block text-sm text-[#E5644E] pb-1"
                  >
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="Choose DOB"
                    className="px-5 py-[12px] rounded-lg border w-full shadow-md text-sm text-gray-400 outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="md:block hidden w-1/3">
              <img
                className="rounded-2xl max-h-[1600px]"
                src="/images/about.png"
                alt="Login form image"
              />
            </div>
          </div>

          <div className="py-8">
            <h1 className=" text-xl font-bold py-3">Partner details:</h1>
            <form action="#" className="grid grid-cols-3 gap-5">
              <div className="relative">
                <label
                  htmlFor="Fname"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Enter Your First name"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="Lname"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Enter Your Last name"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email ID*"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="mobile"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Mobile Number *
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter Your Mobile Number*"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="gender"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Gender *
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="px-5 py-[12px] bg-white text-gray-400 rounded-lg border w-full shadow-lg text-sm appearance-none outline-none"
                >
                  <option value="" disabled selected>
                    Select your Gender*
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDown className=" text-gray-400" />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="dob"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Choose DOB"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-md text-sm text-gray-400 outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="text"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Place Of Birth *
                </label>
                <input
                  type="text"
                  name="placeofbirth"
                  id="placeofbirth"
                  placeholder="Place Of Birth"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="text"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Current Address *
                </label>
                <input
                  type="text"
                  name="currentaddress"
                  id="currentaddress"
                  placeholder="Current Address"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="state"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="country"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="city"
                  className="block text-sm text-[#E5644E] pb-1"
                >
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="px-5 py-[12px] rounded-lg border w-full shadow-lg text-sm outline-none"
                />
              </div>
            </form>
          </div>
          <div className="mt-6 text-sm flex justify-between items-center">
            <button className="hover:border register text-white bg-[#E5644E] w-80 rounded-lg shadow-md shadow-gray-500 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
              Submit Details
            </button>
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
};

export default Joinpage;
