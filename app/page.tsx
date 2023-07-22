import { getServerSession } from "next-auth";
import { LoginForm, RegisterForm } from "@/components/Auth";
import { redirect } from 'next/navigation'
import UserController from "@/prisma/controllers/userController";

export const metadata = {
  title: 'tortaCMS',
  description: 'torta Content Management System',
}

export default async function Home() {
  const session = await getServerSession();
  const isFirstUser: Boolean = await UserController.checkIfFirstUser();
  if (session) {
    redirect('/dashboard')
  }

  if (!isFirstUser) {
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