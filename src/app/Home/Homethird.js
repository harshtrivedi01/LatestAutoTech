"use client";
import Image from "next/image";
import DOMPurify from "dompurify";
import Anahata from "../../../public/Assests/Service/Anahata.png";
import Heading from "../component/Headingname/Heading";
import Kalash from "../../../public/Assests/Service/Kalash.png";
import music from "../../../public/Assests/Service/music.png";

import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Homethird({pujaData}) {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <div
        className="bg-[#FFFFFF] px-2 "
        style={{
          backgroundImage: `url('/images/about.jpg')`,
          backgroundSize: "cover",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          
        }}
      ><br/> <br/><br/><br/><br/><br/><br/>
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-center">
            <Heading text="About" color="white" />
          </div>

          <p 
  className="text-center text-white text-base sm:text-lg md:text-xl lg:text-2xl px-4 md:px-8 lg:px-12"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pujaData?.data?.aboutus_description) }}
></p>

        </div>
        <br />
       
       
        <br />
        <div>
          <div className=" ">
            <div className="container mx-auto px-4 py-8">
              <section className="">
                <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 h-full">
                    <div className="gap-5">
                      <div className="grid ">
                        <a
                          href={""}
                          className="group relative flex flex-col overflow-hidden rounded-2xl p-8 pt-40 bg-white"
                        >
                          <div className="absolute inset-0 " />
                          <h3 className="z-10 text-2xl font-medium  absolute top-0 left-0 p-4 xs:text-2xl md:text-1xl text-[#894112]">
                         { pujaData?.data?.aboutus_imagehed1}
                          </h3>{" "}
                          <br />
                          <h3 className="z-10 text-lg  text-black absolute top-20 left-0 p-4 md:my-3 xs:text-lg md:text-sm  lg:text-[17px] leading-10 text-light">
                    {      pujaData?.data?.aboutus_imagedes1}
                          </h3>
                          <div>
                            <button
                             href={pujaData?.data?.aboutus_link}
                             className="p-3 mt-4  text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                              <FaChevronRight className="text-[#DD531B]" />
                            </button>
                          </div>
                          <img
                            src={pujaData?.data?.aboutus_images.image1}
                            alt=""
                            className="absolute right-0 h-20 w-20 bottom-0"
                            onError={(e) => (e.target.src = "/images/logo.png")}
                          />
                        </a>
                      </div>
<br/>
                      <div className="grid mt-5">
                        <a
                        href={""}
                          className="group relative flex flex-col h-[226.94px] overflow-hidden rounded-2xl px-4 pb-4 pt-40"
                        >
                          <img
                            src={pujaData?.data?.aboutus_images.image2}
                            alt=""
                            className="absolute inset-2 h-full w-full rounded-2xl   group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            onError={(e) => (e.target.src = "/images/logo.png")}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
                      <div
                       
                        className=" relative flex flex-col bg-white overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow"
                      >
                        <div className="absolute inset-0 " />
                        <Image
                          src={music}
                          alt=""
                          className="absolute top-20 left-10 h-14 w-16 top-0"
                          onError={(e) => (e.target.src = "/images/logo.png")}
                        />
                        <h3 className="z-10 text-xl text-black font-semibold absolute top-40 left-0 p-4 xs:text-xl md:text-2xl mx-4 ">
                        {pujaData?.data?.aboutus_imagehed2}-{" "}
                          <span className="font-normal">
                          {pujaData?.data?.aboutus_imagedes2}
                          </span>
                        </h3>{" "}
                        <br />
                        <br /><br/>
                        <h3 className="z-10 text-xl text-black font-semibold absolute top-72 left-0 p-4 xs:text-xl md:text-xl mx-4 ">
                        {pujaData?.data?.aboutus_imagehed3} –{" "}
                          <span className="font-normal">
                          {pujaData?.data?.aboutus_imagedes3}
                          </span>
                        </h3>{" "}
                        <br />
                    
                        <a
  href={pujaData?.data?.aboutus_link}
  target="_blank"
  rel="noopener noreferrer"
  className="z-10"
>
  <button className="p-2 px-8 shadow-black shadow-2xl ms-4 mt-44 text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
  {pujaData?.data?.aboutus_bottom_name}
  </button>
</a>

                     
                        <Image
                          src={Anahata}
                          alt=""
                          className="absolute right-10 h-44 w-44 top-0"
                          onError={(e) => (e.target.src = "/images/logo.png")}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
                      <a
href={""}
                        className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow"
                      >
                         <img
                             src={pujaData?.data?.aboutus_images.image4}
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
