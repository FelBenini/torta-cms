'use client'
import React, { useState, useEffect } from 'react'
import { MdOutlineWavingHand } from 'react-icons/md'
import styles from './styles.module.scss'
import axios from 'axios'

const StatisticsDashboard = ({username}: {username: string}) => {
  const [info, setInfo] = useState({
    num_of_posts: 0,
    num_of_pages: 0,
    total_num_of_pages: 0,
    total_num_of_posts: 0,
    published_posts: 0,
    published_pages: 0,
    num_of_categories: 0,
    num_of_images: 0
  })
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/api/info`)
      setInfo(data)
    }
    getData()
  })
  return (
    <span className={styles.statistics}>
      <h1><MdOutlineWavingHand size={40} /> Welcome, {username}!</h1>
      <span className={styles.information}>
        <span>
          <h3>Your posts: <b>{info.num_of_posts}</b></h3>
          <h3>Your pages: <b>{info.num_of_pages}</b></h3>
          <h3>Images: <b>{info.num_of_images}</b></h3>
        </span>
        <span>
          <h3>Total posts: <b>{info.total_num_of_posts}</b></h3>
          <h3>Total pages: <b>{info.total_num_of_pages}</b></h3>
          <h3>Categories: <b>{info.num_of_categories}</b></h3>
        </span>
        <span>
          <h3>Published posts: <b>{info.published_posts}</b></h3>
          <h3>Published pages: <b>{info.published_pages}</b></h3>
        </span>
      </span>
    </span>
  )
}

export default StatisticsDashboard