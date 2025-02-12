import React from 'react';
  
  const Aboutpage = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default Aboutpage;
  import Image from "next/image";


export default function Aboutpage () {
    return (
        <>
       <section className="pt-20 md:pt-40">
  <div className="container mx-auto px-8 lg:flex">
    <div className="text-center lg:text-left lg:w-1/2">
      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Spiritual Services for Inner Peace and Transformation</h1>
      <p className="text-lg lg:text-2xl mt-6 t">At Punyasetu, we offer a range of spiritual services <br/>
         designed to guide you on your journey to inner peace,<br/> enlightenment, and personal transformation. </p>
      <p className="mt-8 md:mt-12">
      <button
                  type="button"
                  className="text-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-2xl shadow-2xl px-2 lg:px-10 lg:py-3 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  style={{ backgroundColor: "#E5644E" }}
                >
                  Learn More
                </button>
      </p>
    
    </div>
    <div className="lg:w-1/2">
   <Image src={"/images/aboutimage.png"}/></div>
  </div>
</section>

        </>
    )
}