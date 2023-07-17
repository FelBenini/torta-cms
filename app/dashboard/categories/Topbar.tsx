'use client'
import { Box, Button } from "@mui/material"
import Modal from '@mui/material/Modal';
import {useState} from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const Topbar = ({ length }: { length: number }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <span>
        <h1>Total: {length} {length === 1 ? 'category' : 'categories'}</h1>
        <Button onClick={handleOpen} variant='contained' sx={{ height: '48px' }}>New Category</Button>
      </span>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <p>Adding new category here</p>
        </Box>
      </Modal>
    </>
  )
}

export default Topbar