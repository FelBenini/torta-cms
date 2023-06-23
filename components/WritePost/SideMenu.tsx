'use client'
import React from 'react';
import styles from './sidemenu.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import { MdOutlineExpandMore } from 'react-icons/md'

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div>
        <h3 className={styles.titleMargin}>Summary</h3>
        <textarea style={{width: '95%', height: 200}}></textarea>
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