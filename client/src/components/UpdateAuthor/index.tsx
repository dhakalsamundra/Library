import React, { useState } from 'react'
import {useSnackbar} from 'notistack'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

import { useDispatch } from 'react-redux'
import { Author } from '../../types'
import { editAuthorThunk } from '../../redux/actions/author'

export type UpdateAuthorProp = {
  author: Author
}

export default function AddAuthor({ author }: UpdateAuthorProp) {

  const [open, setOpen] = useState(false)
  const { enqueueSnackbar} = useSnackbar()
  const [newFirstName, setNewFirstName] = useState(author.firstName)
  const [newLastName, setNewLastName] = useState(author.lastName)
  const [newDateOfBirth] = useState(author.dateOfBirth)
  const [newBook, setNewBook] = useState(author.book)

  const dispatch = useDispatch()

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value)
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
  //  update the author.
  const editAuthor = async (e: React.FormEvent) => {
    e.preventDefault()

    if (author) {
      const updatedAuthor: Author = {
        _id: author._id,
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: newDateOfBirth,
        book: newBook,
      }
      enqueueSnackbar('Update Successful', { variant: 'success'})
      dispatch(editAuthorThunk(updatedAuthor))
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
        <DialogTitle id="form-dialog-title">Edit book</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Author</DialogContentText>
          <form onSubmit={editAuthor}>
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
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
