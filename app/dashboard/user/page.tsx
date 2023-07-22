import UserController from '@/prisma/controllers/userController'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import styles from './styles.module.scss'

const UserPage = async () => {
  const session = await getServerSession()
  const user = await UserController.findOne(session?.user?.name as string);

  if (!user) {
    return redirect('/');
  }

  return (
    <section className={styles.userSection}>
      <h1><img src={user.profilePic || '/defaultPfp.png'} alt={`${user.username}'s profile pic`} /> {user.username}</h1>
      <h3>E-mail: {user.email}</h3>
      <h3>Role: {user.role}</h3>
    </section>
  )
}

export default UserPage