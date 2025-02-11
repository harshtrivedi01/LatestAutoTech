'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

export default function Poojaboxpage() {
  const [userLocation, setUserLocation] = useState({ latitude: "", longitude: "" });
  const [ipAddress, setIpAddress] = useState("");
  const [pujaData, setPujaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch user's IP address
  useEffect(() => {
    
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('type', 'find_account');
    data.append('phone', '8619807171');
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://13.235.230.223/api/account',
      headers: { 
        ...data
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  
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

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude && ipAddress) {
      fetchPujaData(""); // Fetch all pujas initially
    }
  }, [userLocation, ipAddress]);

  const fetchPujaData = async (search) => {
    try {
      let formData = new FormData();
      formData.append("type", "new_puja_search");
      formData.append("page", "1");
      formData.append("search", search);

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/api/puja",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "userId":"2",
            "language": "en",
            "user_type": "guest",
            "device_id":"BA482D66-2558-477B-86FA-E1B59397A92B",
            "longitude": userLocation.longitude,
            "latitude": userLocation.latitude,
            "ip_address": ipAddress,
          },
        }
      );

      setPujaData(response.data?.data || []); 
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPujaData(searchQuery);
  };



  return (
    <div className="bg-[#FFEEE2]">
      <div className="font-sans p-60 overflow-hidden">
        <div className="container">
          <div className="items-center gap-12">
            <div>
              <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
              Pooja Box on Punyasetu
              </h2>
              <p className="leading-relaxed text-lg text-gray-600">
              Perform sacred rituals from the comfort of your home.
               Book a pooja in your name and gotra, receive a recorded video of the ceremony,
                and get the divine Aashirwad Box delivered to you. Experience spiritual fulfillment
                 and divine blessings with Punyasetu.
              </p>

         
              <div className="mt-5">
                <form onSubmit={handleSearch} className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden font-[sans-serif]">
                  <input 
                    type="text"
                    placeholder="Search Something..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full outline-none bg-transparent text-gray-600 text-lg"
                  />
                  <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 ml-3 rotate-90">
                      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <List pujaData={pujaData} />
      </div>
    </div>
  );
}
