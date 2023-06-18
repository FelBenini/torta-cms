import { getServerSession } from "next-auth";
import { LoginForm, RegisterForm } from "@/components/Auth";
import { redirect } from 'next/navigation'
import { UserFunctions } from "@/lib/db/userFunctions";

export default async function Home() {
  const session = await getServerSession();
  const isFirstUser: Boolean = await UserFunctions.checkFirstUser();
  if (session) {
    redirect('/dashboard')
  }

  if (isFirstUser) {
    return (
      <>
      <RegisterForm />
      </>
    )
  }
  return (
    <>
      <LoginForm />
    </>
  )
}