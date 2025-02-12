import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware is running..."); // Check if this logs in the terminal

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
console.log(request.nextUrl.pathname);

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Change as per your protected routes
};
