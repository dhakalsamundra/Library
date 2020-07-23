import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  picture?: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
  },
  password: {
    type: String
  },
  userName: {
    type: String
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    default: 'user'
  }
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

export default mongoose.model<UserDocument>('User', userSchema)
