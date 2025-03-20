"use client";
import Image from "next/image";

import Anahata from "../../../public/Assests/Service/Anahata.png";
import Heading from "../component/Headingname/Heading";
import Kalash from "./../../../public/Assests/Service/Kalash.png";
import music from "./../../../public/Assests/Service/music.png";
import DOMPurify from "dompurify";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Aboutsection({description,bottomName,link,images, aboutus_imagehed1,
  aboutus_imagehed2,
  aboutus_imagehed3, 
  aboutus_imagedes1,
  aboutus_imagedes2,
  aboutus_imagedes3,
  image1,image2,image3,image4}) {

 const { t } = useTranslation();
  return (
    <div className="relative w-full  bg-white">
      <div
        className="container bg-[#FFFFFF] px-2 "
        style={{
          backgroundImage: `url('/images/about.jpg')`,
          backgroundSize: "cover",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          
        }}
      ><br/> <br/><br/><br/><br/><br/><br/>
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text={t("About")} color="white" />
          </div>

          <p className=" text-center text-white text-[20px] md:text-2xl"
           dangerouslySetInnerHTML={{ __html:(description) }}>
          </p>
        </div>
        <br />
        <br />
        <br /> <br />
        <br />
        <div>
          <div className=" ">
          <div className="container mx-auto px-4 py-8">
              <section className="">
            
                <div className="py-4 px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6 h-full">
    
    <div className="h-full flex flex-col">
      <div className="grid h-full">
        <a href={""} className="group relative flex flex-col h-full overflow-hidden rounded-2xl p-4 bg-white">
          <div className="relative z-10 flex flex-col gap-4">
            <h3 className="text-2xl font-medium text-[#894112]">
            { aboutus_imagehed1}
            </h3>
            <h3 className="text-lg text-black leading-7 md:text-sm lg:text-[17px]">
            {aboutus_imagedes1}
            </h3>
            <button className="p-3 w-fit text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
              <FaChevronRight className="text-[#DD531B]" />
            </button>
          </div>
          <img
             src={image1}
            alt=""
            className="absolute right-0 bottom-0 h-20 w-20 object-cover"
            onError={(e) => (e.target.src = "/images/logo.png")}
          />
        </a>
      </div>
      
      <br />

      <div className="grid h-full">
        <a href={""} className="group relative flex flex-col h-full overflow-hidden rounded-2xl px-4 pb-4 pt-40">
          <img
             src={image2}
            alt=""
            className="absolute inset-2 h-full w-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            onError={(e) => (e.target.src = "/images/logo.png")}
          />
        </a>
      </div>
    </div>

    <div className="col-span-2 sm:col-span-1 md:col-span-2 h-full flex flex-col">
      <div className="relative flex flex-col bg-white overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
        <Image
          src={music}
          alt=""
          className="absolute top-20 left-10 h-14 w-16 object-cover"
          onError={(e) => (e.target.src = "/images/logo.png")}
        />
        <div className="relative z-10 mt-10 md:mt-16 px-4 text-start md:text-left">
          <h3 className="text-xl text-black font-semibold xs:text-xl md:text-2xl">
          {aboutus_imagehed2}-{" "}
            <span className="font-normal">
            {aboutus_imagedes2}</span>
          </h3>
          <h3 className="text-xl text-black font-semibold mt-6 xs:text-xl md:text-xl">
          {aboutus_imagehed3} –{" "}
            <span className="font-normal">
            {aboutus_imagedes3}</span>
          </h3>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="p-2 px-8 shadow-black shadow-2xl mt-10 text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
            {bottomName}
            </button>
          </a>
        </div>
        <Image
          src={Anahata}
          alt=""
          className="absolute right-10 h-44 w-44 top-0 object-cover"
          onError={(e) => (e.target.src = "/images/logo.png")}
        />
      </div>
    </div>

    <div className="col-span-2 sm:col-span-1 md:col-span-2 h-full flex flex-col">
      <a href={""} className="group relative flex flex-col h-full overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
        <img
         src={image4}
          onError={(e) => (e.target.src = "/images/logo.png")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
      </a>
    </div>

  </div>
</div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}