import React from 'react'
import PaginationComponent from '@/components/Pagination'
import PostCard from '@/components/Posts/PostCard'
import {type Post} from '@/components/Posts/PostCard'
import styles from '../posts/styles.module.scss'
import RouterRefresh from '@/components/RouterRefresh'
import { pageController } from '@/lib/mongodb/controllers/pageController'

export const revalidate = 0

const Pages = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const res = await pageController.getAllPages(searchParams.page as number | undefined || 1)
  return (
    <>
      <RouterRefresh />
      <section className={styles.sectionStyles}>
        <h1>All pages - page {searchParams.page || 1} of {Math.ceil(res.numOfPosts / 15)}</h1>
        <h3>Total: {res.numOfPosts} pages</h3>
        {res.posts.map((post, index) => (
          <PostCard post={post as Post} key={index} type={'page'}/>
        ))}
      </section>
      {Math.ceil(res.numOfPosts / 15) == 1 ? <div style={{height: '1.5svh'}}></div> :
        <PaginationComponent num={Math.ceil(res.numOfPosts / 15)} pageNum={searchParams.page || '1'}/>
      }
    </>
  )
}

export default Pages