'use client'

import { useEffect } from "react";
import Panditlist from "./Panditlist";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function Page() {
  useEffect(() => {
    if (window.location.pathname === "/chadhava") {
      localStorage.removeItem("activeSection"); // Remove the token
      localStorage.removeItem("activeSubscriptionTab"); // Remove the token
    }
  }, []);


  return (
 <>
<Panditlist/>
 </>
  );
}
