"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export default function LoginForm() {
  const router = useRouter();
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, lname, email, password ,image }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log(user);
      await signIn("credentials", {
        username: email,
        password: password,
        redirect: false
      });
      router.push("/")
    } else {
      console.error('User creation failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required onChange={(e) => { setfname(e.target.value) }} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required onChange={(e) => { setlname(e.target.value) }} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => { setemail(e.target.value) }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => { setpass(e.target.value) }} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Profile picture URL</Label>
              <Input
                placeholder="your image link / leave empty if none"
                onChange={(e) => { setImage(e.target.value) }}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
