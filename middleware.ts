import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")

  if (!isAuthenticated && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
