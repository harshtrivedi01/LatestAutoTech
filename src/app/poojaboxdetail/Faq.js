import React from 'react';

const Faq = ({ faqs }) => {
  return (
    <div className='faq p-60 bg-[#FFDCC0]'>
      {/* FAQ Section */}
      <div className="container">
        <h2 className="text-2xl font-bold mb-4 ">FAQ</h2>
        <div className="space-y-4">
          {/* Dynamically render FAQs based on the response */}
          {faqs?.map((faq, index) => (
            <details
              key={index}
              className="p-4 border border-b bg-white cursor-pointer"
            >
              <summary className="font-medium text-gray-500">{faq?.title || 'No Title'}</summary>
              <p className="mt-2 text-sm text-gray-700">
                {faq?.description || 'No description available.'}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
