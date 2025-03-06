"use client";

import { useEffect, useState } from "react";
import Testimonials from "../poojadetail/Testimonials";
import Aboutpage from "./Aboutpage";
import Aboutsection from "./Aboutsection";
import api from "../lib/axiosInstance";

export default function Page() {
  const [pujaData, setPujaData] = useState(null);

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let data = new FormData();
      data.append("type", "aboutus");

      const response = await api.post("/aboutus", data);
      if (response.data.status === "1") {
        setPujaData(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  if (!pujaData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Aboutpage 
        heading={pujaData.aboutus_heading[0]?.heading} 
        description={pujaData.aboutus_heading[0]?.description} 
        image={pujaData.aboutus_heading[0]?.image} 
      />
      <Aboutsection 
        description={pujaData.aboutus_description} 
        bottomName={pujaData.aboutus_bottom_name} 
        link={pujaData.aboutus_link} 
        images={pujaData.aboutus_images} 
        imageHeaders={[pujaData.aboutus_imagehed1, pujaData.aboutus_imagehed2, pujaData.aboutus_imagehed3]} 
        imageDescriptions={[pujaData.aboutus_imagedes1, pujaData.aboutus_imagedes2, pujaData.aboutus_imagedes3]} 
      />
      <Testimonials testimonials={pujaData.testimonials} />
    </>
  );
}