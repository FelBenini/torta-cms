import dbConnect from '@/lib/mongodb';
import Image from '@/lib/mongodb/models/Image'
import { NextResponse } from "next/server";

export async function GET(req: Request, url: any) {
  await dbConnect()
  const title = url.params.title
  const img = await Image.findOne({title: title,
  day: parseInt(url.params.day),
  month: parseInt(url.params.month),
  year: parseInt(url.params.year)
  })

  if (!img) {
    return new NextResponse('', {status: 404})
  }
  return new NextResponse(img.data, {headers: {
    'Content-Type': 'image/jpeg'}})
}