"use client"

import React from 'react'
import styles from './topbar.module.scss'
import { Button } from '@mui/material'
import Link from 'next/link'

const Topbar = () => {
  return (
    <nav className={styles.topbar}>
      <h3>Wassup</h3>
      <Link href='/dashboard/newpost'>
        <Button sx={{height: 40, alignSelf: 'center', padding: '0 24px'}} variant='contained'>New Post</Button>
      </Link>
    </nav>
  )
}

export default Topbar