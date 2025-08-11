import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  const isOwnerArea = nextUrl.pathname.startsWith("/proprietaire/dashboard");
  const isTenantArea = nextUrl.pathname.startsWith("/locataire/dashboard");

  // utilisateur non connecté ?
  if (!req.auth && (isOwnerArea || isTenantArea)) {
    const signInUrl = new URL("/api/auth/signin", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // contrôle de rôle
  const role = req.auth?.user?.role;
  if (isOwnerArea && role !== "OWNER") {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }
  if (isTenantArea && role !== "TENANT") {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/proprietaire/dashboard/:path*",
    "/locataire/dashboard/:path*",
  ],
};
