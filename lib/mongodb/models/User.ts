import mongoose, { model, Document } from 'mongoose'

interface IUser {
  username: string,
  password: string,
  email: string,
  role: string,
  updatedAt?: string,
  profilePic?: string,
  apiKey?: string
}

export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends mongoose.Model<IUserDocument> {
    buildUser(args: IUser): IUserDocument
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  createdAt: {type: Date, required: true, default: Date.now()},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  updatedAt: {type: Date},
  profilePic: {type: String},
  apiKey: {type: String}
})

const User = mongoose.models.User<IUser> ||  model<IUserDocument, IUserModel>('User', UserSchema);

export default User
export type UserType = IUser;