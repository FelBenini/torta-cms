'use client'
import React, {useState} from 'react';
import styles from './sidemenu.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import { MdOutlineExpandMore } from 'react-icons/md'
import axios from 'axios';

const SideMenu = ({summaryProp, postId}: {summaryProp: string | undefined, postId: string}) => {
  const [summary, setSummary] = useState(summaryProp)

  const handleSummaryBlur = async () => {
    if (summary === '') {
      return
    }
    await axios.put(`/api/update-summary/${postId}`, {
      summary: summary
    })
    return
  }
  return (
    <div className={styles.sideMenu}>
      <div>
        <h3 className={styles.titleMargin}>Summary</h3>
        <textarea style={{width: '95%', height: 200}} value={summary} onChange={(e) => setSummary(e.target.value)} onBlur={handleSummaryBlur} />
        <Accordion sx={{boxShadow: 'none', borderBottom: '2px solid #52525b', borderRadius: 0}}>
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
        </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default SideMenu