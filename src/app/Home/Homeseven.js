"use client";
import Image from "next/image";
import app from "../../../public/Assests/Service/downloadapp.png";
export const Homeseven = () => {
    return (
     <div className="bg-[#FFEEE2] p-20"> 
         <div className=" py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl   bg-[#FFD7AA] rounded-[70px]">
        <div className="flex flex-col items-center justify-around w-full mb-10 lg:flex-row">
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
             
              <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-none max-w-lg mb-6">
              Get <span className="inline-block text-[#9E200B]"> Punyasetu</span> App
               
              </h2>
              <p className="text-gray-700 my-10 text-base md:text-2xl">
              Experience divine blessings at your fingertips! Access online Pooja services, book expert Pandit Ji, and explore Damgiri spiritual guidance—all in one app.</p>
            </div>
            <div className="flex items-center space-x-3">
              <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
              </a>
              <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
              </a>
            </div>
          </div>
          <div className="flex items-center justify-end float-right lg:w-1/2">
        
          <Image className="object-cover" src={app} alt="" />
          </div>
        </div>
      
      </div>
     </div>
    );
  };