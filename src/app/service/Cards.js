import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

export default function Cards({ onlinepoojawork }) {
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <h1 className="text-center font-bold lg:text-4xl text-2xl my-14">
          How does PUNYASETU Online Pooja Work?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {onlinepoojawork?.map((item) => (
            <div key={item.id} className="grid shadow shadow-2xl rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xl font-medium text-[#894112]">
                <img
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span>{item.name}</span>
              </div>
              <h3 className="text-lg text-black mt-4 leading-relaxed">
                {item.onlinepoojawork_description}
              </h3>
              <div>
                <button className="p-3 mt-4 text-white bg-[#FFDCC04F] rounded-full hover:bg-[#7B2502]">
                  <FaChevronRight className="text-[#DD531B]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
