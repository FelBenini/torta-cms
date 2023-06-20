'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import styles from './styles.module.scss'
import Stack from '@mui/material/Stack';

export const dynamic = 'force-dynamic'

const NewPostPage = async () => {
  const router = useRouter()

  const createPost = async () => {
    const { data } = await axios.post(`/api/create-new-post`)
    router.push(`/dashboard/post/${data.location}`)
  }
  useEffect(() => {
    createPost()
  })
  return (
    <div className={styles.loadingEditor}>
      <Stack spacing={2} alignItems='center' justifyContent='center'>
        <h1>Loading the Editor</h1>
        <CircularProgress color='secondary' />
        <p>please wait...</p>
      </Stack>
    </div>
  )
}

export default NewPostPage