// Always created in root folder

import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/register" ||
          pathname === "/login"
        ) {
          return true;
        }
        //public
        if (pathname === "/" || pathname.startsWith("api/videos")) {
          return true;
        }

        return !!token;
      },
    },
  }
);
