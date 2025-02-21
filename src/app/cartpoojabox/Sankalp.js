"use client";

import React, { useEffect, useState } from "react";

const Sankalp = ({ sendAddress  }) => {

console.log(localStorage.getItem("addressId") )
const [pujaData, setPujaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pujaDatalist, setPujaDatalist] = useState([]);
  const [sortlist, setsortlist] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Sorting state

  useEffect(() => {
    fetchPujaData();
  }, []);

const header = {
  "language": "en",
  "userId": "2",
  "user_type": "user",
  "Device_id": "upen",
  "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
  "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
  "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
  "web_token": localStorage.getItem("authToken"),
}

  const fetchPujaData = async (search) => {
    try {
      let formData = new FormData();
      formData.append("type", "product_search");
      formData.append("page", "1");
      formData.append("search", search);

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/products",
        formData,
        {
          headers: header,
        }
      );

      setPujaData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

 
  return (
    <>
    </>
  );
};

export default Sankalp;
