import { getServerSession } from "next-auth";
import { LoginForm } from "@/components/Auth";
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect('/dashboard')
  }
  return (
    <>
      <LoginForm />
    </>
  )
}