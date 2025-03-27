"use client";
import React, { Suspense, useState } from "react";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import AuthGuard from "../component/AuthGuard";
import Payment from "./Payment";
import Testimonials from "../poojadetail/Testimonials";
export default function page() {
  
  return (
    <Suspense fallback={<div></div>}>
    <AuthGuard>
    <div className="container max-w-7xl mx-auto ">
      <div className=" py-10">
       

<Payment/>

      </div>      
    </div>
     <Testimonials/>
    </AuthGuard>
    </Suspense>
  );
};


