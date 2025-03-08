import { Suspense } from "react";
import BookingDetailspage from "./BookingDetailspage"; // Ensure this component uses useSearchParams

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <BookingDetailspage/>
    </Suspense>
  );
}
