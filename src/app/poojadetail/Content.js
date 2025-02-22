import React from 'react';
  
  const Content = ({detail}) =>  {
	return (
	  <div className='p-60 bg-grey content'  id="about-section" >
        <div className='container'>

        <h2 className='title text-black'>About Pooja</h2>
        <p >
       {detail?.puja_detail?.puja_description}
  
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
  



  // import React from 'react';
  
  // const Content = ({detail}) =>  {
	// return (
	//   <div className='p-60 bg-grey content'  id="about-section" >
  //       <div className='container'>

  //       <h2 className='title'>About Pooja</h2>
  //       <p >
  //      {detail.aboutus_description || " Pandit ji is known for his expertise in performing Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of Vedic rituals and mantras and has over 20 years of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, success,and the removal of obstacles.Pandit ji is known for his expertise in performing  Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of  Vedic rituals and mantras and has over 20 years of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles."}
  //       </p>
  //       {/* <p>
  //       Pandit ji is known for his expertise in performing Ganesh Pooja
  //        and Vastu Shanti Pooja. He is highly regarded for his knowledge of
  //         Vedic rituals and mantras and has over 20 years of experience conducting
  //          ceremonies that invoke the blessings of Lord Ganesha for prosperity, success,
  //           and the removal of obstacles.Pandit ji is known for his expertise in performing 
  //           Ganesh Pooja and Vastu Shanti Pooja. He is highly regarded for his knowledge of 
  //           Vedic rituals and mantras and has over 20 years of experience conducting ceremonies
  //            that invoke the blessings of Lord Ganesha for prosperity, success, and the removal of obstacles.
  //       </p> */}
  //       </div>

	//   </div>
	// );
  // }
  
  // export default Content;
  