import Topbar from '@/components/TopBar'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <Topbar/>
      <p>{JSON.stringify(session)}</p>
    </>
  )
}

export default Dashboard