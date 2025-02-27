import Image from "next/image";

import success from "../../../public/success.png"
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
      <h3 className="md:text-2xl text-base text-[#27AE60] font-semibold text-center ">SUCCESS!</h3>
      <p className="text-[#4A4A4A] my-5 font-semibold">Your payment has been successfully processed, and your <br/> booking is confirmed</p>
      
      <div className="py-10 text-center">
        <a href="/" className="px-20 rounded-lg bg-[#27AE60] hover:bg-indigo-500 text-white font-semibold py-3">
       Back To Home
        </a>
      </div>
    </div>
  </div>
</div>
    </>
)

}