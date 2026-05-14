"use client";


export default function Navbar() {
 


  return (
    <>
      <nav className="bg-white relative w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between gap-2 mx-auto p-4 pb-2">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-5 rtl:space-x-reverse">
            <img
              src="/images/logo.png"
              className="h-6"
              alt="LatestAutoTech Logo"
            />
          </a>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden lg:flex">
            <ul className="flex flex-row justify-center space-x-8 text-lg font-semibold">
              <li>
                <a data-translate href="/phones" className="text-black hover:text-orange-700">
                  Phones
                </a>
              </li>
              <li>
                <a data-translate href="/cars" className="text-black hover:text-orange-700">
                  Cars
                </a>
              </li>
              <li>
                <a data-translate href="/bike" className="text-black hover:text-orange-700">
                  Bikes
                </a>
              </li>
              <li>
                <a data-translate href="/ev" className="text-black hover:text-orange-700">
                  EVs
                </a>
              </li>
              <li>
                <a data-translate href="/admin" className="text-black hover:text-orange-700">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Search Bar Section */}
          <div >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-[400px] px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Visible only on mobile */}
        <div className="lg:hidden py-2">
          <ul className="flex flex-row justify-center space-x-8 text-lg font-semibold">
            <li>
              <a data-translate href="/phones" className="text-black hover:text-orange-700">
                Phones
              </a>
            </li>
            <li>
              <a data-translate href="/cars" className="text-black hover:text-orange-700">
                Cars
              </a>
            </li>
            <li>
              <a data-translate href="/bike" className="text-black hover:text-orange-700">
                Bikes
              </a>
            </li>
            <li>
              <a data-translate href="/ev" className="text-black hover:text-orange-700">
                EVs
              </a>
            </li>
            <li>
              <a data-translate href="/admin" className="text-black hover:text-orange-700">
                Admin
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
