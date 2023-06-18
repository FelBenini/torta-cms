import React from 'react'
import Topbar from '@/components/TopBar'
import { PostFunctions } from '@/lib/db/postFunctions'
import PaginationComponent from '@/components/Pagination'

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
        <h3 key={index}>{post.title}</h3>
      ))}
      <PaginationComponent num={Math.ceil(res.numOfPosts / 16)} pageNum={searchParams.page || '1'}/>
    </>
  )
}

export default Posts