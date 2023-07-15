'use client'
import { PostType } from '@/lib/mongodb/models/Post'
import React, { useState } from 'react'
import PostCard from './PostCard'
import Topbar from '../TopBar'
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
  page: string
}

const ListOfPosts = ({ initialData, type, page }: PropsType) => {
  const [posts, setPosts] = useState(initialData)
  return (
    <>
      <Topbar />
      <section className={styles.sectionStyles}>
        <h1>All {type}s - page {page || 1} of {Math.ceil(posts.numOfPosts / 15)}</h1>
        <h3>Total: {posts.numOfPosts} posts</h3>
        {posts.posts.map((post, index) => (
          <PostCard post={post as Post} key={index} type={type} />
        ))}
      </section>
      {Math.ceil(posts.numOfPosts / 15) == 1 ? <div style={{ height: '1.5svh' }}></div> :
        <PaginationComponent num={Math.ceil(posts.numOfPosts / 15)} pageNum={page || '1'} />
      }
    </>
  )
}

export default ListOfPosts