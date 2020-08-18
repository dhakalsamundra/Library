import axios from 'axios'
import { Dispatch } from 'redux'
import { userSignIn, createUser, signedUser, PasswordResetLink, resetNewPasswod, userUpdate } from '../redux/actions/'
import { AddUser, SignIn, UpdatePassword, User, StorageToken } from '../types'
import jwt_decode from 'jwt-decode'

const baseUrl = 'http://localhost:3001/api/v1/auth'

// const token = localStorage.signInToken
// const decodedToken = jwt_decode<StorageToken>(token)

async function GoogleSignIn(tokenId: string, dispatch: Dispatch) {
  try {
    const url = baseUrl + '/google'
    const response = await axios.post(url, {
      id_token: tokenId,
    })
    // localStorage.setItem('signInToken', response.data)
    dispatch(userSignIn(response.data))

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
    localStorage.setItem('signInToken', response.data)
    dispatch(signedUser(response.data))
  } catch (error) {
    console.log(error)
  }
}

const  updateUser = async (user: User, dispatch: Dispatch) => {
    try{
    const response = await axios({
      method: 'PUT',
      // url: `http://localhost:3001/api/v1/users/${decodedToken.id}`,
      url: 'http://localhost:3001/api/v1/users',

      data: user,
    })
    dispatch(userUpdate(response.data))
  } catch (error) {
    console.log('this is the error', error)
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

async function resetPassword (password: string,token: string, dispatch: Dispatch) {
  try{
    const response = await axios({method: 'POST', url: baseUrl + `/resetPasswordRequest/${token}`, data: {password}})
    dispatch(resetNewPasswod(response.data))
  } catch(error){
    console.log(error)
  }
}

async function passwordUpdate (password: UpdatePassword, dispatch: Dispatch) {
  try{
    console.log('i am bored')
    const response = await axios({
      method: 'POST',
      // url: `http://localhost:3001/api/v1/auth/updatePassword/${decodedToken.id}`, 
      url: 'http://localhost:3001/api/v1/auth/updatePassword', 

      data: password
    })
    dispatch(resetNewPasswod(response.data))
    console.log('update password', response.data)
  } catch(error){
    console.log(error)
  }
}


export default { GoogleSignIn, create, signInUser, forgetPassword, resetPassword, passwordUpdate, updateUser}
