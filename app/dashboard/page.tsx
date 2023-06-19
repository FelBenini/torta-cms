import Topbar from '@/components/TopBar'
import React from 'react'
import DataGraph from '@/components/DataGraph'
import StatisticsDashboard from '@/components/Statistics'

const Dashboard = async () => {
  return (
    <>
      <Topbar />
      <section>
        <DataGraph />
        <StatisticsDashboard />
      </section>
    </>
  )
}

export default Dashboard