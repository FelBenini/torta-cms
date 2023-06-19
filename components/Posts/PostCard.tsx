import Link from 'next/link'
import React from 'react'
import { type ObjectId } from 'mongoose'
import styles from './card.module.scss'

export type Post = {
  title: string,
  postedBy: {
    username: string,
  },
  _id: ObjectId,
  published: boolean,
  content: string
}

const PostCard = ({post}: {post: Post}) => {
  return (
    <div className={styles.postCard}>
      <h2>
        <Link href={`/dashboard/post/${post._id}`}>{post.title}</Link>
      </h2>
      <h4>
        {post.postedBy.username}
        {post.published ? <span className={styles.chipPublished}>Published</span> : <span className={styles.chipNotPublished}>Not published</span>}
      </h4>
      {post.content.length > 200 ?
      <p>{post.content.slice(0, 200).replace( /(<([^>]+)>)/ig, '')}...</p> :
      <p>{post.content.replace( /(<([^>]+)>)/ig, '')}</p>
      }
    </div>
  )
}

export default PostCard