import AuthGuard from "../component/AuthGuard";
import Form from "./Form";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server



const Page = () => {
    return (
    <AuthGuard>
        <div className="p-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
  <div className="flex items-center mb-4 md:mb-0">
  <div
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white `}
            >
      <span className="font-bold">01</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Sankalp Form
      <br />
      <span className="text-sm font-semibold text-gray-700">Fill Name, Gotra & Address</span>
    </p>
  </div>
  <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

  <div className="flex items-center">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}
    >
      <span className="font-bold">{2}</span>
    </div>
    <p className="ml-2 text-sm font-semibold text-gray-700">
      Pay
      <br />
      <span className="text-sm font-semibold text-gray-700">Select a payment method</span>
    </p>
  </div>
</div>
    <Form/>
      </div>
    </AuthGuard>
    );
  };
  
  export default Page;