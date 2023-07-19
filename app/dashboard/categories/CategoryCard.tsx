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
import { FaRegTrashAlt } from 'react-icons/fa'

interface Category extends ICategory {
  _id: string
}

const CategoryCard = ({ id, openModalState, setData }: { id: string, openModalState: (value: React.SetStateAction<boolean>) => void, setData: (value: React.SetStateAction<{name: string, id: string}>) => void}) => {
  const pathname = useSearchParams()
  const [info, setInfo] = useState<{ _id: string, name: string, childCategories: Array<Category> } | null>(null)
  const [loading, setLoading] = useState(true)

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
        <OptionsMenu id={info?._id as string} setData={setData} name={info?.name as string} openModalState={openModalState}/>
      </span>
      {info?.childCategories.length ? <h5>Child categories:</h5> : <></>}
      {info?.childCategories.map((category: Category, index) => (
        <CategoryCard id={category._id} openModalState={openModalState} setData={setData} key={index} />
      ))}
    </div>
  )
}

function OptionsMenu({name, id, openModalState, setData}: {name: string, id: string, openModalState: (value: React.SetStateAction<boolean>) => void, setData: (value: React.SetStateAction<{name: string, id: string}>) => void}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    setData({name: name, id: id})
    openModalState(true);
    handleClose()
  }

  return (
    <>
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
        <MenuItem onClick={handleDeleteClick}><FaRegTrashAlt size={18} style={{marginRight: 6}}/> Delete {name} Category</MenuItem>
      </Menu>
    </>
  )
}

export default CategoryCard