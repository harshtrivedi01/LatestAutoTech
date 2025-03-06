import React from 'react';
import Cart from './Cart';
import Testimonials from '../poojadetail/Testimonials';
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const Page = () => {
  return (
    <div className="py-6 ">
      <Cart />
       <Testimonials/>
    </div>
  );
};

export default Page;
