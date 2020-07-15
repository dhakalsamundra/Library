import {
  BookState,
  BookActions,
  GET_ALL_BOOKS,
  CREATE_BOOK,
  REMOVE_BOOK,
  SEARCH_BOOK,
} from '../../types'

export default function book(
  state: BookState = {
    items: [],
    filteredBook: [],
  },
  action: BookActions
): BookState {
  switch (action.type) {
    case GET_ALL_BOOKS: {
      const { books } = action.payload
      return { ...state, items: books, filteredBook: books }
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
    case SEARCH_BOOK: {
      const { searchTerm } = action.payload
      // const searchedBook = state.items.filter((element: { title: string }) =>
      //   element.title.toLowerCase().includes(searchTerm.toLowerCase())
      // )
      return {
        ...state,
        filteredBook: state.items.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }
    }
    default:
      return state
  }
}
