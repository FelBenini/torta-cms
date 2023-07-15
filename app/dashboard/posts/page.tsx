import React from 'react'
import RouterRefresh from '@/components/RouterRefresh'
import { postController } from '@/lib/mongodb/controllers/postController'
import ListOfPosts from '@/components/Posts/List'

export const revalidate = 0

const Posts = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const res = await postController.getAllPosts(searchParams.page as number | undefined || 1)
  const string = JSON.stringify(res)
  const json = JSON.parse(string)
  return (
    <>
      <RouterRefresh />
      <ListOfPosts initialData={json} type='post' page={searchParams?.page || '1'}/>
    </>
  )
}

export default Posts