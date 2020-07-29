
//ACTION TYPE Book
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const CREATE_BOOK = 'CREATE_BOOK'
export const ADD_BOOK_IN_CART = 'ADD_BOOK'
export const REMOVE_BOOK_IN_CART = 'REMOVE_BOOK_IN_CART'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const SEARCH_BOOK = 'SEARCH_BOOK'
export const BORROW_BOOK = 'BORROW_BOOK'
export const UNBORROW_BOOK = 'UNBORROW_BOOK'

// ACTION TYPE AUTHOR
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'

//ACTION TYPE NORMAL SIGNIN
export const REGISTER = 'REGISTER'

// ACTION TYPE  SIGNIN
export const GOOGLE_SIGNIN = 'GOOGLE_SIGNIN'
export const REGISTER_USER = 'REGISTER_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SIGNOUT = 'SIGNOUT'
export const SIGNIN = 'SIGNIN'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const FORGET_PASSWORD = 'FORGET_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'

// Book type
export type Book = {
  _id: string
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
export type addBookInCartAction = {
  type: typeof ADD_BOOK_IN_CART
  payload: {
    book: Book
  }
}
export type removeBookInCartAction = {
  type: typeof REMOVE_BOOK_IN_CART
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

export type borrowBookAction = {
  type: typeof BORROW_BOOK
  payload: {
    book: Book
  }
}
export type unborrowBookAction = {
  type: typeof UNBORROW_BOOK
  payload: {
    book: Book
  }
}

export type BookActions =
  | getAllBooksAction
  | createBookAction
  | addBookInCartAction
  | removeBookInCartAction
  | removeBookAction
  | updateBookAction
  | searchBookAction
  | borrowBookAction
  | unborrowBookAction

export type BookState = {
  // should passed the author which have _id property too so that it is used while deleting the author
  items: Book[],
  inCart: Book[]
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
export type updatePasswordAction = {
  type: typeof UPDATE_PASSWORD
  payload: {
    password: string
  }
}
// while signing Out, we do not need the payload. instead, we will remove the payload of user and then it will sign out
export type SignOutAction = {
  type: typeof SIGNOUT
  payload: {}
}
export type forgetPasswordAction = {
  type: typeof FORGET_PASSWORD
  payload: {
    email: string
  }
}
export type resetPasswordAction = {
  type: typeof RESET_PASSWORD
  payload: {
    password: string
  }
}
export type UserActions = 
  | SignInAction 
  | SignOutAction 
  | removeUserAction 
  | createUserAction 
  | updateUserAction 
  | SignInUserAction 
  | updatePasswordAction 
  | forgetPasswordAction 
  | resetPasswordAction

export type UserState = {
  users: User[],
  isAuthorized: Boolean,
  inCart: User[]
}

export type AppState = {
  book: BookState
  author: AuthorState
  user: UserState
}
