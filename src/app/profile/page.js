import AuthGuard from "../component/AuthGuard";
import Profilepage from "./Profilepage";


export default function page () {
    return <>
    <AuthGuard> <Profilepage/></AuthGuard>
   
    </>
}