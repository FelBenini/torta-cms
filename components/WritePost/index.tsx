'use client'
import React from 'react'
import TextEditor from '../TextEditor'
import { type Post } from '../Posts/PostCard'
import { useState } from 'react'

const WritePost = ({post}: {post: Post}) => {
  const [content, setContent] = useState(post.content)
  return (
    <div>
      <TextEditor value={content} setValue={setContent}/>
    </div>
  )
}

export default WritePost