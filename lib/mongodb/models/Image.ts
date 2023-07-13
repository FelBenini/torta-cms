import mongoose, { model } from 'mongoose'

export interface IImage {
  title: string,
  day: number,
  month: number,
  year: number,
  data: Buffer,
  contentType: string
}

export interface IImageDocument extends IImage, mongoose.Document { }
export interface IImageModel extends mongoose.Model<IImageDocument> {
    buildUser(args: IImage): IImageDocument
}


const ImageSchema: mongoose.Schema = new mongoose.Schema({
  title: {type: String, required: true},
  day: {type: Number, required: true},
  month: {type: Number, required: true},
  year: {type: Number, required: true},
  data: {type: Buffer, required: true},
  contentType: {type: String, required: true}
})

const Image = mongoose.models.Image<IImage> ||  model<IImageDocument, IImageModel>('Image', ImageSchema);

export default Image;