import React from 'react'
import Topbar from '@/components/TopBar'
import PaginationComponent from '@/components/Pagination'
import PostCard from '@/components/Posts/PostCard'
import {type Post} from '@/components/Posts/PostCard'
import styles from './styles.module.scss'
import RouterRefresh from '@/components/RouterRefresh'
import { postController } from '@/lib/mongodb/controllers/postController'

export const revalidate = 0

const Posts = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const res = await postController.getAllPosts(searchParams.page as number | undefined || 1)
  return (
    <>
      <RouterRefresh />
      <Topbar />
      <section className={styles.sectionStyles}>
        <h1>All posts - page {searchParams.page || 1} of {Math.ceil(res.numOfPosts / 15)}</h1>
        <h3>Total: {res.numOfPosts} posts</h3>
        {res.posts.map((post, index) => (
          <PostCard post={post as Post} key={index} type='post'/>
        ))}
      </section>
      {Math.ceil(res.numOfPosts / 15) == 1 ? <div style={{height: '1.5svh'}}></div> :
        <PaginationComponent num={Math.ceil(res.numOfPosts / 15)} pageNum={searchParams.page || '1'}/>
      }
    </>
  )
}

export default Posts