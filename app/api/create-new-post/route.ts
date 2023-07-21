import PostController from "@/prisma/controllers/postController";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let type: string;
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }
  if (searchParams.get('type') === 'page') {
    type = 'page';
  } else {
    type = 'post'
  }
  const newPost = await PostController.createPost(token.name as string, type)
  if (!newPost) {
    return NextResponse.json({}, {status: 400})
  }
  return NextResponse.json({location: newPost}, {status: 201})
}