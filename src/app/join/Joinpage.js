"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Faq from "../poojadetail/Faq";

const JoinUs = () => {
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
        <div className=" 2xl:px-32 2xl:py-16 xl:p-16 lg:p-16 md:p-16 sm:p-10 p-10 overflow-hidden ">
          <div className="container">
            <div className="items-center gap-12">
              <div>
                <h2 className="lg:text-3xl xl:text-3xl md:text-2xl text-2xl font-bold mb-4">
                  Pandit Registration
                </h2>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <section className="bg-gray-100 xl:py-16 lg:py-14 md:py-12 sm:py-10 py-8 px-4">
        <div className="rounded-2xl m-auto bg-white max-w-7xl xl:py-14 lg:py-12 md:py-10 sm:py-5 py-5">
          <div className="lg:flex xl:flex md:flex sm:flex-none lg:flex-row md:flex-col xl:flex-row max-w-full gap-10 justify-center items-center xl:px-10 lg:px-10 md:px-10 sm:px-5 px-3">
            <div className="">
              <h2 className="font-bold xl:text-3xl lg:text-3xl  md:text-3xl sm:text-2xl text-2xl  text-[#E5644E] xl:pb-10 lg:pb-10 md:pb-8 sm:pb-5 pb-5">
                Register Now !
              </h2>

              <form
                action="#"
                className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full gap-5"
              >
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
                <div className="mt-6 text-sm flex justify-between items-center">
                  <button className="hover:border register text-white bg-[#E5644E] w-80 rounded-lg shadow-md shadow-gray-500 py-[12px] px-5 hover:scale-100 font-semibold duration-300">
                    Submit Details
                  </button>
                </div>
              </form>
            </div>

            <div className="md:block hidden">
              <img
                className="rounded-2xl max-h-[1600px]"
                src="/images/about.png"
                alt="Login form image"
              />
            </div>
          </div>
        </div>
      </section>

      <Faq />
    </div>
  );
};

export default JoinUs;
