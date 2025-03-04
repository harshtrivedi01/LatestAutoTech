
  import Testimonials from "../component/Testimonials";
import Aboutpage from "./Aboutpage";
import Aboutsection from "./Aboutsection";

//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function Page () {
    return (
        <>
        <Aboutpage/>
        <Aboutsection/>
        <Testimonials/>
        </>
    )
}