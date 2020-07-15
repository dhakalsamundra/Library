import {
  BookState,
  BookActions,
  GET_ALL_BOOKS,
  CREATE_BOOK,
  REMOVE_BOOK,
} from '../../types'

export default function book(
  state: BookState = {
    items: [],
  },
  action: BookActions
): BookState {
  switch (action.type) {
    case GET_ALL_BOOKS: {
      const { books } = action.payload
      return { ...state, items: books }
    }
    case CREATE_BOOK: {
      const { book } = action.payload
      return { ...state, items: [...state.items, book] }
    }
    case REMOVE_BOOK: {
      const { book } = action.payload
      const newItems = state.items.filter((item) => item._id !== book._id)
      return { ...state, items: newItems }
    }
    default:
      return state
  }
}