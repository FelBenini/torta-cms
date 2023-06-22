import { PostFunctions } from "@/lib/db/postFunctions"
import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req});
  if (!token) {
    return NextResponse.json({'message': 'Unauthorized'}, {status: 401})
  }
  const {id} = params;
  const post = await PostFunctions.publishAPost(id);
  return NextResponse.json(post);
}