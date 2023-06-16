"use client"
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: formValues.username,
      password: formValues.password,
      callbackUrl: '/dashboard'
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setFormValues({username: e.target.value, password: formValues.password})}/>
        <input type='password' onChange={(e) => setFormValues({username: formValues.username, password: e.target.value})}/>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}