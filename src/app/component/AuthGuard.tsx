"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      localStorage.setItem("redirectPath", pathname); // ✅ Store the current path
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return <>Loading...</>;

  return <>{children}</>;
}
