'use client'
import { Button } from "@mui/material"

const Topbar = ({length}: {length: number}) => {
  return (
    <span>
      <h1>Total: {length} {length === 1 ? 'category' : 'categories'}</h1>
      <Button variant='contained' sx={{height: '48px'}}>New Category</Button>
    </span>
  )
}

export default Topbar