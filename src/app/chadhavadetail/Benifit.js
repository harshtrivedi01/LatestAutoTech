

  import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Benifit = ({detail}) =>  {
      const { t } = useTranslation();
    return (
      <div className='py-20' id="benefit-section">
    

     
        <div className='container max-w-7xl mx-auto'>

        <h2 className='title text-black'>{t("Benefitsofofferings")}</h2>

        {detail?.benefits?.length > 0 ? (
   <ul className="list-disc pl-3  ">
    {detail?.benefits?.map((benefit) => (
      <li key={benefit?.id} className="p-4 ">
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: benefit?.benefits_description}}></p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500">{t("Benefitsofofferings")} N/A</p>
)}


      
        </div>
        
      </div>
    );
  }
  
  export default Benifit;
  

