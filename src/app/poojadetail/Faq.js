import React from 'react';
  
  const Faq = () =>  {
	return (
	  <div className='faq p-60  bg-grey'>
         {/* FAQ Section */}
      <div className="container">
        <h2 className="text-2xl font-bold mb-4 text-center">FAQ</h2>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <details
              key={index}
              className="p-4 border rounded-lg bg-white cursor-pointer"
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
  