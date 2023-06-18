import React from 'react'
import Topbar from '@/components/TopBar'
import { PostFunctions } from '@/lib/db/postFunctions'

export const dynamic = 'force-dynamic'

const Posts = async () => {
  const res = await PostFunctions.getAllPosts()
  return (
    <>
      <Topbar />
      {res.posts.map((post, index) => (
        <h3 key={index}>{post.title}</h3>
      ))}
    </>
  )
}

export default Posts