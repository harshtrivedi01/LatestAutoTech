

  import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Benifit = ({detail}) =>  {
      const { t } = useTranslation();
	return (
	  <div className='py-20' id="benefit-section">
    

     
        <div className='container max-w-7xl mx-auto'>

        <h2 className='title text-black'>{t("PoojaBenefits")}</h2>

        {detail?.benefits?.length > 0 ? (
   <ul className="list-disc pl-3  ">
    {detail?.benefits?.map((benefit) => (
      <li key={benefit?.id} className="p-4 ">
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: benefit?.benefits_description}}></p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500">{t("PoojaBenefits")} N/A</p>
)}


      
        </div>
        
	  </div>
	);
  }
  
  export default Benifit;
  



//   import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";

// const Benefit = ({ detail }) => {
//   const { t } = useTranslation();
//   const WORD_LIMIT = 15; // Set word limit before "Read More"

//   // ✅ State that updates dynamically when `detail?.benefits` changes
//   const [expanded, setExpanded] = useState([]);

//   useEffect(() => {
//     if (detail?.benefits?.length) {
//       setExpanded(Array(detail.benefits.length).fill(false));
//     }
//   }, [detail?.benefits]);

//   const toggleExpand = (index) => {
//     setExpanded((prev) => {
//       const newExpanded = [...prev];
//       newExpanded[index] = !newExpanded[index];
//       return newExpanded;
//     });
//   };

//   return (
//     <div id="benefit-section">
//       <div className="container max-w-7xl mx-auto">
//      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("PoojaBenefits")}</h2>

//         {detail?.benefits?.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-4">
//             {detail?.benefits?.map((benefit, index) => {
//               const words = benefit?.benefits_description?.split(" ") || [];
//               const isLongText = words.length > WORD_LIMIT;

//               return (
//                 <div
//                   key={benefit?.id}
//                   className="relative bg-white  p-6 flex flex-col text-start "
//                 >
//                   {/* Number Icon (Flag Style) */}
//                   <div className="absolute top-8 -left-7 bg-orange-600 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
//                     {index + 1}
//                   </div>

//                   {/* Benefit Description with Read More / Read Less */}
//                   <p className="text-black font-semibold mt-4 text-start">
//                       This is the heading area heading area heading area 
//                   </p>
//                   <p className="text-gray-700 mt-4">
//                     {expanded[index]
//                       ? benefit?.benefits_description
//                       : words.slice(0, WORD_LIMIT).join(" ") + (isLongText ? "..." : "")}
//                   </p>

//                   {isLongText && (
//                     <button
//                       className="mt-2 text-orange-500 hover:underline text-start flex justify-start"
//                       onClick={() => toggleExpand(index)}
//                     >
//                       {expanded[index] ? t("Read Less") : t("Read More")}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-gray-500">{t("PoojaBenefits")} N/A</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Benefit;
