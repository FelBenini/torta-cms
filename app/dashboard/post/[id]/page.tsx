import React from 'react'
import RouterRefresh from '@/components/RouterRefresh';
import WritePost from '@/components/WritePost';
import CategoriesController from '@/prisma/controllers/categoriesController';
import PostController from '@/prisma/controllers/postController';
import { redirect } from 'next/navigation';

type Props = {
  params?: {
    id?: string;
  };
  searchParams?: {
    search?: string;
  };
};

const fetchPost = async (id: string) => {
  const res = await PostController.getOnePostById(id)
  if (!res) {
    redirect('/dashboard/posts?message=This post does not exist')
  }
  const string = JSON.stringify(res)
  const json = JSON.parse(string)
  return json
}

const fetchCategories = async () => {
  const res = await CategoriesController.getCategories()
  const string = JSON.stringify(res)
  const json = JSON.parse(string)
  return json
}

const EditPost = async (props: Props) => {
  const post = await fetchPost(props?.params?.id as string)
  const categories = await fetchCategories()
  return (
    
    <div>
      <RouterRefresh />
      <WritePost post={post} categories={categories}/>
    </div>
  )
}

export default EditPost