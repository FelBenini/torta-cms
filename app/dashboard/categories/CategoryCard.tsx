'use client'
import React, {useEffect, useState} from 'react'
import styles from './style.module.scss'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'

const CategoryCard = ({id}: {id: string}) => {
  const [info, setInfo] = useState<{name: string} | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCategory = async (id: string) => {
      const {data} = await axios.get(`/api/category/${id}`)
      setInfo(data)
      setLoading(false)
    }
    fetchCategory(id)
  }, [id])
  if (loading && info === null) {
    return (
      <Skeleton variant='rounded' width={'100%'} height={72} animation='wave' sx={{marginBottom: '4px'}}/>
    )
  }
  return (
    <div className={styles.categoryCard}>
      <h3>{info?.name}</h3>
    </div>
  )
}

export default CategoryCard