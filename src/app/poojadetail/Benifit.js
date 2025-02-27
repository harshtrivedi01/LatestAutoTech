

  import React from 'react';
  
  const Benifit = ({detail}) =>  {
	return (
	  <div className='p-60 ' id="benefit-section">
    

     
        <div className='container'>

        <h2 className='title text-black'>Pooja Benefits</h2>

        {detail?.benefits?.length > 0 ? (
   <ul className="list-disc pl-3 ">
    {detail?.benefits?.map((benefit) => (
      <li key={benefit?.id} className="p-4 ">
        <p className="text-gray-700">{benefit?.benefits_description}</p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500">No benefits available.</p>
)}


      
        </div>
        
	  </div>
	);
  }
  
  export default Benifit;
  