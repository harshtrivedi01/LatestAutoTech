import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is running for:", request.nextUrl.pathname);

  // Get token from cookies (Make sure 'authToken' is actually set)
  const token = request.cookies.get("authToken")?.value;
  console.log("Auth Token:", token); // Debugging

  if (!token) {
    console.log("No token found. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/Cart", "/profile"], // Make sure routes are lowercase if needed
};
