import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'

import { ForgetPasswordThunk} from '../../redux/actions'
import './reset.scss'

export default function ResetPassword(){
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleEmailSubmit = async (e: React.FormEvent)  => {
    e.preventDefault()
    if(email !== 'undefined') {
        dispatch(ForgetPasswordThunk(email))
    }
}
  return (
    <>
      <div className="password">
        <p>
          Please enter the email address that is associate with  your account, and
          we'll send you a link to reset your password.
        </p>
        <form className="password-form" onSubmit={handleEmailSubmit}>
          <TextField
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{width: '350px'}}
            required
          /><br></br>
          <br></br>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}
