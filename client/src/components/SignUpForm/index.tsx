import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AddUser } from '../../types'
import {addUserThunk} from '../../redux/actions'
import './style.scss'


export default function Register() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async(e: React.FormEvent) => {
  e.preventDefault()
  if (password !== confirmPassword){
    console.log('password is not matching')
  } else {
    const newUser: AddUser = {
      firstName, lastName, email, userName, password, confirmPassword
      }
      dispatch(addUserThunk(newUser))
      history.push('/')
  }
  }
return (
      <div className="register">
        <form method= "POST" onSubmit={handleSubmit}>
          <div className="register-firstname">
          <label htmlFor="firstName">First Name:</label>
          <input className="firstName" type="text" value={firstName} onChange={handleChangeFirstName} /></div>
          <br></br>

          <div className="register-lastname">
          <label htmlFor="lastName">Last Name:</label>
          <input className="lastName" type="text" value={lastName} onChange={handleChangeLastName} /></div>
          <br></br>

          <div className="register-email">
          <label htmlFor="email">Email:</label>
          <input className="email" type="text" value={email} onChange={handleChangeEmail} /></div>
          <br></br>

          <div className="register-username">
          <label htmlFor="userName">UserName:</label>
          <input className="userName" type="text" value={userName} onChange={handleChangeUserName} /></div>
          <br></br>

          <div className="password">
          <label htmlFor="Password">Password:</label>
          <input className="password" type="text" value={password} onChange={handleChangePassword} /></div>
          <br></br>

          <div className="password">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input className="cPassword" type="text" value={confirmPassword} onChange={handleChangeConfirmPassword} /></div>
          <br></br>
          <button value="submit">Register</button>
        </form>
      </div>

    )
}
