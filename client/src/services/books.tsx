import axios from 'axios'
import { Dispatch } from 'redux'

import {
  getAllBooks,
  createBook,
  removeBook,
  bookUpdate,
} from '../redux/actions/book'
import { Book, AddBook } from '../types'

const baseUrl = 'http://localhost:3001/api/v1/books'

const getAll = async (dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'GET', url: baseUrl })
    dispatch(getAllBooks(response.data))
  } catch (error) {
    console.log(error)
  }
}

const create = async (book: AddBook, dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'POST', url: baseUrl, data: book })
    dispatch(createBook(response.data))
  } catch (error) {
    console.log(error)
  }
}

const deleteBook = async (book: Book, dispatch: Dispatch) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${baseUrl}/${book._id}`,
      data: book,
    })
    dispatch(removeBook(book))
  } catch (error) {
    console.log('this is error ', error)
  }
}

const updateBook = async (book: Book, dispatch: Dispatch) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${baseUrl}/${book._id}`,
      data: book,
    })
    dispatch(bookUpdate(book))
  } catch (error) {
    console.log('this is error ', error)
  }
}

export default { getAll, create, deleteBook, updateBook }
