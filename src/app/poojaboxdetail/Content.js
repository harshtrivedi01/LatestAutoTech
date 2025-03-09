import React from 'react';
import { useTranslation } from 'react-i18next';
  
  const Content = ({description}) =>  {
      const { t } = useTranslation();
	return (
	  <div className='p-60 bg-grey content'>
        <div className='container'>

        <h2 className='title'>{t("AboutPooja")}</h2>
        <p className="md:text-lg text-gray-500 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: description }}>
       
  
        </p>
      
        </div>

	  </div>
	);
  }
  
  export default Content;
  