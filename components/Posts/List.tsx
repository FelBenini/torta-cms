'use client'
import React, { useState, useEffect } from 'react'
import PostCard from './PostCard'
import styles from './list.module.scss'
import PaginationComponent from '../Pagination'
import { BsClock } from 'react-icons/bs'
import { Button } from '@mui/material'
import { AiOutlineFileSearch } from 'react-icons/ai'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

interface Post extends Prisma.PostCreateInput {
  id: number
}

type PropsType = {
  initialData: {
    numOfPosts: number,
    posts: Array<Post> | [],

  },
  type: 'post' | 'page',
  page: string,
  limit?: number,
  latest?: boolean
}

const ListOfPosts = ({ initialData, type, page, limit = 15, latest = false }: PropsType) => {
  const [posts, setPosts] = useState(initialData)
  useEffect(() => {
    setPosts(initialData)
  }, [initialData])
  if (posts.numOfPosts <= 0) {
    return (
      <div className={styles.noPosts}>
        <h1><AiOutlineFileSearch style={{marginBottom: '-0.1em'}}/> No {type}s found</h1>
        <p>Start writing a new one!</p>
        <Link href={`/dashboard/newpost?type=${type}`}>
          <Button sx={{padding: '8px 60px'}} variant='contained'>New {type}</Button>
        </Link>
      </div>
    )
  }
  return (
    <>
      <section className={styles.sectionStyles}>
        {!latest ?
          <>
            <h1>All {type}s - page {page || 1} of {Math.ceil(posts.numOfPosts / limit)}</h1>
            <h3>Total: {posts.numOfPosts} posts</h3>
          </>
          : <h1><BsClock style={{marginBottom: '-4px'}} /> Your latest {type}s</h1>}
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