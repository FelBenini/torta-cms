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
  const post = await PostController.getOnePostById(params.id)
  if (!post) {
    return NextResponse.json({}, { status: 404 })
  }
  if (post.categories?.includes(body.category)) {
    const arrayCategories = post.categories.split(', ')
    const updatedCategories = arrayCategories.filter((category) => category !== body.category)
    const categories = updatedCategories.join(', ')
    const newPost = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        categories: `${categories}, `
      }
    })
    return NextResponse.json({ 'removed': newPost.categories })
  } else {
    const newPost = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        categories: `${post.categories}${body.category}, `
      }
    })
    return NextResponse.json({ 'included': newPost.categories })
  }
}