"use client";

import { usePathname } from "next/navigation";

import Footersection from "./Footersection";

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login","/otpverification"]; // Add more routes if needed

  if (hideNavbarRoutes.includes(pathname)) return null;

  return <Footersection />;
}
