import React from 'react';
  
  const Content = ({description}) =>  {
	return (
	  <div className='p-60 bg-grey content'>
        <div className='container'>

        <h2 className='title'>About Pooja Box Includes</h2>
        <p className="md:text-lg text-gray-500 text-lg font-bold" dangerouslySetInnerHTML={{ __html: description }}>
       
  
        </p>
      
        </div>

	  </div>
	);
  }
  
  export default Content;
  