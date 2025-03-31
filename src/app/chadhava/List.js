import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function List({ pujaData }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (window.location.pathname === "/chadhava") {
      localStorage.removeItem("activeSection");
      localStorage.removeItem("activeSubscriptionTab");
    }
  }, []);

  const dataToDisplay = pujaData?.chadhava_list || pujaData?.data?.chadhava_list || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);

  const paginatedData = dataToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto my-8 px-2">
      {paginatedData.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-600">
          {t("Noresultsfoundfor")}
        </div>
      ) : (
        <>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
            {paginatedData.map((puja, index) => (
              <li key={index} className="h-full">
                <Link href={`chadhavadetail/${puja.id}`}>
                  <div className="bg-white rounded-lg shadow-lg bg-gray-800 border-gray-700 flex flex-col min-h-[400px] h-full">
                    {/* Image Section */}
                    <a href={`chadhavadetail/${puja.id}`} className="flex justify-center object-cover">
                      <img
                        className="h-52 w-full object-cover rounded-t-lg"
                        src={puja.image || "/images/logo.png"}
                        alt={puja.title}
                        onError={(e) => (e.target.src = "/images/logo.png")}
                      />
                    </a>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-red-800 text-center">
                        {puja.name || "Puja Title"}
                      </h5>
                      <p className="border-b-2 border-[#BA1A1A] mx-20 my-2"></p>
                      <p className="mb-1 font-semibold text-lg text-black flex-grow">
                        {puja.sub_title
                          ? puja.sub_title.split(" ").slice(0, 12).join(" ") + (puja.sub_title.split(" ").length > 12 ? "..." : "")
                          : " "}
                      </p>
                      {puja.short_description && (
                        <p className="mb-1 text-gray-700 text-base flex-grow">
                          {puja.short_description.split(" ").slice(0, 12).join(" ") + (puja.short_description.split(" ").length > 12 ? "..." : "")}
                        </p>
                      )}

                      {/* Date Section */}
                      {puja.date && (
                        <p className="my-2 w-1/2 text-base flex gap-2 text-gray-400 font-bold items-center">
                          <CalendarIcon className="text-yellow-600" /> {puja.date}
                        </p>
                      )}

                      {/* Button at Bottom */}
                      <div className="mt-auto">
                        <Link href={`chadhavadetail/${puja.id}`}>
                          <button className="block w-full uppercase p-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                            {t("BookNow")}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
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
