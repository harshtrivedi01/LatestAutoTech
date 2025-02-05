


export default function Heading({
    text = "Default Text",
    color = "black",
}) { 
    return (
   <>
   <div className="text-center font-display text-lg font-bold tracking-tight  content-center text-slate-900 md:text-4xl"
 style={{ backgroundImage: `url('/Assests/Service/service-frame.svg')`, backgroundSize: "", backgroundPosition: "center",height:"254px" ,width:"554px" , backgroundRepeat:"no-repeat" }} >
    <p className="text-[60px]  content-center" style={{color: color}}>
    {text}
    </p>
     </div>
   </>
    )}          