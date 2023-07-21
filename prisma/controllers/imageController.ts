import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient({})

export default class ImageController {
  public static saveAnImage = async (blob: Blob, filename: string, filetype: string) => {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const date = new Date(Date.now())

    const img = await prisma.image.create({data: {
      title: filename,
      day: parseInt(date.getDate().toString().padStart(2, "0")),
      month: parseInt((date.getMonth() + 1).toString().padStart(2, '0')),
      year: date.getFullYear(),
      data: buffer,
      contentType: `image/${filetype}`
    }})
    return img
  }
}