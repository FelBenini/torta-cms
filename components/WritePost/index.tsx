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
import SideMenu, { CategoryType } from './SideMenu'
import { useRouter } from 'next/navigation'

const WritePost = ({ post, categories }: { post: Post, categories: Array<CategoryType> | undefined}) => {
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  const [showing, setShowing] = useState(false)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  async function handleSave() {
    if (saving) {
      return
    }
    setSaving(true)
    const { status } = await axios.put(`/api/content/save-content-changes/${post._id}`, {
      title: title,
      content: content
    })
    setSaving(false)
  }

  const publishPost = async () => {
    await handleSave()
    const { status } = await axios.post(`/api/posts/publish/${post._id}`)
    router.refresh()
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
  const handleContentChange = async () => {
    setSaving(true)
    setTimeout(() => {
      handleSave()}, 5000)
    }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.innerHTML)
  }
  return (
    <div className={styles.writePost}>
      <Drawer
        anchor='right'
        open={showing}
        onClose={toggleDrawer(false)}
      ><SideMenu summaryProp={post.summary} tags={post?.tags} postId={post._id.toString()} postCategories={post?.categories || []} categories={categories || []}/></Drawer>
      <Stack direction='row' spacing={4} justifyContent='flex-end'>
        {saving ?
          <p>Saving changes...</p> :
          <Button startIcon={<AiOutlineSave />} sx={{ textTransform: 'none' }} onClick={handleSave}>Save changes</Button>
        }
        <Button onClick={publishPost} endIcon={<FaPaperPlane />} variant='contained'>{post.published ? 'Publish Changes' : 'Publish'}</Button>
        <IconButton size='large' onClick={toggleDrawer(true)}>
          <RiMenu3Fill />
        </IconButton>
      </Stack>
      <div className={styles.titleInput} role='textbox' onBlur={handleBlur} contentEditable='true' dangerouslySetInnerHTML={{ __html: title }}></div>
      <TextEditor value={content} setValue={setContent} onChange={handleContentChange}/>
    </div>
  )
}

export default WritePost