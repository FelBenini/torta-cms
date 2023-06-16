"use client"
import React from 'react'
import styles from './topbar.module.scss'
import { Button } from '@mui/material'
import Link from 'next/link'
import { BsPencilFill } from 'react-icons/bs'
import { LogoutButton } from '../Auth'
import { FiLayers } from 'react-icons/fi'

const Topbar = () => {
  return (
    <nav className={styles.topbar}>
      <h3>
        <Button
        sx={{color: '#52525b'}}
        startIcon={<FiLayers size={25} />}>
          Categories
        </Button>
      </h3>
      <h3>
        <LogoutButton />
      </h3>
      <Link href='/dashboard/newpost'>
        <Button 
        sx={{height: 50, alignSelf: 'center', padding: '0 36px'}} 
        variant='contained' 
        startIcon={<BsPencilFill size={15} />}>
          New Post
        </Button>
      </Link>
    </nav>
  )
}

export default Topbar