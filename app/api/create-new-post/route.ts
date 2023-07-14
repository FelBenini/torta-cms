import { postController } from "@/lib/mongodb/controllers/postController";
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
  const newPost = await postController.createPost(token.name as string, type)
  return NextResponse.json({location: newPost._id}, {status: 201})
}