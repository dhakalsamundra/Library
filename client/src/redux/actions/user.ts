import { Dispatch } from 'redux'

import UserService from '../../services/googleSignIn'
import { UserActions, User, GOOGLE_SIGNIN, REGISTER_USER, SIGNOUT, AddUser, SignIn, SIGNIN} from '../../types'

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
export function signInThunk (user: SignIn) {
  return async (dispatch: Dispatch) => {
    return UserService.signInUser(user, dispatch)
  }
}

