import Post from '@/lib/mongodb/models/Post'
import React from 'react'
import ListOfPosts from './List'
import styles from './list.module.scss'
import dbConnect from '@/lib/mongodb'

const LatestPosts = async ({user}: {user: string}) => {
  await dbConnect();
  const posts = await Post.find({postedBy: user})
  .sort('-createdAt')
  .limit(3)
  .exec()
  const string = JSON.stringify(posts)
  const json = JSON.parse(string)
  return (
    <section className={styles.latestPosts}>
      <ListOfPosts initialData={{numOfPosts: 3, posts: json}} type='post' page='1' latest={true} />
    </section>
  )
}

export default LatestPosts