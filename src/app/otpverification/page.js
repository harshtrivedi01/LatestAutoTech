import { Suspense } from "react";
import Otpverificationpage from "./Otpverificationpage";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function Page() {
  return (
 <>
  <Suspense fallback={<div></div>}>
 <Otpverificationpage/>
 </Suspense>
 </>
  );
}
