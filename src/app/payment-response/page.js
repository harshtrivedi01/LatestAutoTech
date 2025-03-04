"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function PaymentResponse() {
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
