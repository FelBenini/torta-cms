'use client'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlinePencil } from 'react-icons/hi'

const OptionsPost = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size='large'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <BiDotsVerticalRounded />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><HiOutlinePencil size={20} style={{marginRight: 5}}/> Edit post</MenuItem>
        <MenuItem onClick={handleClose}><FaRegTrashAlt size={18} style={{marginRight: 6}}/> Delete post</MenuItem>
      </Menu>
    </>
  )
}

export default OptionsPost