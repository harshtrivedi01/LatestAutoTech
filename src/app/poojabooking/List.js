import { CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function List({ pujaData }) {
  console.log("Puja Data in List Component:", pujaData);

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
            <li key={index} className="h-full">
              <div className="bg-white  rounded-lg shadow-lg bg-gray-800 border-gray-700 flex flex-col min-h-[550px] h-full">
                {/* Image Section */}
                <a href={`poojadetail/${puja.id}`} className="flex justify-center">
                  <img
                    className="h-60  object-cove rounded-t-lg"
                    src={"https://www.punyasetu.com/assets/images/logo.png" ||puja.image}
                    alt={puja.title}
                  />
                </a>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-800 text-center text-white">
                    {puja.name || "Puja Title"}
                  </h5>
                  <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
                  <p className="mb-3 font-bold text-xl text-gray-400 flex-grow">
                    {puja.sub_title || "Puja description goes here."}
                  </p>
                  <p className="mb-3 text-gray-400 text-xl flex-grow">
                    {puja.short_description || "Puja description goes here."}
                  </p>

                  {/* Date Section */}
                  <p className="my-2 w-1/2 text-lg flex gap-2 items-center">
                    <CalendarIcon className="text-yellow-600" /> {puja.date}
                  </p>

                  {/* Button at Bottom */}
                  <div className="mt-auto">
                    <Link href={`poojadetail/${puja.id}`}>
                      <button className="text-center block w-full uppercase p-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                        Participate
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
