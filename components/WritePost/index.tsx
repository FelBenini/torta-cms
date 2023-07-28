'use client'
import React from 'react'
import TextEditor from '../TextEditor'
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
import SideMenu from './SideMenu'
import { useRouter } from 'next/navigation'
import { Category } from '@/lib/DataModels/Category'
import { Post } from '@/lib/DataModels/Post'

const WritePost = ({ post, categories }: { post: Post, categories: Array<Category> | undefined}) => {
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  const [showing, setShowing] = useState(false)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [publishedText, setPublishedText] = useState(post.published ? 'Publish Changes' : 'Publish')
  const [timer, setTimer] = useState<any>(null)
  const [activeCategories, setActiveCategories] = useState(post?.categories || [])
  async function handleSave() {
    setSaving(true)
    const { status } = await axios.put(`/api/content/save-content-changes/${post.id}`, {
      title: title,
      content: content
    })
    setSaving(false);
  }

  const publishPost = async () => {
    setPublishedText('Publishing...')
    await handleSave()
    await axios.post(`/api/posts/publish/${post.id}`)
    setPublishedText('Published!')
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
        updateCategories();
        setShowing(open);
      };

  const handleContentChange = async () => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      handleSave()}, 750)
    console.log('contentchange')

    setTimer(newTimer)
    }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.innerHTML)
  }

  const updateCategories = async () => {
    if (JSON.stringify(activeCategories) !== JSON.stringify(post.categories)) {
      await axios.put(`/api/update/category/${post.id}`, {
        categories: activeCategories
      })
      router.refresh()
      return
    }
    return
  }

  return (
    <div className={styles.writePost}>
      <Drawer
        anchor='right'
        open={showing}
        onClose={toggleDrawer(false)}
      ><SideMenu summaryProp={post?.summary || ''} tags={post?.tags as string[]} postId={post.id as string} activeCategories={activeCategories} setActiveCategories={setActiveCategories} categories={categories} imageUrl={post.backgroundImage}/></Drawer>
      <Stack direction='row' spacing={4} justifyContent='flex-end'>
        {saving ?
          <p>Saving changes...</p> :
          <Button startIcon={<AiOutlineSave />} sx={{ textTransform: 'none' }} onClick={handleSave}>Save changes</Button>
        }
        <Button onClick={publishPost} endIcon={<FaPaperPlane />} variant='contained'>{publishedText}</Button>
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