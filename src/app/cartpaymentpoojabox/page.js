import { Suspense } from "react";
import Payment from "./Payment.js"; // Ensure this component uses useSearchParams

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payment />
    </Suspense>
  );
}
