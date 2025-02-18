'use client'; 
import Image from "next/image";
import service1 from "../../../public/Assests/Service/service (1).jpg";
import service2 from "../../../public/Assests/Service/service (2).jpg";
import service3 from "../../../public/Assests/Service/service (3).jpg";
import service4 from "../../../public/Assests/Service/service (4).jpg";
import service5 from "../../../public/Assests/Service/service (5).jpg";
import service6 from "../../../public/Assests/Service/service (6).jpg";
import Heading from "../component/Headingname/Heading";

export default function Homesecond({ module_category_details }) {

  if (!module_category_details) {
    return <div>Loading...</div>; // Or handle the case where data is missing
  }

  const serviceImages = {
    "Guru Ji": service1,
    "Pandit Ji": service2,
    "Pooja": service3,
    "Granth": service4,
    "Online Classes": service5,
    "Live Darshan": service6,
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] px- pb-10">
        <div id="features" className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <Heading text="Our Services" />
          </div>
          <ul className="grid grid-cols-1 px-5 gap-6 text-center text-slate-700 md:grid-cols-3">
            {module_category_details.map((category) => {
              const { modulecategory } = category;
              const imageSrc = serviceImages[modulecategory] || service1; // fallback image if not found

              return (
                <li 
                  key={category.id}
                  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A] px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 z-0"></div>
                  <div className="relative z-10">
                    <Image src={imageSrc} alt={modulecategory} className="mx-auto h-[136px] w-[119px]" />
                    <div className="my-3 font-display">
                      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] bg-clip-text text-transparent">
                        {modulecategory}
                      </h1>
                    </div>
                    <p className="mt-1.5 text-[17px] leading-6 mx-2 text-black">
                      Book an Online {modulecategory} for personalized spiritual guidance, rituals, and consultations.
                    </p>
                    <p className="text-[#E5644E] underline">Read More</p>
                    <button className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]">
                      Book Now
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
