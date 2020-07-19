import axios from 'axios'
import { Dispatch } from 'redux'

import {
  getAllBooks,
  createBook,
  removeBook,
  bookUpdate,
} from '../redux/actions/book'
import { Book, AddBook } from '../types'

// by doing this, we don't need to put all authorization headers inside each function
(function() {
  const token = localStorage.getItem('signIn-token');
  if (token) {
      axios.defaults.headers.common['Authorization'] = token;
  } else {
      axios.defaults.headers.common['Authorization'] = null;
      /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
})();

  
const baseUrl = 'http://localhost:3001/api/v1/books'
const token = localStorage.getItem('signIn-token')


const getAll = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(baseUrl)
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
    const url = `${baseUrl}/${book._id}`
    const data = book
    const response = await axios.put(url, data)
    console.log('updated book from server response', response.data)
    dispatch(bookUpdate(response.data))
  } catch (error) {
    console.log('this is error ', error)
  }
}

export default { getAll, create, deleteBook, updateBook }
