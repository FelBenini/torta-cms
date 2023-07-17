import Topbar from '@/components/TopBar'
import React from 'react'
import DataGraph from '@/components/DataGraph'
import StatisticsDashboard from '@/components/Statistics'
import LatestPosts from '@/components/Posts/LatestPosts'
import { getServerSession } from 'next-auth'

const Dashboard = async () => {
  const session = await getServerSession()
  return (
    <>
      <Topbar />
      <section>
        <DataGraph />
        <StatisticsDashboard username={session?.user?.name as string}/>
        <hr />
        <LatestPosts user={session?.user?.name as string} />
      </section>
    </>
  )
}

export default Dashboard