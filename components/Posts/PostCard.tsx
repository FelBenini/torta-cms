import Link from 'next/link'
import React from 'react'
import { type ObjectId } from 'mongoose'
import styles from './card.module.scss'
import OptionsPost from './Options'

export type Post = {
  title: string,
  postedBy: string,
  _id: ObjectId,
  published: boolean,
  content: string,
  createdAt: Date,
  summary?: string,
  tags?: Array<string>
  categories?: Array<any>,
  backgroundImage?: string
}

function getFormattedDate(date: Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}/${day}/${year} - ${hours}:${minutes}`;
}

const PostCard = ({ post, type = 'post' }: { post: Post, type: string }) => {
  return (
    <div className={styles.postCard}>
      <div>
        <h2>
          <Link href={`/dashboard/${type}/${post._id}`}>{post.title.replace(/(<([^>]+)>)/ig, '')}</Link>
        </h2>
        <h4>
          {post.postedBy.toString()}
          {post.published ? <span className={styles.chipPublished}>Published</span> : <span className={styles.chipNotPublished}>Not published</span>}
          created at: {getFormattedDate(post.createdAt)}
        </h4>
        {post.content.length > 200 ?
          <p>{post.content.slice(0, 200).replace(/(<([^>]+)>)/ig, '')}...</p> :
          <p>{post.content.replace(/(<([^>]+)>)/ig, '')}</p>
        }
      </div>
      <OptionsPost id={post._id.toString()}/>
    </div>
  )
}

export default PostCard