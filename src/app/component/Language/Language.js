import { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";

export default function Language() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [loading, setLoading] = useState(true); // Loading state

  const header = {
    "language": "en",
    "userId": "2",
    "user_type": "user",
    "Device_id": "upen",
    "Longitude": JSON.parse(localStorage.getItem("formData") || "{}").Longitude,
    "Latitude": JSON.parse(localStorage.getItem("formData") || "{}").Latitude,
    "Ip_address": JSON.parse(localStorage.getItem("formData") || "{}").Ip_address,
    "web_token": localStorage.getItem("authToken"),
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      let formData = new FormData();
      formData.append("type", "languages");

      const response = await axios.post(
        "https://dakshhousing.com/satsambhav/websiteapi/profile",
        formData,
        { headers: header }
      );

      console.log("Language API Response:", response.data);
      setLanguages(response.data.data.language_list || []);
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <>
      <div className="group relative hidden md:flex cursor-pointer py-2">
        <div className="flex items-center justify-between bg-white px-4">
          <span className="menu-hover flex gap-1 items-center text-lg font-bold text-black">
            <TbWorld className="text-xl" />
            {loading ? "Loading languages..." : selectedLanguage}
          </span>
          <RiArrowDropDownLine className="text-3xl font-bold" />
        </div>

        <div className="invisible absolute top-10 z-50 flex w-full flex-col bg-gray-100 py-1 rounded-b-xl px-4 text-gray-800 shadow-xl group-hover:visible">
          {loading ? (
            <p className="text-gray-500 text-sm text-center">Loading...</p>
          ) : languages.length > 0 ? (
            languages.map((lang) => (
              <a
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.language)}
                className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2 cursor-pointer"
              >
                {lang.language}
              </a>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No languages available</p>
          )}
        </div>
      </div>
    </>
  );
}
