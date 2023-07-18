'use client'
import { Button } from "@mui/material"
import { useState } from 'react'
import { ICategory } from "@/lib/mongodb/models/Category";
import NewCategoryModal from "@/components/Categories/NewCategoryModal";
import styles from './style.module.scss'

interface Category extends ICategory {
  _id: string
}

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

const Topbar = ({ length, categories }: { length: number, categories: Array<Category> }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  return (
    <>
      <span className={styles.topping}>
        <h3>Total: {length} {length === 1 ? 'category' : 'categories'}</h3>
        <Button onClick={handleOpen} variant='contained' sx={{ height: '48px' }}>New Category</Button>
      </span>
      <NewCategoryModal openState={open} setOpenState={setOpen} categories={categories} />
    </>
  )
}

export default Topbar