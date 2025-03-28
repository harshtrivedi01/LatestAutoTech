

  import { CheckCircle, CheckIcon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Benifit = ({detail}) =>  {
      const { t } = useTranslation();
    return (
      <div className='py-20' id="benefit-section">
    

     
        <div className='container max-w-7xl mx-auto'>

        <h2 className='title text-black'>{t("Benefitsofofferings")}</h2>

        {detail?.benefits?.length > 0 ? (
   <ul className="pl-3 space-y-2">  
   {detail?.benefits?.map((benefit) => (  
     <li key={benefit?.id} className="flex items-start space-x-3 p-4">  
       <CheckIcon className="text-white rounded-full bg-orange-400 w-6 h-6 p-1 mt-1 flex-shrink-0" />  
       <p className="text-gray-700 text-base leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: benefit?.benefits_description }}></p>  
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
  

