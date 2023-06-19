import React from 'react'
import Topbar from '@/components/TopBar'
import { PostFunctions } from '@/lib/db/postFunctions'
import PaginationComponent from '@/components/Pagination'
import PostCard from '@/components/Posts/PostCard'
import {type Post} from '@/components/Posts/PostCard'
import styles from './styles.module.scss'

export const revalidate = 0

const Posts = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const res = await PostFunctions.getAllPosts(searchParams.page as number | undefined || 1)
  return (
    <>
      <Topbar />
      <section className={styles.sectionStyles}>
        <h1>All posts - page {searchParams.page || 1} of {Math.ceil(res.numOfPosts / 15)}</h1>
        <h3>Total: {res.numOfPosts} posts</h3>
        {res.posts.map((post, index) => (
          <PostCard post={post as Post} key={index}/>
        ))}
      </section>
      <PaginationComponent num={Math.ceil(res.numOfPosts / 15)} pageNum={searchParams.page || '1'}/>
    </>
  )
}

export default Posts