"use client";  // Force the component to be a Client Component
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectPath(localStorage.getItem("redirectPath"));
    }
  }, []);

  return <div>404 Page Not Found</div>;
}
