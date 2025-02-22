import { CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function List({ pujaData }) {
  console.log("Puja Data in List Component:", pujaData);

  // Get the data, either from pujaData or pujaDatalist
  const dataToDisplay = pujaData?.puja_list || pujaData?.data?.puja_list || [];

  return (
    <div className="max-w-7xl mx-auto my-8 px-2">
      {dataToDisplay.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-600">
          No results found
        </div>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
          {dataToDisplay.map((puja, index) => (
            <li key={index}>
              <div className="max-w-sm bg-white h- border border-gray-200 rounded-lg shadow-sm bg-gray-800 border-gray-700">
              <a href={`poojadetail/${puja.id}`} className="flex justify-center">
                    <img className=" h-60 rounded-xl" src={"https://www.punyasetu.com/assets/images/logo.png"||puja.image || "/images/default.jpg"} alt={puja.title} />
                  </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#BA1A1A] text-center text-white">
                    {puja.name || "Puja Title"}
                  </h5>
                  <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
                  <p className="mb-3 font-normal font-bold text-xl text-gray-400">
                    {puja.sub_title || "Puja description goes here."}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 text-xl text-gray-400">
                    {puja.short_description || "Puja description goes here."}
                  </p>
                  <p className="my-2 w-1/2 text-lg flex gap-2 items-center">
                    <CalendarIcon className="text-yellow-600" /> {puja.date}
                  </p>
                  <Link href={`poojadetail/${puja.id}`}>
                    <button className="text-center block w-full uppercase text-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-green-600 hover:bg-green-700 focus:ring-green-800">
                      Participate
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
