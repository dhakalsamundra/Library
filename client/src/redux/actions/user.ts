import axios from 'axios'
import { Dispatch } from 'redux'

import UserService from '../../services/googleSignIn'
import { UserActions, User, GOOGLE_SIGNIN, REGISTER_USER, SIGNOUT, AddUser, /*registerUser, RegisterUserAction*/ } from '../../types'

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

export const userSignOut = () => {
  return {
    type: SIGNOUT,
    payload: {},
  }
}


export function googleSignInThunk(tokenId: string) {
  return async (dispatch: Dispatch) => {
    return UserService.signIn(tokenId, dispatch)
  }
}

export function addUserThunk(user: AddUser) {
  return async (dispatch: Dispatch) => {
    return UserService.create(user, dispatch)
  }
}

