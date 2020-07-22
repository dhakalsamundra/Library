import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName?: string;
  lastName?: string;
  email: string;
  googleId: string;
  picture?: string;
  password: string;
  userName?: string;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
  },
  picture: {
    type: String,
  },
  password: {
    type: String
  },
  userName: {
    type: String
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
