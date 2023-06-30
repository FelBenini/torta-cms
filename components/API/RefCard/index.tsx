import React from 'react'
import styles from './styles.module.scss'

const ApiRefCard = ({ method, url, description }: { method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE", url: string, description: string }) => {
  return (
    <div className={styles.apiRefCard}>
      <span className={styles.apiTitle}>
        <h2>{method}</h2>
        <h1>{`${url}`}</h1>
      </span>
      <p>{description}</p>
    </div>
  )
}

export default ApiRefCard