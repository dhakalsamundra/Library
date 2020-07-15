import { combineReducers } from 'redux'

import book from './book'
import author from './author'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    book,
    author,
    user,
  })

export default createRootReducer
