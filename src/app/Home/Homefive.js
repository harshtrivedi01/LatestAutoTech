"use client";
import { useEffect, useState } from "react";
import Heading from "../component/Headingname/Heading";
import Link from "next/link";
import axios from "axios";

export default function Homefive() {
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
      formData.append("type", "new_puja_list");
      formData.append("page", "1"); // Ensure it's a string
  
      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/api/puja",
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
  
      setPujaData(response.data?.data?.slice(0, 3)); // Show only 3 cards
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };
  // Function to handle Participate click
  const handleParticipate = async (pujaId) => {
    try {
      let formData = new FormData();
      formData.append("puja_id", pujaId);
      formData.append("page", "1");
      formData.append("type", "new_puja_list");

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/api/puja",
        formData,
        {
          headers: {
            "language": "en",
            "user_type": "guest",
            "longitude": userLocation.longitude,
            "latitude": userLocation.latitude,
            "ip_address": ipAddress,
          },
        }
      );

      console.log("API Response:", response.data);
      alert("Participation Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      <div
        className="bg-[#FFFFFF] px-2"
        style={{
          backgroundImage: `url('/images/about.jpg')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <br /><br /><br /><br /><br /><br />
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text="Pooja Booking" color="white" />
          </div>
          <br />
        </div>

        {/* Puja Cards Section */}
        <div className="max-w-7xl mx-auto my-8 px-2">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
            {/* {pujaData?.map((puja, index) => (
              <li key={index}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="w-full rounded-xl" src={puja.image || "/images/default.jpg"} alt={puja.title} />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center dark:text-white">
                        {puja.title || "Puja Title"}
                      </h5>
                    </a>
                    <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
                    <p className="mb-3 font-normal text-gray-700 text-xl dark:text-gray-400">
                      {puja.description || "Puja description goes here."}
                    </p>
                    <button
                      onClick={() => handleParticipate(puja.id)}
                      className="inline-flex items-center w-full uppercase text-center p-3 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Participate
                    </button>
                  </div>
                </div>
              </li>
            ))} */}
          </ul>
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link href={"/poojabooking"}>
            <button className="p-2 px-8 shadow-black shadow-2xl text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
              View More
            </button>
          </Link>
        </div>

        <br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}
