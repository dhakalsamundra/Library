import mongoose, { Document } from 'mongoose'

type Status = 'available' | 'borrowed'

export type BookDocument = Document & {
  title: string;
  ISBN: string;
  author: string[];
  borrowerId?: string;
  borrowedDate?: Date;
  returnDate?: Date;
  status: string;
  publishedDate: Date;
  publisher: string;
  genres: string;
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    index: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  borrowerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  borrowedDate: {
    type: Date,
  },
  returnedDate: {
    type: Date,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
