import { Dispatch } from 'redux'

import AuthorService from '../../services/author'
import {
  Author,
  AddAuthor,
  CREATE_AUTHOR,
  AuthorActions,
  REMOVE_AUTHOR,
  UPDATE_AUTHOR,
  GET_ALL_AUTHORS,
} from '../../types'

export const getAllAuthors = (authors: Author[]): AuthorActions => {
  return {
    type: GET_ALL_AUTHORS,
    payload: {
      authors,
    },
  }
}

export const createAuthor = (author: Author): AuthorActions => {
  return {
    type: CREATE_AUTHOR,
    payload: {
      author,
    },
  }
}

export const removeAuthor = (author: Author): AuthorActions => {
  return {
    type: REMOVE_AUTHOR,
    payload: {
      author,
    },
  }
}

export const authorUpdate = (author: Author): AuthorActions => {
  return {
    type: UPDATE_AUTHOR,
    payload: {
      author,
    },
  }
}

//service and using the axios client request is sent to the server and response will get back up here again in their own place.
export function fetchAuthorsThunk() {
  return async (dispatch: Dispatch) => {
    return AuthorService.getAll(dispatch)
  }
}

export function addAuthorThunk(author: AddAuthor) {
  return async (dispatch: Dispatch) => {
    return AuthorService.create(author, dispatch)
  }
}

export function deleteAuthorThunk(author: Author) {
  return async (dispatch: Dispatch) => {
    return AuthorService.deleteAuthor(author, dispatch)
  }
}

export function editAuthorThunk(author: Author) {
  return async (dispatch: Dispatch) => {
    return AuthorService.updateAuthor(author, dispatch)
  }
}
