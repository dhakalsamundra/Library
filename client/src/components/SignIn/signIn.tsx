import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './style.css'
import GoogleSignIn from './googleSignIn'
import logo from '../../img/logo.png'
import { AppState } from '../../types'
import {signInThunk} from '../../redux/actions/user'
import { Button } from '@material-ui/core'

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const isAuthorized = useSelector((state: AppState) => state.user.isAuthorized)

  //regular sign in
  const initialState = {
    email: '',
    password: ''
  }
  const [user, setUser] = useState(initialState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  useEffect(() => {
    // if(isAuthorized && role === 'admin' || 'superadmin') {
    if(isAuthorized) {
      history.push('/dashboard')
    }
  },[isAuthorized, history])

  const handleSignInClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(signInThunk(user))
     setUser(initialState)
  }
  const handlePasswordReset = () => {
    history.push('/forgetPassword')
  }

  return (
    <div className="container">
      <img style={{ textAlign: 'center' }} src={logo} className="logo" alt="logIn-logo"/>
      <div>
      <form className="form" onSubmit={handleSignInClick}>

        <div className="form-header">
          <h2>Log In</h2>
          <h4>
            New to this site?{' '}
            <Link style={{ color: 'white' }} to="/register">
              <span className="sign-up-link">Sign Up </span>
            </Link>
          </h4>
        </div>
        <div className="form-input-container">
          <div className="form-input-items">
            <label>
              <h4>Username or Email</h4>
            </label>
            <input
              onChange={handleInputChange}
              value={user.email}
              name="email"
              type="text"
            />
          </div>
          <div className="form-input-items">
            <label>
              <h4>Password</h4>
            </label>
            <input
              onChange={handleInputChange}
              value={user.password}
              name="password"
              type="password"
            />
          </div>
          <button className="signInButton" type="submit">
          Sign In
        </button>
        </div>
        </form>
        <Button onClick={handlePasswordReset} color="secondary">Forget Password</Button>
        <div className="alternative">
          <h4>or log in with</h4>
        </div>
        <GoogleSignIn />
        </div>
    </div>
  )
}
export default SignIn
