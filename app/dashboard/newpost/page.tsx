import { postController } from '@/lib/mongodb/controllers/postController'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic'

const NewPostPage = async () => {
  const session = await getServerSession();
  const res = await postController.createPost(session?.user?.name as string)
  redirect(`/dashboard/post/${res}`)
}

export default NewPostPage