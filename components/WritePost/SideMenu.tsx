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

const SideMenu = ({summaryProp, postId, tags}: {summaryProp: string | undefined, postId: string, tags?: Array<string>}) => {
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
        <textarea style={{width: '95%', height: 200}} value={summary} onChange={(e) => setSummary(e.target.value)} onBlur={handleSummaryBlur} />
        <Accordion sx={{boxShadow: 'none', borderRadius: 0}}>
        <AccordionSummary
          expandIcon={<MdOutlineExpandMore size={30}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{marginTop: '15px', width: '96%'}}
        >
          <h3>Categories</h3>
        </AccordionSummary>
        <AccordionDetails>
          <p>Category 1</p>
          <p>Category 2</p>
          <p>Category 2</p>
          <p>Category 2</p>
          <p>Category 2</p>
          <p>Category 2</p>
          <p>Category 2</p>
        </AccordionDetails>
        </Accordion>
        <div className={styles.line}></div>
        <h3 className={styles.titleMargin}>Tags</h3>
        <InputTags tagsData={tags || []} id={postId}/>
        <h5><AiOutlineInfoCircle size={18}/> Separate tags by pressing enter</h5>
    </div>
  )
}

export default SideMenu