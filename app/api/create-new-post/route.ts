import { postController } from "@/lib/mongodb/controllers/postController";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }
  const newPost = await postController.createPost(token.name as string)
  return NextResponse.json({location: newPost._id}, {status: 201})
}