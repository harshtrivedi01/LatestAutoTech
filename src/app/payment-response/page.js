"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentResponse() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentHandler />
    </Suspense>
  );
}

function PaymentHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status"); // Check payment status
    if (status === "SUCCESS") {
      router.push("/successpage"); // Redirect to success page
    } else {
      router.push("/failed"); // Redirect to failure page
    }
  }, [router, searchParams]);

  return <div>Processing Payment...</div>; // Show a loader while redirecting
}
