import React from 'react'

type Props = {
  params?: {
    id?: string;
  };
  searchParams?: {
    search?: string;
  };
};

const EditPost = (props: Props) => {
  return (
    <div>{props?.params?.id}</div>
  )
}

export default EditPost