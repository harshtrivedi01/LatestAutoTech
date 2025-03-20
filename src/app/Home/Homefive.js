"use client";
import { useEffect, useState } from "react";
import Heading from "../component/Headingname/Heading";
import Link from "next/link";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Homefive({pujaData}) {
  const { t } = useTranslation();
 console.log(pujaData?.data?.puja_list)
 // Function to decode HTML entities
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

  return (
    <div className=" relative w-full  bg-white">
      <div
        className="container bg-[#FFFFFF] px-2"
        style={{
          backgroundImage: `url('/images/about.jpg')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <br /><br /><br /><br /><br /><br />
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text={t("Pooja")} color="white" />
          </div>
          <br />
        </div>

        {/* Puja Cards Section */}
        <div className="max-w-7xl mx-auto my-8 px-2">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
  {pujaData?.data?.puja_list.map((puja, index) => (
    <li key={index}>
      <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700">
        {/* Image Section */}
        <a href={`poojadetail/${puja.id}`} className="flex justify-center">
          <img className="h-60  rounded-t-lg" 
               src={puja.image||"/images/logo.png"} 
               alt={puja.title} 
               onError={(e) => (e.target.src = "/images/logo.png")}
               />
        </a>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center text-red-600">
            {puja.name || "Puja Title"}
          </h5>
          <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
          <p className="mb- font-bold text-black text-lg flex-grow">
  {puja.description ? (
    <span
      dangerouslySetInnerHTML={{
        __html:
          // If the description contains encoded HTML entities, decode it first
          // We decode it manually to ensure HTML tags are rendered correctly
          decodeHtml(puja.description).length > 75
            ? decodeHtml(puja.description).substring(0, 75) + "..."
            : decodeHtml(puja.description),
      }}
    />
  ) : (
    // Fallback text if no description is available
 " "
  )}
</p>


<p className="mb-3 font-normal text-gray-700 text-base flex-grow">
  {puja.short_description ? (
    // Check if the description has HTML entities, decode it first, then truncate it
    <span
      dangerouslySetInnerHTML={{
        __html:
          decodeHtml(puja.short_description).split(" ").length > 12
            ? decodeHtml(puja.short_description).split(" ").slice(0, 12).join(" ") + "..."
            : decodeHtml(puja.short_description),
      }}
    />
  ) : (
    // Fallback text if no short description is available
   " "
  )}
</p>



          {/* Button */}
          <Link href={`poojadetail/${puja.id}`}>
            <button className="w-full uppercase text-sm font-medium p-3 text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800">
            {t("PARTICIPATE")}
            </button>
          </Link>
        </div>
      </div>
    </li>
  ))}
</ul>

        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link href={"/poojabooking"}>
            <button className="p-2 px-8 shadow-black shadow-2xl text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
            {t("ViewMore")}
            </button>
          </Link>
        </div>

        <br /><br /><br /><br /><br /><br />
      </div>
    </div>

//     <div className="relative w-full min-h-screen bg-white">
//     <div
//       className="bg-[#FFFFFF] px-2 "
//       style={{
//         backgroundImage: `url('/images/about.jpg')`,
//         backgroundSize: "cover",
//         backgroundSize: "100% 100%",
//         backgroundRepeat: "no-repeat",
        
//       }}   
//       ><br/><br/><br/><br/><br/><br/>
//         <div className="mx-auto max-w-6xl relative">
//           <div className="flex justify-center">
//             <Heading text="Pooja Booking" color="white" />
//           </div>

//          <br/>
//         </div>
       
//         <div className="max-w-7xl mx-auto my-8 px-2">
 
//   <ul className="grid gap-8 sm:grid-cols-2 justify-center lg:grid-cols-3 p-2 xl:p-5">
//     <li >
//     <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700">
//   <a href="#">
//     <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
//   </a>
//   <div className="p-5">
//   <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  text-white">Saturday ‘City of Mahakaal’ Special</h5>
//     </a>
//     <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
//     <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
//     </a>
//     <p className="mb-3 font-normal text-gray-700 text-xl text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
//     <a href="#" 
//     className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800">
//     Participate
    
//     </a>
//   </div>
// </div>

//     </li>
//     <li >
//     <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700">
//   <a href="#">
//     <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
//   </a>
//   <div className="p-5">
//   <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  text-white">Saturday ‘City of Mahakaal’ Special</h5>
//     </a>
//     <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
//     <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
//     </a>
//     <p className="mb-3 font-normal text-gray-700 text-xl text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
//     <a href="#" 
//     className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800">
//     Participate
    
//     </a>
//   </div>
// </div>

//     </li>
//     <li >
//     <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700">
//   <a href="#">
//     <img className="w-full rounded-xl" src="/images/BANNER.jpg 1.png" alt="" />
//   </a>
//   <div className="p-5">
//   <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center  text-white">Saturday ‘City of Mahakaal’ Special</h5>
//     </a>
//     <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
//     <a href="#">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white">11,000 Hanuman Mool Mantra Jaap and Hanuman Chalisa Path</h5>
//     </a>
//     <p className="mb-3 font-normal text-gray-700 text-xl text-gray-400">for Mental and Physical Strength to Destroy Negativity in Life</p>
//     <a href="#" 
//     className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800">
//     Participate
    
//     </a>
//   </div>
// </div>

//     </li>
   
//   </ul>
// </div>
// <div className="flex justify-center">
//                         <Link href={"/poojabooking"}>
// <button className="p-2 px-8 shadow-black shadow-2xl  text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
//                             View More
//                           </button></Link>
// </div>

// <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

//       </div>
//     </div>
  );
}
