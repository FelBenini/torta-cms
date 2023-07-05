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

export type CategoryType = {
  name: string,
  _id: ObjectId | string,
  type: string,
  childCategories: Array<CategoryType>
}

const SideMenu = ({ summaryProp, postId, tags, categories, postCategories }: { summaryProp: string | undefined, postId: string, tags?: Array<string>, postCategories: Array<string | ObjectId>, categories: Array<CategoryType> | undefined }) => {
  const router = useRouter()
  const [summary, setSummary] = useState(summaryProp)

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
      <ImageUpload />
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
          <AddCategoryForm />
        </AccordionDetails>
      </Accordion>
      <div className={styles.line}></div>
      <h3 className={styles.titleMargin}>Tags</h3>
      <InputTags tagsData={tags || []} id={postId} />
      <h5><AiOutlineInfoCircle size={18} /> Separate tags by pressing enter</h5>
    </div>
  )
}

const AddCategoryForm = () => {
  const router = useRouter()
  const [style, setStyle] = useState({display: 'none'})
  const [name, setName] = useState('')
  const handleDisplay = () => {
    if (style.display === 'none') {
      setStyle({display: 'block'})
    } else {
      setStyle({display: 'none'})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(`/api/category`, {
      name: name,
      type: 'father',
    })
    router.refresh()
    setName('')
  }
  return (
    <>
      <p onClick={handleDisplay} className={styles.link}>Add new category</p>
      <form className={styles.formCategory} style={style} onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Category name'/>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default SideMenu