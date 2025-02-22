"use client";
import Image from "next/image";
import app from "../../../public/Assests/Service/downloadapp.png";

export const Homeseven = () => {
  return (
    <div className="bg-[#FFEEE2] px-5 py-10 sm:py-20">
      <div className="max-w-screen-xl mx-auto bg-[#FFD7AA] rounded-[40px] sm:rounded-[70px]  py-10  sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Text Section */}
          <div className="text-center lg:text-left px-6 sm:px-12">
            <h2 className="text-3xl sm:text-6xl font-bold text-gray-900">
              Get <span className="text-[#9E200B]">Punyasetu</span> App
            </h2>
            
            <p className="text-gray-700 mt-6 text-base sm:text-lg md:text-2xl">
              Experience divine blessings at your fingertips! Access online Pooja services, book expert Pandit Ji, and explore Damgiri spiritual guidance—all in one app.
            </p>
            <i className='qr'>

<img src="/images/qr.png" className="object-cover object-toph-40 w-40 " alt="" height="100%" width="" />
</i>
<h1 className="text-black text-2xl">Download App from</h1>
            <div className="flex justify-center lg:justify-start items-center gap-3 mt-8">
              <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover w-full h-auto" alt="App Store" />
              </a>
              <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover w-full h-auto" alt="Google Play" />
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center sm:justify-end">
            <Image className="max-w-full h-auto" src={app} alt="Download App" />
          </div>
        </div>
      </div>
    </div>
  );
};
