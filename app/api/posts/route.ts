import categoriesController from "@/lib/mongodb/controllers/categoriesController";
import { postController } from "@/lib/mongodb/controllers/postController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const { origin } = new URL(req.url)
  const page = parseInt(searchParams.get('page') as string) || 1
  const limit = parseInt(searchParams.get('limit') as string) || 15
  let order: string;
  if (searchParams.get('order') !== 'oldest') {
    order = '-publishedAt'
  } else {
    order = 'publishedAt'
  }

  if (searchParams.get('search')) {
    const queriedData = await postController.searchForPublishedPosts(searchParams.get('search') as string, page, limit);
    return NextResponse.json(queriedData)
  }

  let data;

  if (!searchParams.get('category')) {
    data = await postController.getPublishedPosts(page, limit, order);
  } else {
    data = await categoriesController.findPublishedPostsByCategory(searchParams.get('category'), page, limit, order)
  }

  if (!data) {
    return NextResponse.json({}, {status: 204})
  }

  const modifiedPosts = data.posts.map((post) => {
    const modifiedContent = post.content?.replaceAll('src="../../image', `src="${origin}/image`);
    return { ...post, content: modifiedContent };
  })

  data.posts = modifiedPosts
  return NextResponse.json(data)
}