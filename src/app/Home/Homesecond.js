'use client';
import Image from "next/image";
import service1 from "../../../public/Assests/Service/service (1).jpg";
import service2 from "../../../public/Assests/Service/service (2).jpg";
import service3 from "../../../public/Assests/Service/service (3).jpg";
import service4 from "../../../public/Assests/Service/service (4).jpg";
import service5 from "../../../public/Assests/Service/service (5).jpg";
import service6 from "../../../public/Assests/Service/service (6).jpg";
import bookpooja2 from "../../../public/Assests/Service/BOOK POOJA (1).jpg";
import bookpooja1 from "../../../public/Assests/Service/BOOK POOJA.jpg";
import Heading from "../component/Headingname/Heading";



export default function Homesecond () {

    return  (
        <div>
            <div className="bg-[#FFFFFF] px- pb-10">
  <div id="features" className="mx-auto max-w-6xl">
  
    <div className="flex justify-center">
    

        <Heading text="Our Services" />
    </div>
    <ul className=" grid grid-cols-1 px-5 gap-6 text-center text-slate-700 md:grid-cols-3">
    <li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service3} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
        Guru Ji
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>
<li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA (1).jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service1} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
      Pandit Ji
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>
<li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service6} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
      Pooja
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>
<li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA (1).jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service4} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
      Granth
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>
<li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service5} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
      Online Classes
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>
<li 
  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A]  px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA (1).jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
>
  {/* Overlay to improve text readability (optional) */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10">
    <Image src={service2} alt="" className="mx-auto h-[136px] w-[119px]" />
    <div className="my-3 font-display">
      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
      Live Darshan
      </h1>
    </div>
    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
      Book an Online Guru Ji for personalized spiritual guidance, rituals, and consultations.
    </p>
    <p className="text-[#E5644E] underline">Read More</p>
    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
      Book Now
    </button>
  </div>
</li>

    </ul>
  </div>
  <div>
  </div></div>

        </div>
    )
}