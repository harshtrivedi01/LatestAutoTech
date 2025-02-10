'use client';
import { VscSettings } from "react-icons/vsc";
import List from "./List";
export default function Poojabookingpage() {
 

  return (


  <div className="bg-[#FFEEE2]">
<div className="font-sans px-6 py-12 overflow-hidden">
  <div className="max-w-7xl max-md:max-w-md mx-auto">
    <div className=" items-center gap-12">
      <div>
        <h2 className=" lg:text-3xl md:text-2xl text-3xl font-bold mb- lg:!leading-[55px]">Upcoming Poojas on Punyasetu</h2>
        <p className="  leading-relaxed text-lg text-gray-600">
        Perform sacred rituals from the comfort of your home. Book a pooja in your name and gotra, receive a recorded video of the ceremony, 
        and get the divine Aashirwad Box delivered to you. Experience spiritual fulfillment and divine blessings with Punyasetu.</p>

        <div className="font-sans p-4">
     
  <ul className="flex max-sm:flex-col gap-x-2 gap-y-4 w-max rounded-2xl">
  <li id="homeTab" className="tab flex flex-col justify-center items-start text-5xl font-bolder min-w-[70px] cursor-pointer transition-all">
  <VscSettings />
    </li>
    <li id="homeTab" className="tab flex flex-col justify-center items-center border-2 bg-[#FA8128] hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg  hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
    Pooja Essentials
    </li>
    <li id="settingTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-gray-500 hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
     
    Krishna Pooja
    </li>
    <li id="profileTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-gray-500 hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
      
    Divine Articles
    </li>
    <li id="inboxTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-gray-500 hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
      
    Divine Articles
    </li>
    <li id="notificationTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-gray-500 hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
      
    Divine Articles
    </li>
    <li id="notificationTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-gray-500 hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
      
    Divine Articles
    </li>
  </ul>
 
</div>

        <div className="mt-5">
        <div className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden font-[sans-serif]">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 mr-3 rotate-90">
    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
    </path>
  </svg>
  <input type="email" placeholder="Search Something..." className="w-full outline-none bg-transparent text-gray-600 text-lg" />
</div>

        </div>
      </div>
     
    </div>
  </div>
</div>

<List/>

  </div>
  );
}
