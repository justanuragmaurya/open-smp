"use client"
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react"
export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-3 backdrop-blur-sm sticky top-0 z-10 border-b-[0.5px] border-gray-300">
      <div className="flex gap-2 items-center">
      <GraduationCap size={30}/>
      <h2 className="font-bold text-2xl ">OpenSMP</h2> 
      </div>
      <div className="flex gap-2 items-center">
        <h2>Hi</h2>
        <h2>Hello</h2>
        <Button onClick={() => signIn()}>Signin</Button>
    <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </div>
  )
}


