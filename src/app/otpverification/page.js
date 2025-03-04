import { Suspense } from "react";
import Otpverificationpage from "./Otpverificationpage";

export default function Page() {
  return (
 <>
  <Suspense fallback={<div>Loading...</div>}>
 <Otpverificationpage/>
 </Suspense>
 </>
  );
}
