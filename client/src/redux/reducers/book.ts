import {
  BookState,
  BookActions,
  GET_ALL_BOOKS,
  CREATE_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK,
  BORROW_BOOK,
  UNBORROW_BOOK,
  GET_USER_BOOKS
} from '../../types'

export default function book(
  state: BookState = {
    items: [], 
    inCart: []
    },
  action: BookActions
): BookState {
  switch (action.type) {
    case GET_ALL_BOOKS: {
      const { books } = action.payload
      return { ...state, items: books }
    }
    case GET_USER_BOOKS: {
      const {books} = action.payload
      return { ...state, inCart: books}
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
    case UPDATE_BOOK: {
      const { book } = action.payload
      return {
        ...state,
        items: state.items.map((oldBook) =>
          oldBook._id === book._id ? book : oldBook
        ),
      }
    }
    case BORROW_BOOK: {
      const {book} = action.payload
      return {
        ...state, inCart: [...state.inCart, book]
      }
    }
    case UNBORROW_BOOK: {
      const {book} = action.payload
      const index = state.inCart.findIndex((p)=> p._id === book._id )
      if (index >= 0) {
        // remove the particular book in that index from cart
        state.inCart.splice(index, 1)
        return { ...state, inCart: [ ...state.inCart]}
      }
    }
    // case SEARCH_BOOK: {
    //   const { searchTerm } = action.payload
    //   const searchedBook = state.items.filter((element: { title: string }) =>
    //     element.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   )
    // }
    default:
      return state
  }
}
