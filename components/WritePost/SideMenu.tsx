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
import ImageUpload from './ImageUpload';
import { Category } from '@/lib/DataModels/Category';

const SideMenu = ({ summaryProp, postId, tags, categories, activeCategories, imageUrl, setActiveCategories }: { summaryProp: string | null | undefined, postId: string, tags: Array<string> | null | undefined, activeCategories: Array<string> | null | undefined, categories: Array<Category> | undefined | undefined, imageUrl: string | null | undefined, setActiveCategories: React.Dispatch<React.SetStateAction<string[]>> }) => {
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
  return (
    <div className={styles.sideMenu}>
      <h1><GiSettingsKnobs /> Settings</h1>
      <h3 className={styles.titleMargin}>Summary</h3>
      <textarea style={{ width: '95%', height: 200 }} defaultValue={summary || ''} onChange={(e) => setSummary(e.target.value)} onBlur={handleSummaryBlur} />
      <h3 className={styles.titleMargin}>Main Image</h3>
      <ImageUpload postId={postId} initialValue={imageUrl || ''} />
      <Accordion sx={{ boxShadow: 'none', borderRadius: 0 }}>
        <AccordionSummary
          expandIcon={<MdOutlineExpandMore size={30} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ marginTop: '15px', width: '96%' }}
        >
          <h3>Categories</h3>
        </AccordionSummary>
        <AccordionDetails sx={{ width: '85%' }}>
          {categories?.map((category, index) => {
            const childCategories = (category.childCategories as string[]).map((category, index) => {
              if (activeCategories?.includes(category)) {
                return (
                  <p className={styles.paragraphCategory} key={index}><Checkbox defaultChecked onClick={() => setActiveCategories(activeCategories.filter((cat) => cat !== category))} />{category}</p>
                )
              } else {
                return (
                  <p key={index} className={styles.paragraphCategory}><Checkbox onClick={() => setActiveCategories([...activeCategories as string[], category])} />{category}</p>
                )
              }
            })
            if (activeCategories?.includes(category?.name as string)) {
              return (
                <div className={styles.paragraphCategory} key={index}>
                  <p><Checkbox defaultChecked onClick={() => setActiveCategories(activeCategories.filter((cat) => cat !== category.name))} />{category.name}</p>
                  {childCategories}
                </div>
              )
            } else {
              return (
                <div className={styles.paragraphCategory} key={index}>
                  <p><Checkbox onClick={() => setActiveCategories([...activeCategories as string[], category.name])} />{category.name}</p>
                  {childCategories}
                </div>
              )
            }
          })}
          <a target='blank' href='/dashboard/categories' className={styles.link}>Add new category</a>
        </AccordionDetails>
      </Accordion>
      <hr style={{width: '90%', margin: '6px 2.5%'}} />
      <h3 className={styles.titleMargin}>Tags</h3>
      <InputTags tagsData={tags || []} id={postId} />
      <h5><AiOutlineInfoCircle size={18} /> Separate tags by pressing enter</h5>
    </div>
  )
}

export default SideMenu