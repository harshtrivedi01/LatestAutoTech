import AuthGuard from "../component/AuthGuard";
import Profilepage from "./Profilepage";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server


export default function page () {
    return <>
    <AuthGuard> <Profilepage/></AuthGuard>
   
    </>
}