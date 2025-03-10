"use client";
import Image from "next/image";
import app from "../../../public/Assests/Service/downloadapp.png";
import { useTranslation } from "react-i18next";

export const Homeseven = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#FFEEE2] px-5 py-10 sm:py-20">
      <div className="max-w-screen-xl mx-auto bg-[#FFD7AA] rounded-[40px] sm:rounded-[70px]  py-10  sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Text Section */}
          <div className="text-center lg:text-left px-6 sm:px-12">
            <h2 className="text-3xl sm:text-6xl font-bold text-gray-900">
            {t("Get")} <span className="text-[#9E200B]">{t("PunyaSetu")}</span>  {t("app")}
            </h2>
            
            <p className="text-gray-700 mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:text-left leading-relaxed">
            {t("banner")}
</p>

            <i className=' flex justify-center lg:justify-start items-center'>

<img src="/images/qr.png" className="object-cover object-toph-40 w-40  " alt="" height="100%" width="" />
</i>
<h1 className="text-black text-2xl"> {t("DownloadAppfrom")}</h1>
            <div className="flex justify-center lg:justify-start items-center gap-3 mt-8">
              
              <a href="https://apps.apple.com/us/app/punyasetu/id6683311967" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover w-full h-auto" alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=free.temple.mandir.darshan.dev.puja.panditji.sri.guruji.pravachan" className="w-32 transition duration-300 hover:shadow-lg">
                <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover w-full h-auto" alt="Google Play" />
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end ">
            <Image className="max-w-full h-auto" src={app} alt="Download App" />
          </div>
        </div>
      </div>
    </div>
  );
};
