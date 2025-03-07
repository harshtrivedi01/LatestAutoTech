"use client"; 
import Image from "next/image";
import service1 from "../../../public/Assests/Service/service (1).jpg";
import service2 from "../../../public/Assests/Service/service (2).jpg";
import service3 from "../../../public/Assests/Service/service (3).jpg";
import service4 from "../../../public/Assests/Service/service (4).jpg";
import service5 from "../../../public/Assests/Service/service (5).jpg";
import service6 from "../../../public/Assests/Service/service (6).jpg";
import Heading from "../component/Headingname/Heading";
import DOMPurify from "dompurify";
import { useState } from "react";

const MAX_WORDS = 10;

export default function Homesecond({ module_category_details }) {
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded state for each category

  if (!module_category_details) {
    return <div>Loading...</div>;
  }

  const serviceImages = {
    "Guru Ji": service1,
    "Pandit Ji": service2,
    "Pooja": service3,
    "Granth": service4,
    "Online Classes": service5,
    "Live Darshan": service6,
  };

  const bookingUrls = {
    "Guru Ji": "#",
    "Pandit Ji": "#",
    "Pooja": "/poojabooking",
    "Granth": "#",
    "Online Classes": "#",
    "Live Darshan": "#",
  };

  const toggleReadMore = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the state for this category
    }));
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] px- pb-10">
        <div id="features" className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <Heading text="Our Service" />
          </div>
          <ul className="grid grid-cols-1 px-5 gap-6 text-center text-slate-700 md:grid-cols-3">
            {module_category_details.slice(0, 6).map((category) => {
              const { modulecategory, short_description, id } = category;
              const imageSrc = serviceImages[modulecategory] || service1;
              const bookingUrl = bookingUrls[modulecategory]; // Default to "#" if no URL is found

              const words = short_description.split(" ");
              const shortText = words.slice(0, MAX_WORDS).join(" ");
              const isLongText = words.length > MAX_WORDS;
              const isExpanded = expandedItems[id] || false;

              return (
                <li
                  key={id}
                  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A] px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center flex flex-col justify-between"
                  style={{ backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "400px" }} // Ensures cards have equal height
                >
                  <div>
                    <Image src={imageSrc} alt={modulecategory} className="mx-auto h-[136px] w-[119px]" onError={(e) => (e.target.src = "/images/logo.png")} />
                    <div className="my-3 font-display">
                      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] py-1 bg-clip-text text-transparent">
                        {modulecategory}
                      </h1>
                    </div>
                    <div>
                      <p
                        className="mt-1.5 text-[17px] leading-6 mx-2 text-black"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(isExpanded ? short_description : shortText),
                        }}
                      ></p>
                      {isLongText && (
                        <p
                          className="text-[#E5644E] underline mb-2 text-sm cursor-pointer"
                          onClick={() => toggleReadMore(id)}
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a 
                      href={bookingUrl} 
                      // target="_blank" 
                      rel="noopener noreferrer"
                     className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]"
                    >
                      Book Now
                    </a>
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
