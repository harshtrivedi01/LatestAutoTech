// import React from 'react';
  
//   const Benifit = () =>  {
// 	return (
// 	  <div className='p-60 ' id="benefit-section">
    

     
//         <div className='container'>

//         <h2 className='title'>Pooja Benefits</h2>
//         <ul className='ul-list'>
//           <li>
//           To get your desired partner
//           The Sarva Vashikaran Mahatantric Bhairav Puja is highly effective for the attainment of love and helps you marry your desired partner.
//           </li>
//           <li>
//           To get your desired partner
//           The Sarva Vashikaran Mahatantric Bhairav Puja is highly effective for the attainment of love and helps you marry your desired partner.
//           </li>
//           <li>
//           To get your desired partner
//           The Sarva Vashikaran Mahatantric Bhairav Puja is highly effective for the attainment of love and helps you marry your desired partner.
//           </li>
//         </ul>

      
//         </div>
        
// 	  </div>
// 	);
//   }
  
//   export default Benifit;
  

  import React from 'react';
  
  const Benifit = ({detail}) =>  {
	return (
	  <div className='p-60 ' id="benefit-section">
    

     
        <div className='container'>

        <h2 className='title'>Pooja Benefits</h2>

        {detail?.puja_benefits?.length > 0 ? (
   <ul className="list-disc pl-3 ">
    {detail?.puja_benefits?.map((benefit) => (
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
  