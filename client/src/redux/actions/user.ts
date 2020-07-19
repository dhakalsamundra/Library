import axios from 'axios'
import { Dispatch } from 'redux'

import UserService from '../../services/signIn'
import { UserActions, User, GOOGLE_SIGNIN, SIGNOUT } from '../../types'

export const userSignIn = (user: User): UserActions => {
  return {
    type: GOOGLE_SIGNIN,
    payload: {
      user,
    },
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

