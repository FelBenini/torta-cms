'use client'
import React, { useEffect } from 'react'
import TextEditor from '../TextEditor'
import { type Post } from '../Posts/PostCard'
import { useState } from 'react'
import styles from './styles.module.scss'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { RiMenu3Fill } from 'react-icons/ri'
import Stack from '@mui/material/Stack'
import { AiOutlineSave } from 'react-icons/ai'

const WritePost = ({ post }: { post: Post }) => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return 'Discard changes?';
    };
    window.onbeforeunload = null;
  })

  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  return (
    <div className={styles.writePost}>
      <Stack direction='row' spacing={4} justifyContent='flex-end'>
        <Button startIcon={<AiOutlineSave />} sx={{ textTransform: 'none' }}>Save changes</Button>
        <Button variant='contained'>Publish</Button>
        <IconButton size='large'>
          <RiMenu3Fill />
        </IconButton>
      </Stack>
      <div className={styles.titleInput} role='textbox' onBlur={e => setTitle(e.currentTarget.innerHTML)} contentEditable='true' dangerouslySetInnerHTML={{ __html: title }}></div>
      <TextEditor value={content} setValue={setContent} />
    </div>
  )
}

export default WritePost