import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../types'
import { addAuthorThunk } from '../../redux/actions/author'

export default function UpdateAuthor() {
  const [open, setOpen] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newDateOfBirth, setNewDateOfBirth] = useState('')
  const [newBook, setNewBook] = useState('')

  const authors = useSelector((state: AppState) => state.author.items)
  const dispatch = useDispatch()

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value)
  }
  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDateOfBirth(e.target.value)
  }
  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // add new author or update the author.
  const addAuthor = async (e: React.FormEvent) => {
    e.preventDefault()
    const newAuthor = {
      firstName: newFirstName,
      lastName: newLastName,
      dateOfBirth: newDateOfBirth,
      book: newBook,
    }

    if (typeof authors !== 'undefined') {
      dispatch(addAuthorThunk(newAuthor))
      setNewFirstName('')
      setNewLastName('')
      setNewBook('')
      setNewDateOfBirth('')
    }
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
        <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new Author to the library if it exists based on title, its
            details will be updated
          </DialogContentText>
          <form onSubmit={addAuthor}>
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
              label="Date Of Birth"
              style={{ margin: 8 }}
              value={newDateOfBirth}
              onChange={handleDateOfBirthChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Book"
              style={{ margin: 8 }}
              value={newBook}
              onChange={handleBookChange}
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
                Add/Update Author
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
