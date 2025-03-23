

  import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Benifit = ({detail}) =>  {
      const { t } = useTranslation();
	return (
	  <div className='p-60 ' id="benefit-section">
    

     
        <div className='container max-w-7xl mx-auto'>

        <h2 className='title text-black'>{t("PoojaBenefits")}</h2>

        {detail?.benefits?.length > 0 ? (
   <ul className="list-disc pl-3 ">
    {detail?.benefits?.map((benefit) => (
      <li key={benefit?.id} className="p-4 ">
        <p className="text-gray-700">{benefit?.benefits_description}</p>
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
  