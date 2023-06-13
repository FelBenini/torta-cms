import mongoose, { model } from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  createdAt: {type: Date, required: true, default: Date.now()},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  updatedAt: {type: Date},
  profilePic: {type: String}
})

const User = mongoose.models.User ||  model('users', UserSchema);

export default User