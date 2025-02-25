"use client"


import Homefirst from "./Home/Homefirst";
import Homesecond from "./Home/Homesecond";
import Homethird from "./Home/Homethird";
import Homefourth from "./Home/Homefourth";
import Homefive from "./Home/Homefive";
import Homesix from "./Home/Homesix";
import { Homeseven } from "./Home/Homeseven";
import Homeeight from "./Home/Homeeight";
import { useEffect, useState } from "react";
import api from "./lib/axiosInstance";

export default function Page() {
  const [pujaData, setPujaData] = useState([]);

  useEffect(() => {
      fetchPujaData();   
  }, []);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "home");
  
      const response = await api.post("/home", formData); // Use the new axios instance
  
      console.log("Puja API Response:", response.data);
      setPujaData(response.data)
     
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };
console.log(pujaData?.data?.slider_list)
  return (
 <>
   <Homefirst sliderList={pujaData?.data?.slider_list} />
   <Homesecond module_category_details={pujaData?.data?.module_category_details} />
   <Homethird  pujaData={pujaData}/>
   <Homefourth  pujaData={pujaData}/>
   <Homefive  pujaData={pujaData}/>
   <Homesix  pujaData={pujaData}/>
   <Homeeight  pujaData={pujaData}/>
   <Homeseven  pujaData={pujaData}/>
  
 
 </>
  );
}
