import Post from '@/lib/mongodb/models/Post'
import React from 'react'
import ListOfPosts from './List'
import styles from './list.module.scss'

const LatestPosts = async ({user}: {user: string}) => {
  const posts = await Post.find({postedBy: user})
  .sort('-createdAt')
  .limit(3)
  .exec()
  return (
    <section className={styles.latestPosts}>
      <ListOfPosts initialData={{numOfPosts: 3, posts}} type='post' page='1' latest={true} />
    </section>
  )
}

export default LatestPosts