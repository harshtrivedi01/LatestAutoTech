import React from 'react';
  
  const Faq = () =>  {
	return (
	  <div className='faq p-60'>
         {/* FAQ Section */}
      <div className="container bg-[#FFDCC0] p-10">
        <h2 className="text-3xl font-bold mb-4 text-">FAQ</h2>
        <div className="space-y-">
          {Array.from({ length: 4 }).map((_, index) => (
            <details
              key={index}
              className="p-4 border  bg-white cursor-pointer"
            >
              <summary className="font-medium">How to know status of pooja?</summary>
              <p className="mt-2 text-sm text-gray-700">
                You can check the status of your pooja in the booking history section or
                via the WhatsApp number you registered with.
              </p>
            </details>
          ))}
        </div>
      </div>
	  </div>
	);
  }
  
  export default Faq;
  