// "use client";
// import Image from "next/image";
// import service1 from "../../../public/images/logo.png";
// import service2 from "../../../public/images/logo.png";
// import service3 from "../../../public/images/logo.png";
// import service4 from "../../../public/images/logo.png";
// import service5 from "../../../public/images/logo.png";
// import service6 from "../../../public/images/logo.png";
// import Heading from "../component/Headingname/Heading";
// import DOMPurify from "dompurify";
// import { useTranslation } from "react-i18next";

// const MAX_WORDS = 10; // Adjust word limit here

// export default function Homesecond({ module_category_details }) {
//   const { t } = useTranslation();

//   if (!module_category_details) {
//     return <div></div>;
//   }

//   const serviceImages = {
//     "Guru Ji": service1,
//     "Pandit Ji": service2,
//     "Pooja": service3,
//     "Granth": service4,
//     "Online Classes": service5,
//     "Live Darshan": service6,
//   };

//   const bookingUrls = {
//     "चढावा": "#",
//     "Pooja Box": "/poojabox",
//     "Pooja": "/poojabooking",
//     "Granth": "#",
//     "Online Classes": "#",
//     "Live Darshan": "#",
//     "गुरु जी": "#",
//     "पूजा": "/poojabooking",
//     "पूजा बॉक्स": "/poojabox",
//     "ऑनलाइन कक्षाएं": "#",
//     "लाइव दर्शन": "#",
//   };

//   return (
//     <div>
//       <div className="bg-[#FFFFFF] py-5">
//         <div id="features" className="mx-auto max-w-6xl">
//           <div className="flex justify-center">
//             <Heading text={t("Services")} />
//           </div>
//         <ul className="flex flex-wrap justify-center gap-6 text-center text-slate-700 px-5">

//             {module_category_details.slice(0, 6).map((category) => {
//               const { modulecategory, short_description, id, image } = category;
//               // const imageSrc = image || service1;
//               const imageSrc =  service1;
//               const bookingUrl = bookingUrls[modulecategory] || "#";

//               // Show limited words
//               const words = short_description?.split(" ") || [];
//               const limitedText =
//                 words.length > MAX_WORDS
//                   ? words.slice(0, MAX_WORDS).join(" ") + "..."
//                   : short_description;

//               return (
//                 <li
//                   key={id}
//                   className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A] px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center flex flex-col justify-between"
//                   style={{
//                     backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     minHeight: "400px",
//                   }}
//                 >
//                   <div>
//                     <img
//                       src={imageSrc}
//                       alt={modulecategory}
//                       width={119}
//                       height={136}
//                       className="mx-auto h-[136px] w-[119px] object-contain"
//                       onError={(e) => (e.target.src = "/images/logo.png")}
//                     />
//                     <div className="my-3 font-display">
//                       <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] py-1 bg-clip-text text-transparent">
//                         {modulecategory}
//                       </h1>
//                     </div>
//                     <div>
//                       <p
//                         className="mt-1.5 text-[17px] leading-6 mx-2 text-black"
//                         dangerouslySetInnerHTML={{
//                           __html: DOMPurify.sanitize(limitedText),
//                         }}
//                       ></p>
//                     </div>
//                   </div>
//                   <div className="mt-auto">
//                     <a
//                       href={bookingUrl}
//                       rel="noopener noreferrer"
//                       className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]"
//                     >
//                       {t("BookNow")}
//                     </a>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import Heading from "../component/Headingname/Heading";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

const MAX_WORDS = 10; // Adjust word limit here

export default function Homesecond({ module_category_details }) {
  const { t } = useTranslation();

  if (!module_category_details) {
    return <div></div>;
  }

  // ✅ Use direct paths for images
  const serviceImages = {
    "Pooja": "/images/Pooja.png",
    "Pooja Box": "/images/Poojaboxservice.png",
    "Chadhava": "/images/Chadhava.png",

    "पूजा": "/images/Pooja.png",
    "पूजा बॉक्स": "/images/Poojaboxservice.png",
    "चढ़ावा": "/images/Chadhava.png",
  };

  const bookingUrls = {
    "चढ़ावा": "/chadhava",
    "Pooja Box": "/poojabox",
    "Pooja": "/poojabooking",
    "Granth": "#",
    "Online Classes": "#",
    "Live Darshan": "#",
    "Chadhava": "/chadhava",
    "गुरु जी": "#",
    "पूजा": "/poojabooking",
    "पूजा बॉक्स": "/poojabox",
    "ऑनलाइन कक्षाएं": "#",
    "लाइव दर्शन": "#",
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] py-5">
        <div id="features" className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <Heading text={t("Services")} />
          </div>
          <ul className="grid grid-cols-1 px-5 gap-6 text-center text-slate-700 md:grid-cols-3">
            {module_category_details.slice(0, 6).map((category) => {
              const { modulecategory, short_description, id } = category;
              const imageSrc = serviceImages[modulecategory] || "/images/logo.png";
              const bookingUrl = bookingUrls[modulecategory] || "#";

              // Show limited words
              const words = short_description?.split(" ") || [];
              const limitedText =
                words.length > MAX_WORDS
                  ? words.slice(0, MAX_WORDS).join(" ") + "..."
                  : short_description;

              return (
                <a
                  href={bookingUrl}
                  key={id}
                  className="rounded-tl-[40px] rounded-br-[40px] rounded-lg border-[5.65px] border-[#BA1A1A] px-6 py-8 shadow-sm relative overflow-hidden bg-cover bg-center flex flex-col justify-between"
                  style={{
                    backgroundImage: `url('/Assests/Service/BOOK POOJA.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "400px",
                  }}
                >
                  <div>
                    {/* ✅ Correct Image Usage */}
                    <Image
                      src={imageSrc}
                      alt={modulecategory}
                      width={119}
                      height={136}
                      className="mx-auto h-[156px] w-[219px] object-cover"
                    />
                    <div className="my-3 font-display">
                      <h1 className="text-4xl font-bold bg-gradient-to-b from-[#E14303] to-[#7B2502] py-1 bg-clip-text text-transparent">
                        {modulecategory}
                      </h1>
                    </div>
                    <div>
                      <p
                        className="mt-1.5 text-[17px] leading-6 mx-2 text-black"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(limitedText),
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a
                      href={bookingUrl}
                      rel="noopener noreferrer"
                      className="px-8 py-2 mt-4 shadow-gray-400 shadow-xl text-white bg-[#E5644E] rounded-xl hover:bg-[#7B2502]"
                    >
                      {t("BookNow")}
                    </a>
                  </div>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
