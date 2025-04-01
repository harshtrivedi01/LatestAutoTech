import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function List({ pujaData }) {
  const { t } = useTranslation();
  const dataToDisplay = pujaData?.puja_list || pujaData?.data?.puja_list || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust as needed
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);

  // Paginated data
  const paginatedData = dataToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      {paginatedData.length === 0 ? (
        <div className="text-center text-lg sm:text-xl font-semibold text-gray-600">
          {t("Noresultsfoundfor")}
        </div>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-2">
            {paginatedData.map((puja, index) => (
              <li key={index} className="">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full">
                  {/* Image Section */}
                  <Link href={`poojadetail/${puja.id}`} className="flex justify-center">
                    <img
                      className="h-56 w-full object-fill rounded-t-lg"
                      src={puja.image || "/images/logo.png"}
                      alt={puja.title}
                      onError={(e) => (e.target.src = "/images/logo.png")}
                    />
                  </Link>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h5 className="mb-2 text-xl font-bold text-red-800 text-center">
                      {puja.name || "Puja Title"}
                    </h5>
                    <p className="border-b-2 border-[#BA1A1A] mx-auto my-2 w-24"></p>

                    <p className="mb-1 text-lg font-semibold text-gray-900 text-center">
                      {puja.sub_title
                        ? puja.sub_title.split(" ").slice(0, 12).join(" ") + (puja.sub_title.split(" ").length > 12 ? "..." : "")
                        : ""}
                    </p>

                 

                    {/* Date Section */}
                    {puja.date && (
                      <div className="flex justify-center items-center gap-2 text-gray-500 font-medium text-sm my-2">
                        <CalendarIcon className="text-yellow-600 w-5 h-5" />
                        {puja.date}
                      </div>
                    )}

                    {/* Button at Bottom */}
                    <div className="mt-auto">
                      <Link href={`poojadetail/${puja.id}`}>
                        <button className="text-center block w-full uppercase p-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                          {t("PARTICIPATE")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed border-2" : "bg-orange-600 hover:bg-orange-800"}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {t("Previous")}
              </button>
              <span className="px-4 py-2  rounded-lg">
                {t("Page")} {currentPage} {t("of")} {totalPages}
              </span>
              <button
                className={`px-4 py-2 rounded-lg border-2 text-white ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-800"}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                {t("Next")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}