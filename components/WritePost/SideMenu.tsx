'use client'
import React, { useState } from 'react';
import styles from './sidemenu.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import { MdOutlineExpandMore } from 'react-icons/md'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputTags from './TagsInput';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { GiSettingsKnobs } from 'react-icons/gi'
import Checkbox from '@mui/material/Checkbox';
import { ObjectId } from 'mongoose';
import ImageUpload from './ImageUpload';
import NewCategoryModal from '../Categories/NewCategoryModal';

export type CategoryType = {
  name: string,
  _id: string,
  type: string,
  childCategories: Array<CategoryType>
}

const SideMenu = ({ summaryProp, postId, tags, categories, postCategories, imageUrl }: { summaryProp: string | undefined, postId: string, tags?: Array<string>, postCategories: Array<string | ObjectId>, categories: Array<CategoryType> | undefined, imageUrl?: string }) => {
  const router = useRouter()
  const [summary, setSummary] = useState(summaryProp)
  const [open, setOpen] = useState(false)

  const handleSummaryBlur = async () => {
    if (summary === summaryProp) {
      return
    }
    await axios.put(`/api/update/summary/${postId}`, {
      summary: summary
    })
    router.refresh()
    return
  }
  const updateCategories = async (id: string) => {
    await axios.put(`/api/update/category/${postId}`, {
      category: id
    })
    router.refresh()
  }
  return (
    <div className={styles.sideMenu}>
      <h1><GiSettingsKnobs /> Settings</h1>
      <h3 className={styles.titleMargin}>Summary</h3>
      <textarea style={{ width: '95%', height: 200 }} value={summary} onChange={(e) => setSummary(e.target.value)} onBlur={handleSummaryBlur} />
      <h3 className={styles.titleMargin}>Main Image</h3>
      <ImageUpload postId={postId} initialValue={imageUrl} />
      <Accordion sx={{ boxShadow: 'none', borderRadius: 0 }}>
        <AccordionSummary
          expandIcon={<MdOutlineExpandMore size={30} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ marginTop: '15px', width: '96%' }}
        >
          <h3>Categories</h3>
        </AccordionSummary>
        <AccordionDetails sx={{width: '85%'}}>
          {categories?.map((category, index) => {
            if (postCategories.includes(category._id)) {
              return (
                <p className={styles.paragraphCategory} key={index}><Checkbox defaultChecked onClick={() => updateCategories(category._id.toString())}/>{category.name}</p>
              )
            } else {
              return (
                <p key={index} className={styles.paragraphCategory}><Checkbox onClick={() => updateCategories(category._id.toString())}/>{category.name}</p>
              )
            }
          })}
          <p onClick={() => setOpen(true)} className={styles.link}>Add new category</p>
          <NewCategoryModal openState={open} setOpenState={setOpen} categories={categories || []}/>
        </AccordionDetails>
      </Accordion>
      <div className={styles.line}></div>
      <h3 className={styles.titleMargin}>Tags</h3>
      <InputTags tagsData={tags || []} id={postId} />
      <h5><AiOutlineInfoCircle size={18} /> Separate tags by pressing enter</h5>
    </div>
  )
}

export default SideMenu