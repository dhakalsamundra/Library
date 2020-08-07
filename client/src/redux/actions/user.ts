import { Dispatch } from 'redux'

import UserService from '../../services/googleSignIn'
import { UserActions, User, GOOGLE_SIGNIN, REGISTER_USER, SIGNOUT, AddUser, SignIn, SIGNIN, FORGET_PASSWORD, newPassword, UpdatePassword, RESET_PASSWORD} from '../../types'

export const userSignIn = (user: User): UserActions => {
  return {
    type: GOOGLE_SIGNIN,
    payload: {
      user,
    },
  }
}

export const createUser = (user: User): UserActions => {
  return {
    type: REGISTER_USER,
    payload: {
      user
    }
  }
}

export const signedUser = (user: User) => {
  return {
    type: SIGNIN,
    payload: {
      user
    }
  }
}

export const userSignOut = () => {
  return {
    type: SIGNOUT,
    payload: {},
  }
}

export const PasswordResetLink = (email: string) => {
  return {
    type: FORGET_PASSWORD,
    payload: {
      email
    }
  }
}

export const resetNewPasswod = (password: string) => {
  return {
    type: RESET_PASSWORD,
    payload: {
      password
    }
  }
}


export function googleSignInThunk(tokenId: string) {
  return async (dispatch: Dispatch) => {
    return UserService.GoogleSignIn(tokenId, dispatch)
  }
}

export function addUserThunk(user: AddUser) {
  return async (dispatch: Dispatch) => {
    return UserService.create(user, dispatch)
  }
}
export function signInThunk (user: SignIn) {
  return async (dispatch: Dispatch) => {
    return UserService.signInUser(user, dispatch)
  }
}

export function ForgetPasswordThunk (email: string) {
  return async (dispatch: Dispatch) => {
    return UserService.forgetPassword(email, dispatch)
  }
}

export function addNewPasswordThunk(password: newPassword) {
  return async (dispatch: Dispatch) => {
    return UserService.resetPassword(password, dispatch)
  }
}

export function updatePasswordThunk(password: UpdatePassword) {
  return async (dispatch: Dispatch) => {
    return UserService.passwordUpdate(password, dispatch)
  }
}
