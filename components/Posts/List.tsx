'use client'
import { PostType } from '@/lib/mongodb/models/Post'
import React, { useState } from 'react'
import PostCard from './PostCard'
import styles from './list.module.scss'
import mongoose from 'mongoose'
import PaginationComponent from '../Pagination'

interface Post extends PostType {
  _id: mongoose.ObjectId
}

type PropsType = {
  initialData: {
    numOfPosts: number,
    posts: Array<PostType> | [],

  },
  type: 'post' | 'page',
  page: string,
  limit?: number,
  latest?: boolean
}

const ListOfPosts = ({ initialData, type, page, limit = 15, latest = false }: PropsType) => {
  const [posts, setPosts] = useState(initialData)
  return (
    <>
      <section className={styles.sectionStyles}>
        {!latest ?
          <>
            <h1>All {type}s - page {page || 1} of {Math.ceil(posts.numOfPosts / limit)}</h1>
            <h3>Total: {posts.numOfPosts} posts</h3>
          </>
          : <h1>Your latest {type}s</h1>}
        {posts.posts.map((post, index) => (
          <PostCard post={post as Post} key={index} type={type} />
        ))}
      </section>
      {Math.ceil(posts.numOfPosts / limit) == 1 ? <div style={{ height: '1.5svh' }}></div> :
        <PaginationComponent num={Math.ceil(posts.numOfPosts / limit)} pageNum={page || '1'} />
      }
    </>
  )
}

export default ListOfPosts