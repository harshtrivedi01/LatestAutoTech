import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import Kalash from "../../../public/Assests/Service/Kalash.png";

export default function Cards (){

    return(
        <>
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <h1 className="text-center font-bold lg:text-4xl text-2xl my-14">
            How does PUNYASETU Online Pooja Works?
            </h1>
  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
  <div className="grid shadow shadow-2xl rounded-2xl ">
  <div className="" />
                           <span className="flex items-center  gap-2 text-xl font-medium  p-4 xs:text-2xl md:text-2xl text-[#894112]">
                           <span className="items-center"> 
                            <Image src={Kalash} alt="" className="  h-16 w-16 " />
                            </span> 
                            Choose Your Pooja
                           </span>
            
                           <h3 className="z-10 text-lg  text-black  p-4 xs:text-lg md:text-lg leading-10 text-light">
                             Stay informed about upcoming spiritual and cultural
                             festivals.
                           </h3>
                           <div>
                             <button className="p-3 mt-4 m-5 text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                               <FaChevronRight className="text-[#DD531B]" />
                             </button>
                           </div>
                       </div>
                       <div className="grid shadow shadow-2xl rounded-2xl ">
  <div className="" />
                           <span className="flex items-center  gap-2 text-xl font-medium  p-4 xs:text-2xl md:text-2xl text-[#894112]">
                           <span className="items-center"> 
                            <Image src={Kalash} alt="" className="  h-16 w-16 " />
                            </span> 
                            Choose Your Pooja
                           </span>
            
                           <h3 className="z-10 text-lg  text-black  p-4 xs:text-lg md:text-lg leading-10 text-light">
                             Stay informed about upcoming spiritual and cultural
                             festivals.
                           </h3>
                           <div>
                             <button className="p-3 mt-4 m-5 text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                               <FaChevronRight className="text-[#DD531B]" />
                             </button>
                           </div>
                       </div>

                       <div className="grid shadow shadow-2xl rounded-2xl ">
  <div className="" />
                           <span className="flex items-center  gap-2 text-xl font-medium  p-4 xs:text-2xl md:text-2xl text-[#894112]">
                           <span className="items-center"> 
                            <Image src={Kalash} alt="" className="  h-16 w-16 " />
                            </span> 
                            Choose Your Pooja
                           </span>
            
                           <h3 className="z-10 text-lg  text-black  p-4 xs:text-lg md:text-lg leading-10 text-light">
                             Stay informed about upcoming spiritual and cultural
                             festivals.
                           </h3>
                           <div>
                             <button className="p-3 mt-4 m-5 text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                               <FaChevronRight className="text-[#DD531B]" />
                             </button>
                           </div>
                       </div>
  </div>
</div>

        
        </>
    )
}