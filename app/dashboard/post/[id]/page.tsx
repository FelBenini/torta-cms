import React from 'react'
import { PostFunctions } from '@/lib/db/postFunctions';
import RouterRefresh from '@/components/RouterRefresh';
import WritePost from '@/components/WritePost';
import categoriesController from '@/lib/mongodb/controllers/categoriesController';

type Props = {
  params?: {
    id?: string;
  };
  searchParams?: {
    search?: string;
  };
};

const fetchPost = async (id: string) => {
  const res = await PostFunctions.getOnePostById(id)
  return res
}

const fetchCategories = async () => {
  const res = await categoriesController.getCategories()
  return res
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