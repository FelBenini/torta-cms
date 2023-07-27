import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prismaClient'
import { Prisma } from "@prisma/client";
import { Post } from "@/lib/DataModels/Post";
import { splitString } from "@/lib/DataModels/splitString";

class RemoveDataFromPost {
  title: string = ''
  backgroundImage?: string | null = ''
  publishedAt: Date | null | undefined | string = new Date(Date.now())
  updatedAt: Date | null | undefined | string = new Date(Date.now())
  categories: Array<string> | undefined | null
  tags: Array<string> | null | undefined
  postUrl: string = ''
  postedBy: string = ''
  content: string = ''
  summary: string | null | undefined
  constructor(post: Prisma.PostCreateInput) {
    this.title = post.title
    this.backgroundImage = post.backgroundImage
    this.publishedAt = post.publishedAt
    this.updatedAt = post.updatedAt
    this.categories = splitString(post.categories as string)
    this.tags = splitString(post.tags as string)
    this.summary = post.summary
    this.postedBy = post.postedBy
    this.content = post.content
  }
}

export async function GET(req: NextRequest, { params }: { params: { slug: string, day: string, month: string, year: string } }) {
  const endDate = parseInt(params.day) + 1
  const { origin } = new URL(req.url)
  const post = await prisma.publishedPost.findFirst({
    where: {
      searchTitle: params.slug,
      publishedAt: {
        gte: new Date(`${params.year}-${params.month}-${params.day}`),
        lte: new Date(`${params.year}-${params.month}-${endDate}`)
      },
      NOT: {
        type: 'page'
      }
    }
  })
  if (!post) {
    return NextResponse.json({}, { status: 404 })
  }
  post.content = post.content?.replaceAll('src="../../image', `src="${origin}/image`)
  return NextResponse.json(new RemoveDataFromPost(post));
}