"use client"
import Image from "next/image";
import Homefirst from "./Home/Homefirst";
import Homesecond from "./Home/Homesecond";
import Homethird from "./Home/Homethird";
import Homefourth from "./Home/Homefourth";
import Homefive from "./Home/Homefive";
import Homesix from "./Home/Homesix";
import { Homeseven } from "./Home/Homeseven";
import Homeeight from "./Home/Homeeight";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {

  
  const [userLocation, setUserLocation] = useState({ latitude: "", longitude: "" });
  const [ipAddress, setIpAddress] = useState("");
  const [pujaData, setPujaData] = useState([]);

  // Fetch user's IP address
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  // Fetch user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  // Fetch Puja Data only after location & IP are available
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude && ipAddress) {
      fetchPujaData();
    }
  }, [userLocation, ipAddress]);

  const fetchPujaData = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "home");
  
      // formData.append("page", "1"); // Ensure it's a string
  
      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/home",
        formData,
        {
          headers: {
            // Convert header keys to lowercase manually
            "language": "en",
            "user_type": "guest",
            "longitude": String(userLocation.longitude).toLowerCase(),
            "latitude": String(userLocation.latitude).toLowerCase(),
            "ip_address": String(ipAddress).toLowerCase(),
          },
        }
      );
  
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
   <Homeseven  pujaData={pujaData}/>
   <Homeeight  pujaData={pujaData}/>
 
 </>
  );
}
