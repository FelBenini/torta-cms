'use client'
import React from 'react'
import TextEditor from '../TextEditor'
import { type Post } from '../Posts/PostCard'
import { useState } from 'react'
import styles from './styles.module.scss'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { RiMenu3Fill } from 'react-icons/ri'
import Stack from '@mui/material/Stack'
import { AiOutlineSave } from 'react-icons/ai'
import axios from 'axios'
import Drawer from '@mui/material/Drawer';
import { FaPaperPlane } from 'react-icons/fa'

const WritePost = ({ post }: { post: Post }) => {
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  const [showing, setShowing] = useState(false)
  const [saving, setSaving] = useState(false)
  async function handleSave() {
    setSaving(true)
    const { status } = await axios.put(`/api/content/save-content-changes/${post._id}`, {
      title: title,
      content: content
    })
    setSaving(false)
  }

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setShowing(open);
      };

  return (
    <div className={styles.writePost}>
      <Drawer
        anchor='right'
        open={showing}
        onClose={toggleDrawer(false)}
      ><p>dsadsadasad</p></Drawer>
      <Stack direction='row' spacing={4} justifyContent='flex-end'>
        {saving ?
          <p>Saving changes...</p> :
          <Button startIcon={<AiOutlineSave />} sx={{ textTransform: 'none' }} onClick={handleSave}>Save changes</Button>
        }
        <Button endIcon={<FaPaperPlane />} variant='contained'>Publish</Button>
        <IconButton size='large' onClick={toggleDrawer(true)}>
          <RiMenu3Fill />
        </IconButton>
      </Stack>
      <div className={styles.titleInput} role='textbox' onBlur={e => setTitle(e.currentTarget.innerHTML)} contentEditable='true' dangerouslySetInnerHTML={{ __html: title }}></div>
      <TextEditor value={content} setValue={setContent} />
    </div>
  )
}

export default WritePost