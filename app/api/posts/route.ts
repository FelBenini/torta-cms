import { postController } from "@/lib/mongodb/controllers/postController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') as string) || 1
  const limit = parseInt(searchParams.get('limit') as string) || 15
  const data = await postController.getPublishedPosts(page, limit);
  return NextResponse.json(data)
}