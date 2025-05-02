"use client";
import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
function Header() {
  //   const { data } = useSession();

  //   const handleLogout = async () => {
  //     try {
  //       await signOut();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  return (
    <div className="flex flex-row justify-center items-center h-[10vh]">
      <ul className="flex flex-row gap-10 justify-center items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/course">Course</Link>
        </li>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </ul>
      {/* <button>SignOut</button>
      {data ? (
        <div> Welcome</div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )} */}
    </div>
  );
}

export default Header;
