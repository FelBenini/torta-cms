import React from 'react'
import ListOfPosts from './List'
import styles from './list.module.scss'
import { prisma } from '@/prisma/prismaClient'

const LatestPosts = async ({ user }: { user: string }) => {
  const posts = await prisma.post.findMany({
    where: {
      postedBy: user,
      NOT: {
        type: 'page'
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const string = JSON.stringify(posts)
  const json = JSON.parse(string)
  return (
    <section className={styles.latestPosts}>
      <ListOfPosts initialData={{ numOfPosts: 3, posts: json }} type='post' page='1' latest={true} />
    </section>
  )
}

export default LatestPosts