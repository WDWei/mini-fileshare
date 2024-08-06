import Link from "next/link";
import { auth, signIn } from "../lib/auth";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { SignOut } from "@/components/signout-button";
import { SignIn } from "@/components/signin-button";

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  "use server";

  const formData = new FormData(event.currentTarget);
  const response = await fetch("/api/log-in", {
    method: "POST",
    body: formData,
  });

  // Handle response if necessary
  const data = await response.json();
  if (response.status == 200) {
    redirect("/");
  }
}

export default async function Home() {
  const session = await auth();
  //To fix null syntax issue
  let user = null;
  if (session !== null) user = session.user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
          <h1>WELCOME BACK TEST USER</h1>
          <SignOut></SignOut>
        </div>
      ) : (
        <div>
          <h1>please log in</h1>
          <SignIn></SignIn>
          <Link href="/sign-up"> Sign up</Link>
        </div>
      )}
    </main>
  );
}
