import { MdSms } from "react-icons/md";
import List from "./List";
import Link from "next/link";


export default function Panditdetailpage () {
return (
    <>
     <section className="poojadetail p-60">
    <div className="container">
    <div className="flex flex-col justify-center ">
  <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-4xl mx-auto border border-white bg-white">
    <div className="w-full  bg-white grid place-items-center">
      <img     src="/images/panditbooking.png" alt="tailwind logo" className="h-80 " />
    </div>
    <div className="w-full md:w-2/2 bg-white flex flex-col space-y-2 p-3">
    <h3 className="font-semibold md:text-3xl text-xl">Mr. Ravi Kumar <span className="font-medium">(Jaipur)</span></h3>
      <div className="flex justify-between item-center">
        
        
        <div className="flex items-center my-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-gray-600 font-bold text-sm ml-1">
        
            <span className="text-gray-500 font-normal">(176 reviews) | Experience 10+ </span>
          </p>
        </div>
       
       
      </div>
     
      <p className="md:text-lg text-gray-500 text-lg font-bold">English</p>
         <p>
        <span className="text-2xl my-5 font-bold text-orange-600">Booking Fees - ₹745</span>
        
      </p>
  
       <div className="flex gap-2 my-5">
      <a
      herf="/cartpandit" className="p-2 w-full text-center shadow-black shadow-2xl text-lg text-white bg-[#EE9220] rounded-lg hover:bg-[#7B2502]">
        Book Pooja
   
      </a>
       
        <a href="/cartpoojabox" className="flex items-center justify-center rounded-lg border-2 bg-green-900 w-full py-2 text-center text-lg font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
     <MdSms/>
     Q&A</a>
            
       </div>
       <button className="border  border-gray-400 text-gray-400 flex items-center gap-2 justify-center bg-white py-2 shadow shadow-2xl rounded-lg">
       <MdSms/> <span>Pervious Chat</span>
       </button>
    </div>
  </div>
</div>

    </div>
    </section>

    <List/>
    </>
)
}