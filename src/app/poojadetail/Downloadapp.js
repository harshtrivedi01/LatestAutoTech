import React from 'react';
import Image from "next/image";
import app from "../../../public/Assests/Service/downloadapp.png";
  
  const Downloadapp = () =>  {
	return (
        <div className="bg-[#FFEEE2] p-60"> 
        <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl   bg-[#FFD7AA] rounded-[70px]">
       <div className="flex flex-col items-center justify-between w-full  lg:flex-row">
         <div className="mb-16 lg:mb-0 lg:max-w-lg ps-6">
           <div className="max-w-xl mb-6">
            
             <h2 className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-none max-w-lg mb-6 whitespace-nowrap">
             Get <span className="inline-block text-[#9E200B]"> Punyasetu</span> App
              
             </h2>
             <p className="text-gray-700 my-10 text-base md:text-2xl">
             Experience divine blessings at your fingertips!</p>
           </div>
           <h2 className='mb-2 mt-3 f-18'><b>Scan to Download the App</b></h2>
           <i className='qr'>

           <img src="/images/qr.png" className="object-cover object-top w-full h-auto mx-auto" alt="" height="100%" width="" />
           </i>
           <div className="flex items-center space-x-3">
             <a href="/" className="block transition duration-300 hover:shadow-lg">
               <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover object-top w-full h-auto mx-auto" alt="" height="100%" width="" />
             </a>
             <a href="/" className="block transition duration-300 hover:shadow-lg">
               <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover object-top w-full h-auto mx-auto" alt="" height="100%" width="" />
             </a>
           </div>
         </div>
         <div className="flex items-center justify-end float-right lg:w-1/2 rounded">
       
         <Image className="object-cover  rounded-[70px]" src={app} alt="" />
         </div>
       </div>
     
     </div>
    </div>
	);
  }
  
  export default Downloadapp;
  