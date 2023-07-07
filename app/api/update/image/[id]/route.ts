import dbConnect from "@/lib/mongodb";
import { postController } from "@/lib/mongodb/controllers/postController";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ 'message': 'Not authorized' }, { status: 401 })
  }
  const body = await req.json()
  const post = await postController.getOnePostById(params.id)
  post.backgroundImage = body.imageUrl;
  await post.save()
  return NextResponse.json({'location': post.backgroundImage});
}