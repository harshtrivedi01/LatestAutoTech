export default function Heading({
  text = "Default Text",
  color = "black",
}) { 
  return (
    <div 
      className="text-center font-display font-bold mt-4 tracking-tight flex justify-center items-center mx-auto bg-no-repeat bg-center bg-contain"
      style={{ 
        backgroundImage: `url('/Assests/Service/service-frame.svg')`, 
        height: "150px",
        width: "100%",
        maxWidth: "554px"
      }} 
    >
      <p 
        className="text-[40px] md:text-[40px] sm:text-[30px] xs:text-[20px]" 
        style={{ color: color }}
      >
        {text}
      </p>
    </div>
  );
}
