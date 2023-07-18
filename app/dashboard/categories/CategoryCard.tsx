'use client'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'
import { ICategory } from '@/lib/mongodb/models/Category'
import { useSearchParams } from 'next/navigation'
import { IconButton } from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CategoryCard = ({ id }: { id: string }) => {
  const pathname = useSearchParams()
  const [info, setInfo] = useState<{ name: string, childCategories: Array<ICategory> } | null>(null)
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(pathname)
    const fetchCategory = async (id: string) => {
      const { data } = await axios.get(`/api/category/${id}`)
      setInfo(data)
      setLoading(false)
    }
    fetchCategory(id)
  }, [id, pathname])
  if (loading && info === null) {
    return (
      <Skeleton variant='rounded' width={'100%'} height={72} animation='wave' sx={{ marginBottom: '4px' }} />
    )
  }
  return (
    <div className={styles.categoryCard}>
      <h5>Name:</h5>
      <span className={styles.inline}>
        <h3>{info?.name}</h3>
        <IconButton onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <BiDotsVerticalRounded />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Delete Category</MenuItem>
        </Menu>
      </span>
      {info?.childCategories.length ? <h5>Child categories:</h5> : <></>}
      {info?.childCategories.map((category, index) => (
        <div className={styles.categoryCard} key={index}>
          <h5>Category&apos;s name:</h5>
          <span className={styles.inline}>
            <h3>{category.name}</h3>
            <IconButton onClick={handleClick}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
              <BiDotsVerticalRounded />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Delete Category</MenuItem>
            </Menu>
          </span>
        </div>
      ))}
    </div>
  )
}

export default CategoryCard