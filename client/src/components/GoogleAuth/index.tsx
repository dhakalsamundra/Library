import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'

import { googleSignInThunk } from '../../redux/actions'

export default function GoogleAuth() {
  const dispatch = useDispatch()
  const history = useHistory()

  const responseGoogle = async (response: any) => {
    console.log('this is the response from google', response)
    try {
      dispatch(googleSignInThunk(response))
      history.push('/home')
    } catch (error) {
      console.log('error in login')
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
