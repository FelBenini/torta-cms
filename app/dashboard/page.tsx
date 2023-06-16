import Topbar from '@/components/TopBar'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession()
  return (
    <>
      <Topbar/>
      {JSON.stringify(session)}
    </>
  )
}

export default Dashboard