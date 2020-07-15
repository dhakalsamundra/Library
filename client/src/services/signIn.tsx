import axios from 'axios'
import { Dispatch } from 'redux'
import { userSignIn } from '../redux/actions'

const baseUrl = 'http://localhost:3001/api/v1/auth/google'

async function signIn(response: any, dispatch: Dispatch) {
  const tokenId = (response as any).tokenObj.id_token
  console.log('this exact tokenId', tokenId)
  try {
    const response = await axios({
      method: 'POST',
      url: baseUrl,
      data: tokenId,
    }).then((response) => {
      // setAuthorizationHeader(tokenId)
      // console.log('this is the tokenid for user', tokenId)
      dispatch(userSignIn(response.data))
      console.log('access Token', response.data)
    })
  } catch (error) {
    console.log(error)
  }
}

const setAuthorizationHeader = (token: string) => {
  if (token !== localStorage.getItem('signInToken')) {
    const signInToken = `Bearer ${token}`
    localStorage.setItem('signInToken', signInToken)
    axios.defaults.headers.common['Authorization'] = signInToken
  } else {
    axios.defaults.headers.common['Authorization'] = token
  }
}

export default { signIn }
