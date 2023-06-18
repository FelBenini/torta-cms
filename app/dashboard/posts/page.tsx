import React from 'react'
import Topbar from '@/components/TopBar'
import { PostFunctions } from '@/lib/db/postFunctions'
import PaginationComponent from '@/components/Pagination'
import PostCard from '@/components/Posts/PostCard'
import {type Post} from '@/components/Posts/PostCard'

export const dynamic = 'force-dynamic'

const Posts = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: string | undefined };
}) => {
  const res = await PostFunctions.getAllPosts(searchParams.page as number | undefined || 1)
  return (
    <>
      <Topbar />
      {res.posts.map((post, index) => (
        <PostCard post={post as Post} key={index}/>
      ))}
      <PaginationComponent num={Math.ceil(res.numOfPosts / 16)} pageNum={searchParams.page || '1'}/>
    </>
  )
}

export default Posts