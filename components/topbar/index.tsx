"use client"
import React from 'react'
import styles from './topbar.module.scss'
import { Button } from '@mui/material'
import Link from 'next/link'
import { BsPencilFill } from 'react-icons/bs'

const Topbar = () => {
  return (
    <nav className={styles.topbar}>
      <h3>Wassup</h3>
      <Link href='/dashboard/newpost'>
        <Button sx={{height: 50, alignSelf: 'center', padding: '0 36px'}} variant='contained' startIcon={<BsPencilFill size={15} />}>New Post</Button>
      </Link>
    </nav>
  )
}

export default Topbar