import Topbar from '@/components/TopBar'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DataGraph from '@/components/DataGraph'

const Dashboard = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <Topbar/>
      <DataGraph />
    </>
  )
}

export default Dashboard