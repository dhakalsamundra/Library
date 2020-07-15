import {
  AuthorState,
  AuthorActions,
  CREATE_AUTHOR,
  REMOVE_AUTHOR,
  GET_ALL_AUTHORS,
  UPDATE_AUTHOR,
} from '../../types'

export default function author(
  state: AuthorState = {
    items: [],
  },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
    case GET_ALL_AUTHORS: {
      const { authors } = action.payload
      return { ...state, items: authors }
    }

    case CREATE_AUTHOR: {
      const { author } = action.payload
      return {
        ...state,
        items: [...state.items, author],
      }
    }

    case REMOVE_AUTHOR: {
      const { author } = action.payload
      const newItems = state.items.filter(
        (element) => element._id !== author._id
      )
      return { ...state, items: newItems }
    }
    case UPDATE_AUTHOR: {
      const { author } = action.payload
      return {
        ...state,
        items: [...state.items, author],
      }
    }

    default:
      return state
  }
}
