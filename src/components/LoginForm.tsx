"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <section className="login">
      <div>
        <h2>
          Login
        </h2>
        <Link href={'/api/auth/signin'} > Login</Link>
        <h3>Sign in to your account</h3>
        {/* <button onClick={() => signIn("github", { callbackUrl: "/" })}>
          Sign in with Github
        </button> */}
      </div>
    </section>
  );
}