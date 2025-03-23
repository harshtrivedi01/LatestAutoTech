"use client";
import React, { Suspense, useState } from "react";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import AuthGuard from "../component/AuthGuard";
import Payment from "./Payment";
export default function page() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AuthGuard>
    <div className="container  ">
      <div className=" p-0">
       

<Payment/>

      </div>      
    </div>
   
    </AuthGuard>
    </Suspense>
  );
};


