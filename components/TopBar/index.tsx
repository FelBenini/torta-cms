"use client"
import React, { useState } from 'react'
import styles from './topbar.module.scss'
import { Button, LinearProgress } from '@mui/material'
import Link from 'next/link'
import { BsPencilFill } from 'react-icons/bs'
import { LogoutButton } from '../Auth'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FiLayers } from 'react-icons/fi'
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { signOut } from "next-auth/react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const loadingStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: '#ffffffdb',
  borderRadius: '8px',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  boxShadow: 'none'
}


const Topbar = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <nav className={styles.topbar}>
        <h3>
          <Button
            sx={{ color: '#52525b' }}
            startIcon={<FiLayers size={25} />}>
            Categories
          </Button>
        </h3>
        <h3>
          <LogoutButton onClick={() => handleOpen()} />
        </h3>
        <Link href='/dashboard/newpost'>
          <Button
            sx={{ height: 50, alignSelf: 'center', padding: '0 36px' }}
            variant='contained'
            startIcon={<BsPencilFill size={15} />}>
            New Post
          </Button>
        </Link>
      </nav>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: 'blur(3px)' }}
      >
        <Box sx={style}>
          {loading ? <Box sx={loadingStyle}>
            <Typography id="modal-modal-title" sx={{ marginBottom: '12px' }} textAlign='center' variant="h5" component="h3">
              Logging you out
            </Typography>
            <LinearProgress sx={{width: '80%', margin: '0 auto', borderRadius: '8px'}} />
          </Box> : <></>}
          <Typography id="modal-modal-title" sx={{ marginBottom: '12px' }} textAlign='center' variant="h5" component="h2">
            You are logging out of tortaCMS
          </Typography>
          <Typography sx={{ marginTop: '12px' }} textAlign='center'>
            Are you Sure?
          </Typography>
          <ButtonGroup sx={{ width: '100%', marginTop: '32px' }} aria-label="outlined primary button group">
            <Button onClick={handleClose} sx={{ width: '50%' }}>No, go back</Button>
            <Button onClick={() => {
              setLoading(true)
              signOut()
}} variant="contained" sx={{ width: '50%' }}>Yes, log me out</Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  )
}

export default Topbar