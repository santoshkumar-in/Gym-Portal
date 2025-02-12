import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserDetails } from "@/actions/auth";
// 1. Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. check if logged in
  const jwtToken = (await cookies()).get("jwtToken")?.value;
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !jwtToken) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // 5. Prevent user from accessing other business page
  const { data: currentUser } = await getUserDetails();
  if (
    jwtToken &&
    path.startsWith("/business") &&
    currentUser.role === "ROLE_BUSINESS"
  ) {
    const parts = path.split("/");
    if (parts[2] !== currentUser.businessId) {
      console.log("Invalid Path");
      return NextResponse.redirect(
        new URL(`/business/${currentUser.businessId}`, req.nextUrl),
      );
    }
  }
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    jwtToken &&
    publicRoutes.includes(req.nextUrl.pathname)
  ) {
    console.error("Already authenticated");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
