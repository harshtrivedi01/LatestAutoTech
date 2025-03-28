

  import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Content = ({detail}) =>  {
      const { t } = useTranslation();
    
	return (
	  <div className=' bg-grey content'  id="about-section" >
        <div className='py-20 container max-w-7xl mx-auto'>

        <h2 className='title'>{t("AboutPooja")} </h2>
        <p dangerouslySetInnerHTML={{ __html: detail?.puja_description}}>
     </p>
        {/* <p>
        Pandit ji is known for his expertise in performing Ganesh Pooja
         and Vastu Shanti Pooja. He is highly regarded for his knowledge of
          Vedic rituals and mantras and has over 20 years of experience conducting
           ceremonies that invoke the blessings of Lord Ganesha for prosperity, success,
            and the removal of obstacles.Pandit ji is known for his expertise in performing 
            Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of 
            Vedic rituals and mantras and has over 20 years of experience conducting ceremonies
             that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles.
        </p> */}
        </div>

	  </div>
	);
  }
  
  export default Content;
  