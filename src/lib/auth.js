// import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongo from "@/lib/connect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (
            [credentials.email, credentials.password].some(
              (field) => field == null || field.trim() === ""
            )
          ) {
            throw new Error("Email or Password is missing.");
          }
          await connectMongo(); // Connect to MongoDB
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found. Please register first.");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password. Please try again.");
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),
  ],
  // can use github google and other providers

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt", // or database as strategy
    maxAage: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
