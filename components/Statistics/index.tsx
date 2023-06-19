import React from 'react'
import { MdOutlineWavingHand } from 'react-icons/md'
import { getServerSession } from 'next-auth'
import styles from './styles.module.scss'

const StatisticsDashboard = async () => {
  const session = await getServerSession()
  return (
    <span className={styles.statistics}>
      <h1><MdOutlineWavingHand size={40} /> Welcome, {session?.user?.name}!</h1>
    </span>
  )
}

export default StatisticsDashboard