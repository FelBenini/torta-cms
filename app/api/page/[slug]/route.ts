import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prismaClient'
import { Prisma } from "@prisma/client";

export class RemoveDataFromPost {
  title: string = ''
  redirectUrl: string
  backgroundImage?: string | null = ''
  publishedAt: Date | null | undefined | string = new Date(Date.now())
  updatedAt: Date | null | undefined | string = new Date(Date.now())
  categories: Array<string> | undefined | null
  tags: string[] | null | undefined
  postUrl: string = ''
  postedBy: string = ''
  content: string = ''
  summary: string | null | undefined
  constructor(post: Prisma.PublishedPostCreateInput) {
    this.title = post.title
    this.backgroundImage = post.backgroundImage
    this.publishedAt = post.publishedAt
    this.updatedAt = post.updatedAt
    if (post.categories !== '' && post.categories !== '' && post.categories !== ', ') {
      this.categories = post.categories?.split(', ')
    } else {
      this.categories = []
    }
    if (post.tags && post.tags !== '' && post.tags !== ', ') {
      this.categories = post.tags?.split(', ')
    } else {
      this.categories = []
    }
    this.summary = post.summary
    this.postedBy = post.postedBy
    this.redirectUrl = post.searchTitle
    this.content = post.content
  }
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { origin } = new URL(req.url)
  const page = await prisma.publishedPost.findFirst({
    where: {
      searchTitle: params.slug,
      type: 'page'
    }
  })
  if (!page) {
    return NextResponse.json({}, { status: 404 })
  }
  page.content = page.content?.replaceAll('src="../../image', `src="${origin}/image`)

  return NextResponse.json(new RemoveDataFromPost(page));
}