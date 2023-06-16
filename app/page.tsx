"use client"
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/Auth";

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  )
}