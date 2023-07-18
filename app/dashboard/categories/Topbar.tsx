'use client'
import { Box, Button, Select, TextField, MenuItem, InputLabel, FormControl } from "@mui/material"
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import styles from './style.module.scss'
import { ICategory } from "@/lib/mongodb/models/Category";

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
  const [mainCategory, setMainCategory] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleSelectChange = (event: any) => {
    setMainCategory(event.target.value);
  };
  return (
    <>
      <span>
        <h1>Total: {length} {length === 1 ? 'category' : 'categories'}</h1>
        <Button onClick={handleOpen} variant='contained' sx={{ height: '48px' }}>New Category</Button>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <h2>Add New Category</h2>
            <p>Main Category:</p>
            <Select sx={{ width: '100%', marginTop: '12px' }} onChange={handleSelectChange} value={mainCategory}>
              <MenuItem value={0}>None</MenuItem>
              {categories.map((category, index) => (
                <MenuItem value={category._id} key={index}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <p>Choose your category&apos;s name:</p>
            <TextField sx={{ width: '100%', marginTop: '12px' }} label='Category name' />
            <Button variant="contained" sx={{ width: '100%', marginTop: '24px' }} type='submit'>Add Category</Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Topbar