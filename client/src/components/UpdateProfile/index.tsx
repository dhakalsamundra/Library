import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

import { useDispatch } from 'react-redux'
import { editUserThunk } from '../../redux/actions/user'

export default function UpdateUser() {

  const [open, setOpen] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newUserName, setNewUserName] = useState('')

  const dispatch = useDispatch()

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value)
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  //  update the author.
  const editUser = async (e: React.FormEvent) => {
    e.preventDefault()
     const updateUser = {
       firstName: newFirstName,
       lastName: newLastName,
       email: newEmail,
       userName: newUserName
     }
        dispatch(editUserThunk(updateUser))
        setNewUserName('')
        setNewFirstName('')
        setNewLastName('')
        setNewEmail('')
    
  }
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit details</DialogContentText>
          <form onSubmit={editUser}>
            <TextField
              id="outlined-full-width"
              label="First Name"
              style={{ margin: 8 }}
              value={newFirstName}
              onChange={handleFirstNameChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Last Name"
              style={{ margin: 8 }}
              value={newLastName}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Email"
              style={{ margin: 8 }}
              value={newEmail}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="UserName"
              style={{ margin: 8 }}
              value={newUserName}
              onChange={handleUserNameChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleClose}
                type="submit"
                color="primary"
                variant="contained"
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
