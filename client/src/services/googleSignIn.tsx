import axios from 'axios'
import { Dispatch } from 'redux'
import { userSignIn, createUser, signedUser, PasswordResetLink, resetNewPasswod } from '../redux/actions/'
import { AddUser, SignIn, newPassword } from '../types'

const baseUrl = 'http://localhost:3001/api/v1/auth'

async function GoogleSignIn(tokenId: string, dispatch: Dispatch) {
  try {
    const url = baseUrl + '/google'
    const response = await axios.post(url, {
      id_token: tokenId,
    })
    localStorage.setItem('signIn-token', response.data.token)
    dispatch(userSignIn(response.data.token))
  } catch (error) {
    console.log(error)
  }
}

async function create (user: AddUser, dispatch : Dispatch) {
  try{
    const response = await axios({ method: 'POST', url: baseUrl, data: user })
    dispatch(createUser(response.data))
  } catch (error) {
    console.log(error)
  }
}

async function signInUser (user: SignIn, dispatch: Dispatch) {
  try {
    const response = await axios({ method: 'POST', url: baseUrl + '/signIn', data: user})
    dispatch(signedUser(response.data))
  } catch (error) {
    console.log(error)
  }
}

async function forgetPassword (email: string, dispatch: Dispatch) {
  try {
    console.log('this is forget password', email)
    const response = await axios({ method: 'POST', url: baseUrl + '/resetPasswordRequest', data: {email}})
    dispatch(PasswordResetLink(response.data))
  } catch (error) {
    console.log('error')
  }
}
async function resetPassword (password: newPassword, dispatch: Dispatch) {
  try{
    const response = await axios({method: 'POST', url: baseUrl, data: password})
    dispatch(resetNewPasswod(response.data))
  } catch(error){
    console.log(error)
  }
}

export default { GoogleSignIn, create, signInUser, forgetPassword, resetPassword}
