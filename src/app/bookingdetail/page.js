"use client";
import React from "react";
import { TiTick } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import { MdEmail } from "react-icons/md";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const page = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="p-60 overflow-hidden">
          <div className="container">
            <div className="bg-[#F37A32] grid xl:grid-cols-2 lg:xl:grid-cols-2 md:xl:grid-cols-2  sm:grid-cols-1 rounded-3xl border-8 border-[#FFDCC0] shadow-xl ">
              <div className="flex flex-col justify-start xl:p-10 lg:p-10 md:p-8 sm:p-0 pt-5 px-4">
                <h4 className="xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-white font-semibold">
                  Watch Pooja Video
                </h4>
                <p className="xl:text-xl lg:text-xl lg-text-lg sm:text-[14px] text-[14px] font-medium text-white mt-4">
                  Watch the sacred rituals of your online-booked pooja. Listen
                  as Pandit Ji chants your name during this spiritual ceremony.
                </p>
              </div>

              <div className="flex justify-end items-end ">
                <img
                  src="/images/booking.png"
                  alt="Pooja Booking"
                  className="xl:h-80  xl:w-96 lg:h-80  lg:w-96 md:h-80  md:w-96 sm:h-40  sm:w-40 h-52 w-64 rounded-3xl"
                />
              </div>
            </div>

            <div className="py-10">
              <h3 className=" text-2xl font-bold">
                Pooja and Participant’s Details
              </h3>

              <div className=" grid xl:grid-cols-2 lg:grid-cols-2 md:xl:grid-cols-2 sm:xl:grid-cols-1 grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-4 xl:py-10 lg:py-10 md:py-8 sm:py-5 py-5">
                <div className=" border-2 border-[#D4CBCB] rounded-xl p-4">
                  <h3 className="xl:text-xl lg:text-xl text-lg font-bold py-1">
                    Pooja Vastu Shanti Pooja
                  </h3>
                  <p className=" text-[#8B8282] xl:text-lg lg:text-lg text-base">
                    For Blessing of Debt-Relief and Abundance of Wealth
                  </p>
                  <hr className="border-[1px] border-[#DFDBDB]  my-4" />
                  <h4 className="xl:text-lg lg:text-lg text-base text-[#BA1A1A] font-semibold">
                    Package of 4 members:{" "}
                    <span className="text-green-700">Rs.4000/-</span>{" "}
                  </h4>
                  <p className="text-gray-700 text-[17px] py-1">
                    Order time & date :{" "}
                    <span className="text-gray-400">2:00pm , 20 nov 2024</span>
                  </p>
                </div>

                <div className=" border-2 border-[#D4CBCB] rounded-xl p-4">
                  <h3 className="xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] text-[#5F5B5B] font-bold py-1">
                    Members : Gaurav khandelwal{" "}
                    <span className="text-[#F37A32]">+3</span>
                  </h3>
                  <hr className="border-[1px] border-[#DFDBDB]  my-2" />
                  <h3 className="xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] text-[#5F5B5B] font-bold py-1">
                    Gotra : Aurva
                  </h3>
                  <hr className="border-[1px] border-[#DFDBDB]  my-2" />
                  <h3 className="xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] text-[#5F5B5B] font-bold py-1">
                    Address : Jaipur
                  </h3>
                </div>
              </div>
            </div>

            
              <div className=" grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 items-start w-full xl:max-w-7xl lg:max-w-7xl">
                <div className=" flex flex-col items-center text-center py-5">
                  <div className="bg-[#4CAF50] w-14 h-14 rounded-full flex justify-center items-center">
                    <TiTick className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-bold mt-2">
                    Pooja Booking Confirmed
                  </h4>
                  <img
                    src="/images/imagecomplete.png"
                    alt="Pooja Booking"
                    className="h-32 w-60 rounded-3xl mt-2"
                  />
                </div>

                <div className="flex flex-col items-center text-center mx-8  py-5">
                  <div className="bg-[#4CAF50] w-14 h-14 rounded-full flex justify-center items-center">
                    <TiTick className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-bold mt-2">
                    Your pooja was conducted on{" "}
                    <span className="text-[#F37A32]">1st Jan</span>
                  </h4>
                </div>

                <div className=" flex flex-col items-center text-center mx-8 py-5">
                  <div className="bg-[#4CAF50] w-14 h-14 rounded-full flex justify-center items-center">
                    <SlCalender className="text-2xl text-white" />
                  </div>
                  <h4 className="text-lg font-bold mt-2">
                    Conducted from 11:00 AM - 1:00 PM
                  </h4>
                </div>

                <div className=" flex flex-col items-center text-center py-5 ">
                  <div className="bg-[#4CAF50] w-14 h-14 rounded-full flex justify-center items-center">
                    <MdEmail className="text-3xl text-white" />
                  </div>
                  <h4 className="text-lg font-bold mt-2">
                    Message from Pandit Ji
                  </h4>
                </div>
              </div>
            

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
