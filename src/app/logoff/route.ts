import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Expire the cookie
  response.cookies.set("user", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
