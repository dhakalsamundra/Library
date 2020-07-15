import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  book: string;
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
})

// authorSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   },
// })

export default mongoose.model<AuthorDocument>('Author', authorSchema)
