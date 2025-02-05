"use client";
import Image from "next/image";
import service1 from "../../../public/Assests/Service/service (1).jpg";
import service2 from "../../../public/Assests/Service/service (2).jpg";
import service3 from "../../../public/Assests/Service/service (3).jpg";
import service4 from "../../../public/Assests/Service/service (4).jpg";
import service5 from "../../../public/Assests/Service/service (5).jpg";
import service6 from "../../../public/Assests/Service/service (6).jpg";
import bookpooja2 from "../../../public/Assests/Service/BOOK POOJA (1).jpg";
import Anahata from "../../../public/Assests/Service/Anahata.png";
import Heading from "../component/Headingname/Heading";
import Kalash from "../../../public/Assests/Service/Kalash.png";
import music from "../../../public/Assests/Service/music.png";

import { FaChevronRight } from "react-icons/fa";

export default function Homefive() {
  return (
    <div className="relative w-full min-h-screen bg-white">
    <div
      className="bg-[#FFFFFF] px-2 "
      style={{
        backgroundImage: `url('/images/about.jpg')`,
        backgroundSize: "cover",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        
      }}   
      ><br/><br/><br/><br/><br/><br/>
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text="Pooja Booking" color="white" />
          </div>

         <br/>
        </div>
       
        <div className="max-w-7xl mx-auto my-8 px-2">
 
  <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
    <li className="relative bg-white flex flex-col justify-between border rounded-2xl shadow-md hover:shadow-teal-400">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
  </a>
  <div className="p-5">
  <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  dark:text-white">Saturday ‘City of Mahakaal’ Special</h5>
    </a>
    <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
    <a href="#" 
    className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Participate
    
    </a>
  </div>
</div>

    </li>
    <li className="relative bg-white flex flex-col justify-between border rounded-2xl shadow-md hover:shadow-teal-400">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
  </a>
  <div className="p-5">
  <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  dark:text-white">Saturday ‘City of Mahakaal’ Special</h5>
    </a>
    <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
    <a href="#" 
    className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Participate
    
    </a>
  </div>
</div>

    </li>
    <li className="relative bg-white flex flex-col justify-between border rounded-2xl shadow-md hover:shadow-teal-400">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
  </a>
  <div className="p-5">
  <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  dark:text-white">Saturday ‘City of Mahakaal’ Special</h5>
    </a>
    <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
    <a href="#" 
    className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Participate
    
    </a>
  </div>
</div>

    </li>
   
  </ul>
</div>
<div className="flex justify-center">
                        
<button className="p-2 px-8 shadow-black shadow-2xl  text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
                            View More
                          </button>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      </div>
    </div>
  );
}
