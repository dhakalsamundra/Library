import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AppState, AddBook } from '../../types'
import { addBookThunk } from '../../redux/actions'

export default function BookForm() {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newISBN, setNewISBN] = useState('')
  const [newPublishedDate, setNewPublishedDate] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newGenres, setNewGenres] = useState('')
  const [newPublisher, setNewPublisher] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  // const [errorMessage, setErrorMessage] = useState(null)

  const items = useSelector((state: AppState) => state.book.items)
  const dispatch = useDispatch()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }
  const handleISBNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewISBN(e.target.value)
  }
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatus(e.target.value)
  }
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(e.target.value)
  }
  const handlePublishedDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPublishedDate(e.target.value)
  }
  const handlePublisherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPublisher(e.target.value)
  }
  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGenres(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault()

    const newBook: AddBook = {
      title: newTitle,
      ISBN: newISBN,
      author: newAuthor,
      status: newStatus,
      publishedDate: newPublishedDate,
      publisher: newPublisher,
      genres: newGenres,
    }
    if (typeof items !== 'undefined') {
      dispatch(addBookThunk(newBook))
      setNewTitle('')
      setNewISBN('')
      setNewAuthor('')
      setNewStatus('')
      setNewPublishedDate('')
      setNewPublisher('')
      setNewGenres('')
    }
  }
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        ADD BOOK
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new book</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new book to the library</DialogContentText>
          <form onSubmit={addBook}>
            <TextField
              id="outlined-full-width"
              label="Title"
              style={{ margin: 8 }}
              value={newTitle}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="ISBN"
              style={{ margin: 8 }}
              value={newISBN}
              onChange={handleISBNChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Author"
              style={{ margin: 8 }}
              value={newAuthor}
              onChange={handleAuthorChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Status"
              style={{ margin: 8 }}
              value={newStatus}
              onChange={handleStatusChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="PublishedDate"
              style={{ margin: 8 }}
              value={newPublishedDate}
              onChange={handlePublishedDateChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Publisher"
              style={{ margin: 8 }}
              value={newPublisher}
              onChange={handlePublisherChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="genres"
              style={{ margin: 8 }}
              value={newGenres}
              onChange={handleGenresChange}
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
                Add Book
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
