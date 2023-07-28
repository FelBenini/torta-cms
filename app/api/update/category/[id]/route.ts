import PostController from "@/prisma/controllers/postController";
import { prisma } from "@/prisma/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ 'message': 'Not authorized' }, { status: 401 })
  }
  const body = await req.json()
  const post = await prisma.post.findFirst({
    where: {
      id: params.id
    }
  })
  if (!post) {
    return NextResponse.json({'message': 'Post does not exist'}, {status: 404})
  }
  const arrayCategories = body.categories as string[]
  const categories = arrayCategories.filter((cat) => cat !== '').join(', ')
  const newPost = await prisma.post.update({
    where: {
      id: params.id
    },
    data: {
      categories: `${categories}, `
    }
  })
  return NextResponse.json({categories: newPost.categories})
}