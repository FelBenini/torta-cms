import { PostFunctions } from "@/lib/db/postFunctions";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, url: any) {
  const id = url.params.id
  const token = await getToken({req})
  const request = await req.json()

  if (!token) {
    return NextResponse.json({'message': `You are not allowed to alter the post of id: ${id}`}, {status: 401})
  }

  if (!request.title || !request.content) {
    return NextResponse.json({'message': 'Bad request'}, {status: 400})
  }
  const updatedPost = await PostFunctions.updatePost(id, request.title, request.content)
  if (!updatedPost) {
    return NextResponse.json({'message': 'Not found'}, {status: 404})
  }
  return NextResponse.json(updatedPost, {status: 201})
}