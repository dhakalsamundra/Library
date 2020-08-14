import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updatePasswordThunk } from '../redux/actions'

export default function PasswordUpdate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword ] = useState('')


    const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
      }
      const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
      }
      const handleChangeConfirmNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(e.target.value)
      }

      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmNewPassword){
          console.log('password is not matching')
        } else {
          const UpdatePassword = {
            oldPassword, newPassword, confirmNewPassword
            }
            dispatch(updatePasswordThunk(UpdatePassword))
            // todo. later change this to user profile.
             history.push('/home')
        }
        }
        return (
    <div className = "update">
        <form method="POST" onSubmit={handleSubmit}>
        <div className="password">
            <label>Old-Password</label>
            <input className="cPassword" type="password" value={oldPassword} onChange={handleChangeOldPassword} /></div>
            <br></br>
          <div className="password">  
          <label>New Password:</label>
          <input className="cPassword" type="password" value={newPassword} onChange={handleChangeNewPassword} /></div>
          <br></br>

          <div className="password">
          <label>Confirm Password:</label>
          <input className="cPassword" type="password" value={confirmNewPassword} onChange={handleChangeConfirmNewPassword} /></div>
          <br></br>
          <button value="submit">submit</button>
        </form>
    </div>
)
}