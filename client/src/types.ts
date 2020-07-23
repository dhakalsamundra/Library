import SignIn from "./components/SignIn/signIn"

//ACTION TYPE Book
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const SEARCH_BOOK = 'SEARCH_BOOK'

// ACTION TYPE AUTHOR
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'

//ACTION TYPE NORMAL SIGNIN
export const REGISTER = 'REGISTER'

// ACTION TYPE GOOGLE SIGNIN
export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN'
export const REGISTER_USER = 'REGISTER_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SIGNOUT = 'SIGNOUT'
export const SIGNIN = 'SIGNIN'

// Book type
export type Book = {
  _id: string | any
  title: string
  ISBN: string
  author: string
  status: string
  publishedDate: Date | string
  publisher: string
  genres: string
}
// this addBook is again made so that it doesn't show error of missing id from author and id is the one which databse create in each entry of new book.
// or can also be done like using the Book type with omitting the id like this: export type AddBook = Omit<Book, '_id'>
export type AddBook = {
  title: string
  ISBN: string
  author: string
  status: string
  publishedDate: Date | string
  publisher: string
  genres: string
}

export type getAllBooksAction = {
  type: typeof GET_ALL_BOOKS
  payload: {
    books: Book[]
  }
}
export type createBookAction = {
  type: typeof CREATE_BOOK
  payload: {
    book: Book
  }
}
export type removeBookAction = {
  type: typeof REMOVE_BOOK
  payload: {
    book: Book
  }
}
export type updateBookAction = {
  type: typeof UPDATE_BOOK
  payload: {
    book: Book
  }
}

export type searchBookAction = {
  type: typeof SEARCH_BOOK
  payload: {
    searchTerm: string
  }
}

export type BookActions =
  | getAllBooksAction
  | createBookAction
  | removeBookAction
  | updateBookAction
  | searchBookAction

export type BookState = {
  // should passed the author which have _id property too so that it is used while deleting the author
  items: Book[]
}

// section of declaring the part of author

export type Author = {
  _id: string
  firstName: string
  lastName: string
  dateOfBirth: Date | string
  book: string
}
export type AddAuthor = {
  firstName: string
  lastName: string
  dateOfBirth: Date | string
  book: string
}
export type getAllAuthorsAction = {
  type: typeof GET_ALL_AUTHORS
  payload: {
    authors: Author[]
  }
}
export type createAuthorAction = {
  type: typeof CREATE_AUTHOR
  payload: {
    author: Author
  }
}
export type removeAuthorAction = {
  type: typeof REMOVE_AUTHOR
  payload: {
    author: Author
  }
}
export type updateAuthorAction = {
  type: typeof UPDATE_AUTHOR
  payload: {
    author: Author
  }
}

export type AuthorActions =
  | getAllAuthorsAction
  | createAuthorAction
  | removeAuthorAction
  | updateAuthorAction

export type AuthorState = {
  // should passed the author which have _id property too so that it can be used while deleting the author
  items: Author[]
}

// section of declaring the part of user and user's login

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  picture?: string
  password: string
  userName: string
  role: string
}

export type AddUser = {
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password: string
  confirmPassword: string
}
export type SignIn = {
  email: string,
  password: string
}
export type SignInAction = {
  type: typeof GOOGLE_SIGNIN
  payload: {
    user: User
  }
}
export type SignInUserAction = {
  type: typeof SIGNIN
  payload: {
    user: User
  }
}
export type createUserAction = {
  type: typeof REGISTER_USER
  payload: {
    user: User
  }
}
export type removeUserAction = {
  type: typeof REMOVE_USER
  payload: {
    user: User
  }
}
export type updateUserAction = {
  type: typeof UPDATE_USER
  payload: {
    user: User
  }
}
// while signing Out, we do not need the payload. instead, we will remove the payload of user and then it will sign out
export type SignOutAction = {
  type: typeof SIGNOUT
  payload: {}
}
export type UserActions = SignInAction | SignOutAction | removeUserAction | createUserAction | updateUserAction | SignInUserAction

export type UserState = {
  users: User[],
  isAuthorized: Boolean
}

export type AppState = {
  book: BookState
  author: AuthorState
  user: UserState
}
