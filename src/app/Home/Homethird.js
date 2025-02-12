"use client";
import Image from "next/image";

import Anahata from "../../../public/Assests/Service/Anahata.png";
import Heading from "../component/Headingname/Heading";
import Kalash from "../../../public/Assests/Service/Kalash.png";
import music from "../../../public/Assests/Service/music.png";

import { FaChevronRight } from "react-icons/fa";

export default function Homethird() {
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

          <p className=" text-center text-white text-[20px] md:text-2xl">
            At Punyasetu, we offer a range of spiritual services designed to
            guide you on your journey to inner peace, enlightenment, and
            personal transformation. Whether you seek divine wisdom, emotional
            healing, or a deeper connection with your higher self, our expert
            practitioners provide personalized guidance to help you navigate
            life’s challenges with clarity and purpose. Through sacred rituals,
            meditative practices, and holistic healing, we create a space for
            spiritual growth and self-discovery.
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
                <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 h-full">
                    <div className="gap-5">
                      <div className="grid ">
                        <a
                          href
                          className="group relative flex flex-col overflow-hidden rounded-2xl p-8 pt-40 bg-white"
                        >
                          <div className="absolute inset-0 " />
                          <h3 className="z-10 text-2xl font-medium  absolute top-0 left-0 p-4 xs:text-2xl md:text-2xl text-[#894112]">
                            Festival List & Details
                          </h3>{" "}
                          <br />
                          <h3 className="z-10 text-lg  text-black absolute top-20 left-0 p-4 xs:text-lg md:text-lg leading-10 text-light">
                            Stay informed about upcoming spiritual and cultural
                            festivals.
                          </h3>
                          <div>
                            <button className="p-3 mt-4  text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                              <FaChevronRight className="text-[#DD531B]" />
                            </button>
                          </div>
                          <Image
                            src={Kalash}
                            alt=""
                            className="absolute right-0 h-20 w-20 bottom-0"
                          />
                        </a>
                      </div>

                      <div className="grid mt-5">
                        <a
                          href
                          className="group relative flex flex-col h-[226.94px] overflow-hidden rounded-2xl px-4 pb-4 pt-40"
                        >
                          <img
                            src="/images/about (2).jpg"
                            alt=""
                            className="absolute inset-2 h-full w-full rounded-2xl   group-hover:scale-105 transition-transform duration-500 ease-in-out"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
                      <a
                        href
                        className="group relative flex flex-col bg-white overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow"
                      >
                        <div className="absolute inset-0 " />
                        <Image
                          src={music}
                          alt=""
                          className="absolute top-20 left-10 h-14 w-16 top-0"
                        />
                        <h3 className="z-10 text-xl font-semibold absolute top-40 left-0 p-4 xs:text-2xl md:text-2xl mx-4 ">
                          Mantra & Vecharan-{" "}
                          <span className="font-normal">
                            Listen to devotional bhajans for a soulful
                            experience.
                          </span>
                        </h3>{" "}
                        <br />
                        <br />
                        <h3 className="z-10 text-xl font-semibold absolute top-72 left-0 p-4 xs:text-xl md:text-xl mx-4 ">
                          Granth Reading –{" "}
                          <span className="font-normal">
                            Access and read sacred scriptures digitally.
                          </span>
                        </h3>{" "}
                        <br />
                        <div>
                          <button className="p-2 px-8 shadow-black shadow-2xl ms-4 mt-44 text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
                            Download App
                          </button>
                        </div>
                        <Image
                          src={Anahata}
                          alt=""
                          className="absolute right-10 h-44 w-44 top-0"
                        />
                      </a>
                    </div>

                    <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
                      <a
                        href
                        className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow"
                      >
                        <img
                          src="/images/about.png"
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
