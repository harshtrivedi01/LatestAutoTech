"use client";
import { useEffect, useState } from "react";
//export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

export default function NotFoundPage() {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectPath(localStorage.getItem("redirectPath"));
    }
  }, []);

  return <div>404 Page Not Found</div>;
}
