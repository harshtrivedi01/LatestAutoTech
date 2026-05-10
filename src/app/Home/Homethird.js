"use client";
import Image from "next/image";
import DOMPurify from "dompurify";
import Anahata from "../../../public/Assests/Service/Anahata.png";
import Heading from "../component/Headingname/Heading";
import Kalash from "../../../public/Assests/Service/Kalash.png";
import music from "../../../public/Assests/Service/music.png";

import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Homethird({pujaData}) {
  const { t } = useTranslation();
  const limitWords = (htmlString, wordLimit = 40) => {
    if (!htmlString) return "";
  
    // Strip HTML tags to count words properly
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    const words = plainText.split(" ");
  
    // If within limit, return original HTML
    if (words.length <= wordLimit) return htmlString;
  
    // Trim to word limit and append ellipsis
    const trimmedText = words.slice(0, wordLimit).join(" ") + "";
  
    return trimmedText;
  };
  
  return (
    <div className="relative w-full min-h-scree bg-white">
      
        {/* News Section */}
        <div className="bg-gray-50  px-4">
          <div className="mx-auto max-w-6xl pt-3">
         
   {/* Latest Post Section */}
        <div className="">
          <div className="flex items-center gap-5 mb-10">
            <div className="bg-black text-white px-6 py-3 text-xl font-bold uppercase">
              Latest Post
            </div>

            <div className="flex-1 border-t border-black"></div>
          </div>

        </div>
            {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2 bg-white rounded-full border border-[#DD531B]/30 p-1 shadow-sm">
                <button className="px-4 py-2 rounded-full bg-[#DD531B] text-white text-sm font-semibold">Latest</button>
                <button className="px-4 py-2 rounded-full text-[#894112] text-sm font-semibold hover:bg-[#F9E8DE]">Popular</button>
                <button className="px-4 py-2 rounded-full text-[#894112] text-sm font-semibold hover:bg-[#F9E8DE]">Trending</button>
              </div>
            </div> */}

            {/* <div className="bg-[#FFF4EE] border border-[#DD531B]/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-[#DD531B] font-bold mb-1">Latest Post</p>
                <h4 className="text-xl font-bold text-[#894112] mb-2">
                  Sacred Festivals Coming This Month
                </h4>
                <p className="text-gray-600 text-sm leading-6">
                  Explore the upcoming rituals and festival dates, learn how to prepare offerings, and celebrate with devotion.
                </p>
              </div>
              <a href="#" className="inline-flex items-center text-[#DD531B] font-bold hover:text-[#7B2502]">
                Read Latest <FaChevronRight className="ml-2" />
              </a>
            </div> */}
            
            {/* Masonry Grid with Different Sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
              
              {/* Featured Large Card - Spans 2 columns
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 group">
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="Featured News"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
                <div className="p-8 relative -mt-24 z-10 bg-gradient-to-t from-white via-white">
                  <span className="inline-block bg-[#DD531B] text-white px-4 py-1 rounded-full text-xs font-bold mb-3">Featured</span>
                  <p className="text-sm text-[#DD531B] font-semibold mb-2">May 02, 2026</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#894112] mb-3 leading-tight">
                    Ancient Rituals and Modern Practices
                  </h3>
                  <p className="text-gray-600 text-base leading-7 mb-5 line-clamp-4">
                    Discover how traditional spiritual practices continue to hold significance in the modern world and how you can integrate them into your daily life for enhanced spiritual wellbeing.
                  </p>
                  <a href="#" className="inline-flex items-center text-[#DD531B] font-bold hover:text-[#7B2502] transition-colors text-lg">
                    Read Full Story <FaChevronRight className="ml-2" />
                  </a>
                </div>
              </div>

              <div className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#DD531B] font-bold mb-2">May 01, 2026</p>
                  <h3 className="text-lg font-bold text-[#894112] mb-2 line-clamp-2">
                    Benefits of Sacred Chanting
                  </h3>
                  <p className="text-gray-600 text-sm leading-5 line-clamp-7 mb-3">
                    Learn about spiritual benefits...  Learn about spiritual benefits 
                     Learn about spiritual benefits  Learn about spiritual benefits  Learn
                      about spiritual benefits  Learn about spiritual benefits  Learn about
                       spiritual benefits  Learn about spiritual benefits  Learn about spiritual benefits
                       benefits
                 
                  </p>
                  <a href="#" className="text-[#DD531B] text-sm font-semibold hover:text-[#7B2502]">
                    Read More →
                  </a>
                </div>
              </div>

         
              <div className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#DD531B] font-bold mb-2">April 30, 2026</p>
                  <h3 className="text-lg font-bold text-[#894112] mb-2 line-clamp-2">
                    Seasonal Rituals Guide
                  </h3>
                  <p className="text-gray-600 text-sm leading-5  mb-3">
                    Explore seasonal celebrations Learn about spiritual benefits...  Learn about spiritual benefits 
                     Learn about spiritual benefits  Learn about spiritual benefits  Learn
                      about spiritual benefits  Learn about spiritual benefits  Learn about
                       spiritual benefits  Learn about spiritual benefits  Le0arn about spiritual 
                       benefits
                  </p>
                  <a href="#" className="text-[#DD531B] text-sm font-semibold hover:text-[#7B2502]">
                    Read More →
                  </a>
                </div>
              </div> */}

              {/* Small Card 1 */}
              <div className="col-span-1 sm:col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#DD531B] font-bold mb-1">April 29, 2026</p>
                  <h3 className="text-base font-bold text-[#894112] line-clamp-2">
                    Puja Essentials
                  </h3>
                </div>
              </div>

              {/* Small Card 2 */}
              <div className="col-span-1 sm:col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#DD531B] font-bold mb-1">April 28, 2026</p>
                  <h3 className="text-base font-bold text-[#894112] line-clamp-2">
                    Mantra Power
                  </h3>
                </div>
              </div>

              {/* Small Card 3 */}
              <div className="col-span-1 sm:col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#DD531B] font-bold mb-1">April 27, 2026</p>
                  <h3 className="text-base font-bold text-[#894112] line-clamp-2">
                    Meditation Tips
                  </h3>
                </div>
              </div>

              {/* Small Card 4 */}
              <div className="col-span-1 sm:col-span-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
                    alt="News"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => (e.target.src = "/images/logo.png")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#DD531B] font-bold mb-1">April 26, 2026</p>
                  <h3 className="text-base font-bold text-[#894112] line-clamp-2">
                    Temple Etiquette
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-14">
              <a href="#" className="px-10 py-4 bg-[#E5644E] text-white rounded-full font-bold hover:bg-[#7B2502] transition-all duration-300 transform hover:scale-105 shadow-lg">
                View All News & Updates
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}
