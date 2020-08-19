import Book, { BookDocument } from '../models/Book'
import UserService from '../services/user'
import { UserDocument } from '../models/User'
import { BadRequestError } from '../helpers/apiError'

function create(book: BookDocument): Promise<BookDocument> {
  return book.save()
}

async function findAll(): Promise<BookDocument[]> {
  return Book.find().sort({ title: 1, publishedDate: -1 }).exec()
}

type queryPayload = {
  title?: string;
  status?: string;
  publisher?: string;
  author?: string;
  genres?: string;
}
async function filteredByQuery(query: queryPayload): Promise<BookDocument[]> {
  const myFilter: queryPayload = {}
  if (query.title) {
    myFilter.title = query.title
  }

  if (query.status) {
    myFilter.status = query.status
  }
  if (query.author) {
    myFilter.author = query.author
  }
  if (query.genres) {
    myFilter.genres = query.genres
  }
  if (query.publisher) {
    myFilter.publisher = query.publisher
  }
  return Book.find(myFilter)
    .sort({ title: 1, publishedDate: -1 })
    .then((book) => {
      if (book.length === 0) {
        throw new Error('Book not found')
      }
      return book
    })
}

function findById(bookId: string): Promise<BookDocument> {
  return Book.findById(bookId)
    .populate('Author', { firstName: 1, dateOfBirth: 1 })
    .exec() // .exec() will return a true Promise
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      return book
    })
}

function update(
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }

      if (update.title) {
        book.title = update.title
      }
      if (update.author) {
        book.author = update.author
      }
      if (update.ISBN) {
        book.ISBN = update.ISBN
      }
      if (update.status) {
        book.status = update.status
      }
      if (update.publisher) {
        book.publisher = update.publisher
      }
      if (update.publishedDate) {
        book.publishedDate = update.publishedDate
      }
      if (update.genres) {
        book.genres = update.genres
      }
      return book.save()
    })
}

function deleteBook(bookId: string): Promise<BookDocument | null> {
  return Book.findByIdAndDelete(bookId).exec()
}

function borrowBook(
  bookId: string,
  userId: string
): Promise<BookDocument | null> {
  return Book.findById(bookId)
    .exec()
    .then(async (book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      if (book.status === 'borrowed') {
        throw new BadRequestError(`Book ${bookId} has been borrowed.`)
      } else {
        const user = await UserService.findById(userId)
        book.borrowedDate = new Date()
        // once borrowed the book, status of available should be changed to borrowed from default.
        book.status = 'borrowed'
        book.borrowerId = user._id

        return book.save()
      }
    })
}

function returnBook(bookId: string): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      } else {
        ;(book.status = 'available'),
          (book.borrowerId = undefined),
          (book.borrowedDate = undefined)
        return book.save()
      }
    })
}

export default {
  create,
  findById,
  findAll,
  filteredByQuery,
  update,
  deleteBook,
  borrowBook,
  returnBook,
}
