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

export function googleSignInThunk(response: any) {
  return async (dispatch: Dispatch) => {
    return UserService.signIn(response, dispatch)
  }
}

export function setAuthorizationHeader(token: string) {
  if (token !== localStorage.getItem('signInToken')) {
    const signInToken = `Bearer ${token}`
    localStorage.setItem('signInToken', signInToken)
    axios.defaults.headers.common['Authorization'] = signInToken
  } else {
    axios.defaults.headers.common['Authorization'] = token
  }
}
