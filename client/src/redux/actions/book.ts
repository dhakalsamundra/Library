import { Dispatch } from 'redux'

import BookServices from '../../services/books'
import {
  GET_ALL_BOOKS,
  BookActions,
  Book,
  CREATE_BOOK,
  REMOVE_BOOK,
  AddBook,
} from '../../types'

export const getAllBooks = (books: Book[]): BookActions => {
  return {
    type: GET_ALL_BOOKS,
    payload: {
      books,
    },
  }
}

export const createBook = (book: Book): BookActions => {
  return {
    type: CREATE_BOOK,
    payload: {
      book,
    },
  }
}

export const removeBook = (book: Book): BookActions => {
  return {
    type: REMOVE_BOOK,
    payload: {
      book,
    },
  }
}

// fetchBooksThunk will be import in the home page and using useeffect data will be render there.
export function fetchBooksThunk() {
  return async (dispatch: Dispatch) => {
    return BookServices.getAll(dispatch)
  }
}

export function addBookThunk(book: AddBook) {
  return async (dispatch: Dispatch) => {
    return BookServices.create(book, dispatch)
  }
}

export function deleteBookThunk(book: Book) {
  return async (dispatch: Dispatch) => {
    return BookServices.deleteBook(book, dispatch)
  }
}
