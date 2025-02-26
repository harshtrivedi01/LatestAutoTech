"use client"
import { useEffect, useState } from "react";
import Homeeight from "../Home/Homeeight";
import Homesecond from "../Home/Homesecond";
import Faq from "../poojadetail/Faq";
import Cards from "./Cards";

import List from "./List";
import api from "../lib/axiosInstance";
import Testimonials from "../component/Testimonials";



export default function Servicepage () {
  const [pujaData, setPujaData] = useState([]);

  useEffect(() => {
      fetchPujaData();   
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "service");
  
      const response = await api.post("/service", formData); // Use the new axios instance
  
      console.log("Puja API Response:", response.data);
      setPujaData(response.data.data)
     
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };
    return (
<>
 <div className="bg-[#FFEEE2]">
      <div className=" p-60 overflow-hidden">
        <div className="container">
          <div className="items-center gap-12">
            <div>
              <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
              Our Service
              </h2>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <List module_category_details={pujaData?.module_category_details}/>
    <div className="bg-gray-100">
    <Cards onlinepoojawork={pujaData?.onlinepoojawork} />
    </div>
   <Testimonials pujaData={pujaData?.testimonials}/>
</>
    )
}