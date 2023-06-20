'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

const RouterRefresh = () => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  })
  return (
    <></>
  )
}

export default RouterRefresh