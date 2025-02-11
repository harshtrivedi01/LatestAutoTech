"use client";

import Content from './Content';
import Faq from './Faq';
import './Poojadetail.css'


export default function Poojaboxdetailpage() {
 

  return (
    <>
    <section className="poojadetail p-60">
    <div className="container">
    <div className="flex flex-col justify-center ">
  <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-4xl mx-auto border border-white bg-white">
    <div className="w-full  bg-white grid place-items-center">
      <img     src="/images/poojabox.png" alt="tailwind logo" className="h-80 " />
    </div>
    <div className="w-full md:w-2/2 bg-white flex flex-col space-y-2 p-3">
    <h3 className="font-black text-[#BA1A1A] border-b border-b-[#BA1A1A] md:text-3xl text-xl">Ganpati Pooja Box</h3>
      <div className="flex justify-between item-center">
        
        
        <div className="flex items-center my-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-gray-600 font-bold text-sm ml-1">
            4.96
            <span className="text-gray-500 font-normal">(76 reviews)</span>
          </p>
        </div>
        
        <div className>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 my-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
       
      </div>
     
      <p className="md:text-lg text-gray-500 text-lg font-bold">Samagri - Turmeric Powder 100 gms ,
         Kumkum. 50 gms, gmSamagri - Turmeric Powder 100 gms , Kumkum. 50 gms, gmSamagri - 
         Turmeric Powder 100 gms , Kumkum. 50 gms</p>
         <p>
        <span className="text-3xl font-bold text-orange-600">₹745</span>
        <span className="text-sm text-slate-900 line-through ms-2">M.R.P ₹699  </span> <span className="text-red-700 text-lg ms-3">(50% off)</span>
      </p>
  
       <div className="flex gap-2">
       <button className="p-2 px-16 shadow-black shadow-2xl text-lg text-white bg-[#E5644E] rounded-lg hover:bg-[#7B2502]">
        Buy Now
      </button>
       
        <a href="/cartpoojabox" className="flex items-center justify-center rounded-lg border-2 border-[#E5644E] px-10 py-2.5 text-center text-sm font-medium text-[#E5644E] hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 text-[#E5644E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart</a>
            
       </div>
    </div>
  </div>
</div>

    </div>
    </section>
  <Content/>
  <Faq/>
    </>

  
  );
}
