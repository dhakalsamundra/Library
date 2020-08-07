import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AddUser } from '../../types'
import {addUserThunk, addNewPasswordThunk} from '../../redux/actions'
// import './style.scss'


export default function NewPassword() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')

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
    const newPassword = {
     password, confirmPassword
      }
    dispatch(addNewPasswordThunk(newPassword))
  }
  }
return (
      <div className="register">
        <form method= "POST" onSubmit={handleSubmit}>
          <div className="password">
          <label>Password:</label>
          <input className="cPassword" type="password" value={password} onChange={handleChangePassword} /></div>
          <br></br>

          <div className="password">
          <label>Confirm Password:</label>
          <input className="cPassword" type="password" value={confirmPassword} onChange={handleChangeConfirmPassword} /></div>
          <br></br>
          <button value="submit">Submit</button>
        </form>
      </div>

    )
}
