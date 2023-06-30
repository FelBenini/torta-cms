import { postController } from "@/lib/mongodb/controllers/postController";
import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req});
  if (!token) {
    return NextResponse.json({'message': 'Unauthorized'}, {status: 401})
  }
  const body = await req.json()
  const {id} = params;
  const tags = await postController.updateTags(id, body.tags)
  return NextResponse.json(tags);
}