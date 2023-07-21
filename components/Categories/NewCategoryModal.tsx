'use client'
import React, { SetStateAction, useState } from 'react';
import { Button, Select, TextField, MenuItem } from "@mui/material"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './newcategory.module.scss'
import { ICategory } from "@/lib/mongodb/models/Category";
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';

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

const NewCategoryModal = ({ openState, setOpenState, categories }: { openState: boolean,
  setOpenState: (value: SetStateAction<boolean>) => void,
  categories: Array<Prisma.CategoryCreateInput>}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [mainCategory, setMainCategory] = useState(0)
  const [name, setName] = useState('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const query: {
      name: string,
      type: 'father' | 'child',
      mainCategory?: string | number
    } = {
      name: name,
      type: 'father'
    };
    if (mainCategory === 0) {
      query.type = 'father'
    } else {
      query.type = 'child'
      query.mainCategory = mainCategory
    }

    await axios.post(`/api/category`, query)
    router.push(`${pathname}?new-category=${name}`);
    router.refresh();
    setMainCategory(0);
    setName('')
    setOpenState(false);
  }

  const handleSelectChange = (event: any) => {
    setMainCategory(event.target.value);
  };

  return (
    <Modal
      open={openState}
      onClose={() => {
        setName('')
        setMainCategory(0)
        setOpenState(false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <h2>Add New Category</h2>
          <p>Main Category:</p>
          <Select sx={{ width: '100%', marginTop: '12px' }} onChange={handleSelectChange} value={mainCategory}>
            <MenuItem value={0}>None</MenuItem>
            {categories.map((category: Prisma.CategoryCreateInput, index: number) => (
              <MenuItem value={category.id} key={index}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <p>Choose your category&apos;s name:</p>
          <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%', marginTop: '12px' }} label='Category name' />
          <Button variant="contained" sx={{ width: '100%', marginTop: '24px' }} type='submit'>Add Category</Button>
        </form>
      </Box>
    </Modal>
  )
}

export default NewCategoryModal