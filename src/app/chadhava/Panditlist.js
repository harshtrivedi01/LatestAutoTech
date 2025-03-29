'use client';
import { VscSettings } from "react-icons/vsc";
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../lib/axiosInstance";
import { useTranslation } from "react-i18next";

export default function Poojabookingpage() {
  const { t } = useTranslation();
  const [pujaData, setPujaData] = useState([]);
  const [pujaDatalist, setPujaDatalist] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
	  fetchPujaData("");
	  fetchPujaDatalist();
  }, []);

  const fetchPujaData = async (search) => {
	try {
	  let formData = new FormData();
	  formData.append("type", "chadhava_search");
	//   formData.append("page", "1");
	  formData.append("search", search);

	  const response = await api.post("/chadhava.php", formData);

	  setPujaData(response.data?.data || []); 
	} catch (error) {
	  console.error("Error fetching puja data:", error);
	}
  };

  const fetchPujaDatalist = async () => {
	try {
	  let formData = new FormData();
	  formData.append("type", "chadhava_list");
	//   formData.append("page", "1");
	//   // formData.append("page", "1"); // Ensure it's a string
  
	  const response = await api.post("/chadhava.php", formData);
  
	  console.log("Puja API Response:", response.data);
	  setPujaDatalist(response.data)
	 
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
	  <div className="font-sans pt-10 overflow-hidden">
		<div className="container max-w-7xl  mx-auto">
		  <div className=" items-center gap-12">
			<div>
			<h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
				{t("ChadhavaSeva")}
				</h2>
				<p className="leading-relaxed text-lg text-gray-600">
				Book experienced Chadhava online for all your puja needs. Expert Vedic rituals for weddings, havans, griha pravesh, and more. Hassle-free booking with verified and knowledgeable priests. Get the best guidance for your spiritual ceremonies today!
				</p>

		  
			  <div className="mt-5">
				<form onSubmit={handleSearch} className="flex px-4 py-2 rounded-md border-2 border-orange-400 bg-white overflow-hidden font-[sans-serif]">
				  <input 
					type="text"
					placeholder={t("SearchChadhavahere")}
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
	<List pujaData={searchQuery ? pujaData : pujaDatalist} />

	  </div>
	</div>
  );
}
