import { Dispatch } from 'redux'
import axios from 'axios'

import {
  createAuthor,
  removeAuthor,
  getAllAuthors,
  authorUpdate,
} from '../redux/actions/author'
import { AddAuthor, Author } from '../types'

const baseUrl = 'http://localhost:3001/api/v1/authors'

const getAll = async (dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'GET', url: baseUrl })
    dispatch(getAllAuthors(response.data))
  } catch (error) {
    console.log(error)
  }
}
const create = async (newAuthor: AddAuthor, dispatch: Dispatch) => {
  try {
    const response = await axios({
      method: 'POST',
      url: baseUrl,
      data: newAuthor,
    })
    dispatch(createAuthor(response.data))
  } catch (error) {
    console.log(error)
  }
}

const deleteAuthor = async (author: Author, dispatch: Dispatch) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${baseUrl}/${author._id}`,
      data: author,
    })
    dispatch(removeAuthor(author))
  } catch (error) {
    console.log('this is the error', error)
  }
}

const updateAuthor = async (author: Author, dispatch: Dispatch) => {
  // const updatedAuthor = {
  //   _id: item?._id,
  //   firstName: newFirstName,
  //   lastName: newLastName,
  //   dateOfBirth: newDateOfBirth,
  //   book: newBook,
  // }
  try {
    const response = await axios({
      method: 'PUT',
      url: `${baseUrl}/${author._id}`,
      data: authorUpdate,
    })
    dispatch(authorUpdate(author))
  } catch (error) {
    console.log('this is the error', error)
  }
}

export default { getAll, create, deleteAuthor, updateAuthor }
