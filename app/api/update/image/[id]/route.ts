import PostController from "@/prisma/controllers/postController";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ 'message': 'Not authorized' }, { status: 401 })
  }
  const body = await req.json()
  const post = await PostController.getOnePostById(params.id)
  if (!post) {
    return NextResponse.json({'message': 'Post does not exist'}, {status: 404})
  }
  const updatedPost = await prisma.post.update({
    where: {
      id: params.id
    },
    data: {
      backgroundImage: body.imageUrl
    }
  })
  return NextResponse.json({'location': updatedPost.backgroundImage});
}