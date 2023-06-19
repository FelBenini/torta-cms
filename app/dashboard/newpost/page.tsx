'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { useEffect } from 'react';

export const dynamic = 'force-dynamic'

const NewPostPage = async () => {
  const router = useRouter()

  const createPost = async () => {
    const {data} = await axios.post(`/api/create-new-post`)
    router.push(`/dashboard/post/${data.location}`)
  }
  useEffect(() => {
    createPost()
  })
  return (
    <></>
  )
}

export default NewPostPage