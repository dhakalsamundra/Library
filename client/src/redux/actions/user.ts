import axios from 'axios'
import { Dispatch } from 'redux'

import UserService from '../../services/signIn'
import { UserActions, User, GOOGLE_SIGNIN, SIGNOUT } from '../../types'

export const userSignIn = (user: User): UserActions => {
  console.log('this is the server response of user token samundra', user)
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

export function setAuthorizationHeader(token: string) {
  if (token !== localStorage.getItem('signInToken')) {
    const signInToken = `Bearer ${token}`
    localStorage.setItem('signInToken', signInToken)
    axios.defaults.headers.common['Authorization'] = signInToken
  } else {
    axios.defaults.headers.common['Authorization'] = token
  }
}
