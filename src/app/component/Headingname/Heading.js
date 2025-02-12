export default function Heading({
  text = "Default Text",
  color = "black",
}) { 
  return (
    <div 
      className="text-center font-display font-bold tracking-tight flex justify-center items-center mx-auto bg-no-repeat bg-center bg-contain"
      style={{ 
        backgroundImage: `url('/Assests/Service/service-frame.svg')`, 
        height: "254px",
        width: "100%",
        maxWidth: "554px"
      }} 
    >
      <p 
        className="text-[60px] md:text-[50px] sm:text-[40px] xs:text-[30px]" 
        style={{ color: color }}
      >
        {text}
      </p>
    </div>
  );
}
