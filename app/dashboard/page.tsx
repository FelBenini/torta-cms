import Topbar from '@/components/TopBar'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import DataGraph from '@/components/DataGraph'
import { MdOutlineWavingHand } from 'react-icons/md'

const Dashboard = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <Topbar />
      <section>
        <DataGraph />
        <span>
          <h1><MdOutlineWavingHand size={40}/> Welcome, {session.user?.name}!</h1>
        </span>
      </section>
    </>
  )
}

export default Dashboard