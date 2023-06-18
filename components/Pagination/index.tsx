'use client'
import React, {useState} from 'react'
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import Stack from '@mui/material/Stack';
import NProgress from "nprogress";

const PaginationComponent = ({num, pageNum}: {num: number, pageNum: string}) => {
  const router = useRouter()
  const [page, setPage] = useState(parseInt(pageNum))
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    router.push(`?page=${value}`)
    NProgress.start();
  }
  return (
    <Stack height={50} alignItems="center" justifyContent="center">
      <Pagination sx={{margin: '0 auto'}} count={num} defaultPage={page} page={page} onChange={handleChange} shape='rounded' color='primary' />
    </Stack>
  )
}

export default PaginationComponent