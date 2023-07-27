'use client'
import React from 'react'
import Topbar from './Topbar'
import { FiLayers } from 'react-icons/fi'
import CategoryCard from './CategoryCard'
import { Box, Button, ButtonGroup, Modal } from '@mui/material'
import styles from './style.module.scss'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { Category } from '@/lib/DataModels/Category'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const ListOfCategories = ({ categories }: { categories: Array<Category> }) => {
  const countSubCategories = (categories: Array<Category>) => {
    let count = 0;
    categories.map((category) => {
      (category.childCategories as string[]).map((category: string) => {
        count++
      })
    })
    return count
  }
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({ name: '', id: '' })

  const handleDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.delete(`/api/category/${data.id}`)
    router.push(`${pathname}?deleted=${data.name}`)
    router.refresh()
    setOpen(false)
  }

  return (
    <>
      <Modal open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form className={styles.deletionForm} onSubmit={handleDeletion}>
            <h2>Are you sure?</h2>
            <div>
              <FaTrash color='#e11d48' size={65} />
            </div>
            <h4>You are deleting the category <b>{data.name}</b></h4>
            <p>This action is irreversible</p>
            <ButtonGroup sx={{width: '100%'}}>
              <Button variant='outlined' color='secondary' onClick={() => setOpen(false)} sx={{width: '50%'}}>
                No, go back
              </Button>
              <Button type='submit' color='warning' sx={{width: '50%'}} variant='contained'>
                Yes, delete
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Modal>
      <h1><FiLayers style={{ marginBottom: '-4px', marginRight: '8px' }} />All Categories</h1>
      <Topbar length={categories.length + countSubCategories(categories)} categories={categories} />
      {categories.map((category: Category, index: number) => (
        <CategoryCard setData={setData} openModalState={setOpen} id={category.name} key={index} />
      ))}
    </>
  )
}

export default ListOfCategories