import { postController } from "@/lib/mongodb/controllers/postController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = new URL (req.url)
  const hostname = url.toString().replace('/api/posts', '')
  const page = parseInt(searchParams.get('page') as string) || 1
  const limit = parseInt(searchParams.get('limit') as string) || 15
  const data = await postController.getPublishedPosts(page, limit);

  const modifiedPosts = data.posts.map((post) => {
    const modifiedContent = post.content?.replaceAll('src="../../image', `src="${hostname}/image`);
    return { ...post, content: modifiedContent };
  })

  data.posts = modifiedPosts
  return NextResponse.json(data)
}