'use client'
import React, {useEffect, useState} from 'react'
import styles from './style.module.scss'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'
import { ICategory } from '@/lib/mongodb/models/Category'
import { useSearchParams } from 'next/navigation'

const CategoryCard = ({id}: {id: string}) => {
  const pathname = useSearchParams()
  const [info, setInfo] = useState<{name: string, childCategories: Array<ICategory>} | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(pathname)
    const fetchCategory = async (id: string) => {
      const {data} = await axios.get(`/api/category/${id}`)
      setInfo(data)
      setLoading(false)
    }
    fetchCategory(id)
  }, [id, pathname])
  if (loading && info === null) {
    return (
      <Skeleton variant='rounded' width={'100%'} height={72} animation='wave' sx={{marginBottom: '4px'}}/>
    )
  }
  return (
    <div className={styles.categoryCard}>
      <h3>{info?.name}</h3>
      {info?.childCategories.map((category, index) => (
        <div className={styles.categoryCard} key={index}>
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default CategoryCard