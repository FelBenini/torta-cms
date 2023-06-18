import Link from 'next/link'
import React from 'react'
import { type ObjectId } from 'mongoose'

export type Post = {
  title: string,
  postedBy: {
    username: string,
  },
  _id: ObjectId
}

const PostCard = ({post}: {post: Post}) => {
  return (
    <div>
      <h3>
        <Link href={`/dashboard/post/${post._id}`}>{post.title}</Link> - {post.postedBy.username}
      </h3>
    </div>
  )
}

export default PostCard