import Homeeight from "../Home/Homeeight";
import Homesecond from "../Home/Homesecond";
import Faq from "../poojadetail/Faq";
import Cards from "./Cards";

import List from "./List";


export default function Servicepage () {
    return (
<>
 <div className="bg-[#FFEEE2]">
      <div className=" p-60 overflow-hidden">
        <div className="container">
          <div className="items-center gap-12">
            <div>
              <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold mb-4">
              Our Service
              </h2>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <List/>
    <div className="bg-gray-100">
    <Cards />
    </div>
    <Homeeight/>
</>
    )
}