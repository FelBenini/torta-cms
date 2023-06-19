import mongoose, { model } from 'mongoose'

export type UserType = {
  username: string,
  password: string,
  email: string,
  role: string,
  updatedAt?: string,
  profilePic?: string,
  apiKey?: string
}

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  createdAt: {type: Date, required: true, default: Date.now()},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  updatedAt: {type: Date},
  profilePic: {type: String},
  apiKey: {type: String}
})

const User = mongoose.models.User ||  model('User', UserSchema);

export default User