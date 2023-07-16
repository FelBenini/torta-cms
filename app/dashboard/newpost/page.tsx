'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import styles from './styles.module.scss'
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'next/navigation'

const NewPostPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams();

  useEffect(() => {
    const createPost = async () => {
      const { data } = await axios.post(`/api/create-new-post?type=${searchParams.get('type')}`)
      router.push(`/dashboard/${searchParams.get('type') || 'post'}/${data.location}`)
    }
    console.log('use effect')
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