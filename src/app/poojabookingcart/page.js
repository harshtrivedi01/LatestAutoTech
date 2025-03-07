"use client";
import React, { useState } from "react";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import AuthGuard from "../component/AuthGuard";
import Payment from "./Payment";
import Testimonials from "../poojadetail/Testimonials";


export default function page() {
  const [currentStep, setCurrentStep] = useState(2);

  const datastorage = localStorage.getItem("productdeatil");
const data = JSON.parse(datastorage)
console.log(JSON.parse(datastorage))


const datastoragepackge = localStorage.getItem("productdeatil2");
const datapackage = JSON.parse(datastoragepackge)
console.log((datapackage))
  return (
    <AuthGuard>
    <div className="cart b50 min- p-60">
      <div className="container">
      

        {/* Progress Steps */}
       

<Payment/>

      </div>
      <Testimonials/>
    </div>
    {/* <Homeeight/> */}
   
    </AuthGuard>
  );
};


