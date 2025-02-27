import Image from "next/image";

import success from "../../../public/failed.png"
export default function page(){
return(

    <>
        {/* component */}
<div className="bg-white content-center border-y h-screen">
  <div className="bg-white p-6  md:mx-auto">
   <div className="flex justify-center mb-4">
   <Image src={success} width={50} height={50}/>
   </div>
    <div className="text-center">
      <h3 className="md:text-2xl text-base text-[#F21E1EED] font-semibold text-center ">FAILED!</h3>
      <p className="text-[#4A4A4A] my-5 font-semibold">We were unable to process your payment. Please check your <br/> payment details and try again. If the issue persists, contact <br/> your bank or try a different payment method.</p>
      
      <div className="py-10 text-center">
        <a href="/" className="px-20 rounded-lg bg-[#F21E1EED] hover:bg-indigo-500 text-white font-semibold py-3">
      Try Again
        </a>
      </div>
    </div>
  </div>
</div>
    </>
)

}