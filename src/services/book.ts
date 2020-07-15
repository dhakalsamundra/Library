import Book, { BookDocument } from '../models/Book'
import UserService from '../services/user'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

function create(book: BookDocument): Promise<BookDocument> {
  return book.save()
}

async function findAll(): Promise<BookDocument[]> {
  return Book.find().sort({ title: 1, publishedDate: -1 }).exec()
}

// function filteredByQuery(key: string, value: string): Promise<BookDocument[]> {
//   return Book.find({ [key]: value })
//     .exec()
//     .then((book) => {
//       if (!book) {
//         throw new Error('Book  not found')
//       }
//       return book
//     })
// }

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
      return book.save()
    })
}

function deleteBook(bookId: string): Promise<BookDocument | null> {
  return Book.findByIdAndDelete(bookId).exec()
}

function borrowBook(bookId: string, userId: string) {
  return Book.findById(bookId)
    .exec()
    .then(async (book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      if (book.status === 'borrowed') {
        throw new BadRequestError(`${bookId} has been borrowed.`)
      } else {
        const user = await UserService.findById(userId)
        book.borrowedDate = new Date()
        // once borrowed the book, status of available should be changed to borrowed from default.
        book.status = 'borrowed'
        book.borrowerId = user.id

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
        if (book.status === 'borrowed') {
          throw new NotFoundError(
            `Book will only be available in library from ${book.returnDate}`
          )
        } else {
          // once unborrowed the book, status should be changed to available.
          book.status = 'available'
          return book.save()
        }
      }
    })
}

export default {
  create,
  findById,
  findAll,
  // filteredByQuery,
  update,
  deleteBook,
  borrowBook,
  returnBook,
}
