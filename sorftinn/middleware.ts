// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user is logged in by looking for the correct cookie
  const isLoggedIn = request.cookies.has("authToken"); // matches your login code

  // Protect dashboard route
  if (request.nextUrl.pathname.startsWith("/auth/dashboard")) {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Optional: redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/auth" && isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/dashboard", request.url));
  }

  return NextResponse.next();
}

// Match only the dashboard and login pages
export const config = {
  matcher: ["/auth", "/auth/dashboard/:path*"],
};
