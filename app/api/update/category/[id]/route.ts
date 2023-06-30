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
  if (post.categories.includes(body.category)) {
    post.categories.pull(body.category)
    await post.save()
    return NextResponse.json({ 'removed': post.categories })
  } else {
    post.categories.push(body.category)
    await post.save()
    return NextResponse.json({ 'included': 'included' })
  }
}