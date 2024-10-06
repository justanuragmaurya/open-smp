"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"



export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function Signup() {
  const router = useRouter();
  const [email , setEmail] = useState("");
  const [password , setPass] = useState("");
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" onChange={(e)=>{setPass(e.target.value)}} required />
          </div>
          <Button className="w-full" onClick={async()=>{
            const res = await signIn("credentials", {
              username: email,
              password: password,
              redirect: false
            })
            console.log(res);
            if (res?.ok) {
              router.push("/")
            } else {
              // Handle error, e.g., show an error message
              alert("Invalid email or password")
              console.error("Sign in failed:", res?.error);
            }
          }}>
            Login
          </Button>
          
          <Button onClick={async()=>{
            signIn("google")
          }} variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
