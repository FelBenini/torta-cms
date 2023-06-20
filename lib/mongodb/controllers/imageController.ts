import dbConnect from '..';
import Image from '../models/Image'

export default class imageController {
  public static saveAnImage = async (blob: Blob) => {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const date = new Date(Date.now())
    await dbConnect();

    const img = new Image({
      title: 'arriba',
      day: parseInt(date.getDate().toString().padStart(2, "0")),
      month: parseInt((date.getMonth() + 1).toString().padStart(2, '0')),
      year: date.getFullYear(),
      data: buffer,
      contentType: 'image/png'
    })
    await img.save()
    return img
  }
}