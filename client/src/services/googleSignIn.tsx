import axios from 'axios'
import { Dispatch } from 'redux'
import { userSignIn, createUser, signedUser } from '../redux/actions/'
import { AddUser, SignIn } from '../types'

const baseUrl = 'http://localhost:3001/api/v1/auth/google'
const baseURL = 'http://localhost:3001/api/v1/users'

async function signIn(tokenId: string, dispatch: Dispatch) {
  try {
    const response = await axios.post(baseUrl, {
      id_token: tokenId,
    })
    // console.log('this is the final idtoken', response)
    // console.log('this is the final idtoken', response.data.token)
    localStorage.setItem('signIn-token', response.data.token)
    dispatch(userSignIn(response.data.token))
  } catch (error) {
    console.log(error)
  }
}

async function create (user: AddUser, dispatch : Dispatch) {
  try{
    const response = await axios({ method: 'POST', url: baseURL, data: user })
    dispatch(createUser(response.data))
  } catch (error) {
    console.log(error)
  }
}

async function signInUser (user: SignIn, dispatch: Dispatch) {
  try {
    const response = await axios({ method: 'POST', url: baseURL, data: user})
    dispatch(signedUser(response.data))
  } catch (error) {
    console.log(error)
  }
}


export default { signIn, create, signInUser}
