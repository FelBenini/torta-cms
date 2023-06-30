import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import imageController from '@/lib/mongodb/controllers/imageController'

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
  const mongoImg = await imageController.saveAnImage(file, filename, mime.getExtension(file.type) as string)
  console.log(mongoImg._id)

  return NextResponse.json({'location': `/image/${mongoImg.day}/${mongoImg.month}/${mongoImg.year}/${mongoImg.title}`})
}