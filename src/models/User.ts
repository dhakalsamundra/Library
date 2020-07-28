import mongoose, { Document } from 'mongoose'
import crypto from 'crypto'

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  picture?: string;
  password: string;
  role: string;
  resetPasswordExpires?: number;
  resetPasswordToken?: string;
  generatePasswordReset: Function;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  userName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Number,
    required: false,
  },
})

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the password should not be revealed
//     delete returnedObject.password
//   },
// })

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000 //expires in an hour
}

export default mongoose.model<UserDocument>('User', userSchema)
