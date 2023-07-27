import PostController from "@/prisma/controllers/postController";
import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req});
  if (!token) {
    return NextResponse.json({'message': 'Unauthorized'}, {status: 401})
  }
  const {id} = params;
  const post = await PostController.publishAPost(parseInt(id));
  return NextResponse.json(post);
}