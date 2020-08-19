import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import User from '../models/User'

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      author,
      ISBN,
      status,
      publishedDate,
      publisher,
      genres,
    } = req.body

    const book = new Book({
      title,
      author,
      ISBN,
      status,
      publishedDate,
      publisher,
      genres,
    })

    const savedBook = await BookService.create(book)
    res.json(savedBook)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const getFilteredByQueryInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query
    const response = await BookService.filteredByQuery(filter)
    res.json(response)
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export async function borrowBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findById(req.body.userId)
    const { bookId } = req.params
    if (user) {
      const bookBorrowed = await BookService.borrowBook(bookId, user)
      res.json(bookBorrowed)
    }
  } catch (error) {
    next(new NotFoundError(error))
  }
}

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    const book = await BookService.returnBook(bookId)
    if (book) {
      res.json(book)
    }
  } catch (error) {
    if (error.statusCode === 400) {
      next(new BadRequestError(error))
    } else {
      next(new NotFoundError(error))
    }
  }
}
// testing functionality. TODO in better way...
export const showUserBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body
    const userBooks = await Book.find({ borrowerId: userId })
    res.json(userBooks)
  } catch (error) {
    next(new InternalServerError('Internal Server Error', error))
  }
}
