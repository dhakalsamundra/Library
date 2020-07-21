import React, { useState, FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './style.css'
// import { signIn } from '../../redux/actionCreators/authenticationActionCreator'
import GoogleSignIn from './googleSignIn'
import SignUp from '../SignUpForm'
import logo from '../../img/logo.png'
import { AppState } from '../../types'
import { Button } from '@material-ui/core'

const SignIn: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  //regular sign in
  const initialState = {
    password: '',
    email: '',
  }
  const [user, setUser] = useState(initialState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSignInClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // dispatch(signIn(user.email, user.password, history))
    // setUser(initialState)
  }

  return (
    <div className="container">
      <img style={{ textAlign: 'center' }} src={logo} className="logo" />
      <div>
      <form className="form">
        {/* <Link style={{ color: 'black' }} className="home" to="/">
          <span>Go back to home</span>
        </Link> */}
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
        <Link
          style={{ color: 'white' }}
          className="forgot"
          to="/forgot-password"
        >
          <span>Forgot Password?</span>
        </Link>
        <div className="alternative">
          <h4>or log in with</h4>
        </div>
        <GoogleSignIn />
        </div>
    </div>
  )
}
export default SignIn
