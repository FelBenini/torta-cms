import React from 'react'
import { PostFunctions } from '@/lib/db/postFunctions';
import RouterRefresh from '@/components/RouterRefresh';
import TextEditor from '@/components/TextEditor';
import WritePost from '@/components/WritePost';

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

const EditPost = async (props: Props) => {
  const post = await fetchPost(props?.params?.id as string)
  return (
    
    <div>
      <RouterRefresh />
      <WritePost post={post}/>
    </div>
  )
}

export default EditPost