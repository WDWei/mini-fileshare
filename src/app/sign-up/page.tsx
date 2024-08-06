"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignUp() {
  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/sign-up", {
      method: "POST",
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    if (response.status == 200) {
      router.push("/");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Username</label>
      <input name="username" placeholder="username" type="text" />
      <label>Password</label>
      <input name="password" type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
