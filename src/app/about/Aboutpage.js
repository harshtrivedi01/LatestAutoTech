"use client"


import { MdArrowOutward } from "react-icons/md";

import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
export default function Aboutpage({heading,description,image}) {
  const { t } = useTranslation();
  return (
    <>
      <section className="container pt-20 md:pt-20 bg-[#FFF8F5]">
        <div className=" mx-auto px-8 lg:flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold leading-none">{heading}</h1>
            <p className="text-lg lg:text-xl mt-6 t" dangerouslySetInnerHTML={{ __html:(description) }}></p>
            <p className="mt-8 md:mt-12">
              <button
                type="button"
                className="text-white hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-2xl shadow-2xl px-2 lg:px-10 lg:py-3 py-2 text-center bg-orange-600 hover:bg-orange-700 focus:ring-orange-800"
                style={{ backgroundColor: "#E5644E" }}
              >
               {t("LearnMore")}
              </button>
            </p>

          </div>
          <div className="lg:w-1/2 items-center flex justify-center">
            <img src={image||"/images/aboutimage.png"}
               onError={(e) => (e.target.src ="/images/aboutimage.png") }
            /></div>
          <div className="flex absolute w-80 hidden lg:flex lg:right-20 lg:top-96 sm:w-1/2 bg-white md:w-80 mb-8 md:mb-0 p-5 shadow-md rounded-xl mr-3 ml-3">
            <div className="w-full text-left">

              <div className="flex gap-5 border-b-2 border-gray-300">
                <p className="text-lg text-orange-600 text-left leading-normal mb-2 font-lf-normal">
                {t("moreUser")}
                </p>
                <MdArrowOutward className="border border-2 border-orange-400 text-red-700 rounded-full p-2 text-5xl" />
              </div>

              <span className="flex items-center justify-between mt-2">
                <div className="flex mr-2">
                  <img className="border-2 border-white rounded-full h-14 w-14 -mr-6" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />


                  <img className="border-2 border-white rounded-full h-14 w-14 -mr-6" src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
                  <img className="border-2 border-white rounded-full h-14 w-14 -mr-6" src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />

                </div>

                <div className="float-right">
                  <p className="text-2xl font-bold float-right">10K +</p>

                </div>
              </span>
            </div>
          </div>

        </div>
      </section>
  
     
    </>
  )
}