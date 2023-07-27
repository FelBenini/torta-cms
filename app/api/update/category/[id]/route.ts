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
  const post = await PostController.getOnePostById(id)
  if (!post) {
    return NextResponse.json({}, { status: 404 })
  }
  if (post.categories.includes(body.category)) {
    const newPost = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        categories: { set: post.categories.filter((category) => category !== body.category) }
      }
    })
    return NextResponse.json({ 'removed': newPost.categories })
  } else {
    const newPost = await prisma.post.update({
      where: {
        id: id
      },
      data: {
        categories: {
          push: body.category
        }
      }
    })
    return NextResponse.json({ 'included': newPost.categories })
  }
}