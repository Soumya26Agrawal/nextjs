import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// This code sets up NextAuth for authentication in a Next.js application. It uses the CredentialsProvider to authenticate users with email and password. The authorize function checks if the email and password are provided, connects to MongoDB, and verifies the user's credentials. If successful, it returns user information. The JWT and session callbacks are used to manage user sessions. The handler is exported for both GET and POST requests.
