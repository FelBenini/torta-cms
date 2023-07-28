import PostController from "@/prisma/controllers/postController";
import { prisma } from "@/prisma/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ 'message': 'Not authorized' }, { status: 401 })
  }
  const body = await req.json()

  const post = await prisma.post.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  if (!post) {
    return NextResponse.json({'message': 'Post does not exist'}, {status: 404})
  }
<<<<<<< HEAD
  if (post.categories?.includes(body.category)) {
    const arrayCategories = post.categories.split(', ')
    const updatedCategories = arrayCategories.filter((category) => category !== body.category)
    const categories = updatedCategories.join(', ')
    const newPost = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        categories: `${categories}, `
      }
    })
    return NextResponse.json({ 'removed': newPost.categories })
  } else {
    let newCategories: string
    if (post.categories === '' || post.categories === ' ' || post.categories === ', ' || !post.categories) {
      newCategories = `${body.category}, `
    } else {
      newCategories = `${post.categories}${body.category}, `
    }
    const newPost = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        categories: newCategories
      }
    })
    return NextResponse.json({ 'included': newPost.categories })
  }
=======
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
>>>>>>> development
}