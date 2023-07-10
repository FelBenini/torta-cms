import { userController } from '@/lib/mongodb/controllers/userController'
import { UserType } from '@/lib/mongodb/models/User';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const UserPage = async () => {
  const session = await getServerSession()
  const user = await userController.findOne(session?.user?.name as string);

  if (!user) {
    return redirect('/');
  }

  return (
    <section>
      <h2>{user.username}</h2>
    </section>
  )
}

export default UserPage