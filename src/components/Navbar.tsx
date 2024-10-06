"use client"
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex items-center justify-between px-10 py-3 backdrop-blur-sm sticky top-0 z-10 border-b-[0.5px] border-gray-300">
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <GraduationCap size={30} />
          <h2 className="font-bold text-2xl">OpenSMP</h2>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        {isAuthenticated ? (
          <>
            <h2 className="text-md">Hi, {session?.user?.name}</h2>
            <img src={`${session?.user?.image}`} className="w-[50px] rounded-full" />
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </div>
    </div>
  );
}


