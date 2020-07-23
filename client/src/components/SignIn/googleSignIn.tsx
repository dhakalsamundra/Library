import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

import { googleSignInThunk } from '../../redux/actions'

export default function GoogleSignIn() {
  const dispatch = useDispatch()
  const history = useHistory()

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenId = (response as GoogleLoginResponse).tokenObj.id_token
    if (tokenId) {
      try {
        dispatch(googleSignInThunk(tokenId))
        history.push('/home')
      } catch (error) {
        console.log('error in login')
      }
    }
  }
  return (
    <div>
      <GoogleLogin
        clientId="803700323785-2sld48q8at5i7v2rhj4s57d9gc294j42.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  )
}
