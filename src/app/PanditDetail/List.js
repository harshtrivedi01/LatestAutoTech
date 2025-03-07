//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server



export default function List () {

    return (
        <>
<div className="container">

<h1 className="font-bold text-2xl">Specialization</h1>

<div className="font-sans p-4">
     
     <ul className="flex max-sm:flex-col gap-x-2 gap-y-4 w-max rounded-2xl">
   
       <li id="homeTab" className="tab flex flex-col justify-center items-center border-2 bg-gray-200 hover:bg-[#FA8128] rounded-2xl text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
       Pooja Essentials
       </li>
       <li id="settingTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
        
       Krishna Pooja
       </li>
       <li id="profileTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
         
       Divine Articles
       </li>
       <li id="inboxTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
         
       Divine Articles
       </li>
       <li id="notificationTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
         
       Divine Articles
       </li>
       <li id="notificationTab" className="tab flex flex-col justify-center items-center border-2 hover:bg-[#FA8128] rounded-2xl bg-gray-100 text-lg text-lg text-black hover:text-white py-2 px-4 min-w-[120px] cursor-pointer transition-all">
         
       Divine Articles
       </li>
     </ul>
    
   </div>

   <br/>
<h1 className="font-bold text-2xl">About my Service</h1>

<div className="font-sans p-4">
     <p>
     Pandit ji is known for his expertise in performing Ganesh Pooja and Vastu Shanti Pooja.
      He is highly regarded for his knowledge of Vedic rituals and mantras and has over 20 years
       of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, 
       success, and the removal of obstacles.
     </p>
    
    
   </div>
<br/>
   <h1 className="font-bold text-2xl">Experience & Qualification</h1>

<div className="font-sans p-4">
     <p>
     Pandit ji is known for his expertise in performing Ganesh Pooja and Vastu Shanti Pooja.
      He is highly regarded for his knowledge of Vedic rituals and mantras and has over 20 years
       of experience conducting ceremonies that invoke the blessings of Lord Ganesha for prosperity, 
       success, and the removal of obstacles.
     </p>
    
    
   </div>
</div>


        
        </>
    )
}