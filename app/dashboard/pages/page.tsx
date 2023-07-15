import React from 'react'
import ListOfPosts from '@/components/Posts/List'
import { pageController } from '@/lib/mongodb/controllers/pageController'
import RouterRefresh from '@/components/RouterRefresh'

export const revalidate = 0

const Pages = async ({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) => {
  const res = await pageController.getAllPages(searchParams.page as number | undefined || 1)
  const string = JSON.stringify(res)
  const json = JSON.parse(string)
  return (
    <>
      <RouterRefresh />
      <ListOfPosts initialData={json} type='page' page={searchParams?.page || '1'}/>
    </>
  )
}

export default Pages