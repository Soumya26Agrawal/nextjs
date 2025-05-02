import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// This middleware will check if the user is authenticated and redirect them to the sign-in page if they are not
// You can customize the redirect URL by changing the `signInUrl` property in the `clerkMiddleware` options
// For more information on how to customize the middleware, check out the Clerk documentation: https://clerk.dev/docs/nextjs/middleware
