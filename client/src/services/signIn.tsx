import axios from 'axios'
import { Dispatch } from 'redux'
import { userSignIn } from '../redux/actions'

const baseUrl = 'http://localhost:3001/api/v1/auth/google'

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

export default { signIn }
