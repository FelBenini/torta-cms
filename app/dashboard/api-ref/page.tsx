import React from 'react'
import { AiOutlineCluster } from 'react-icons/ai'
import styles from './styles.module.scss'

const ApiRefPage = () => {
  return (
    <section className={styles.apiRefSection}>
      <h1><AiOutlineCluster size='2.8rem' style={{marginBottom: '-0.5rem'}}/> API References</h1>
    </section>
  )
}

export default ApiRefPage