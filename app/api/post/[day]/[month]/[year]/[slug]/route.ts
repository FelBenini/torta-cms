import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PublishedPosts from "@/lib/mongodb/models/PublishedPosts";

export async function GET(req: NextRequest, { params }: { params: { slug: string, day: string, month: string, year: string }}) {
  await dbConnect();
  const endDate = parseInt(params.day) + 1
  const titleQuery = params.slug.replace(/-/g, ' ');
  const titleRegex = new RegExp(titleQuery.replace(/\s+/g, '.*'), 'i')
  const post = await PublishedPosts.findOne({
    publishedAt: {
      $gte: `${params.year}-${params.month}-${params.day}`,
      $lte: `${params.year}-${params.month}-${endDate}`
    },
    title: {$regex: titleRegex}
  }).exec();

  return NextResponse.json(post);
}