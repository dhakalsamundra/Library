import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

import { Book } from '../../types'
import { editBookThunk } from '../../redux/actions/book'

export type UpdateBookProps = {
  book: Book
}

export default function UpdateBook({ book }: UpdateBookProps) {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(book.title)
  const [newISBN] = useState(book.ISBN)
  const [newPublishedDate, setNewPublishedDate] = useState(book.publishedDate)
  const [newStatus, setNewStatus] = useState(book.status)
  const [newGenres, setNewGenres] = useState(book.genres)
  const [newPublisher, setNewPublisher] = useState(book.publisher)
  const [newAuthor, setNewAuthor] = useState(book.author)

  const dispatch = useDispatch()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
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

  const editBook = async (e: React.FormEvent) => {
    e.preventDefault()

    if (book) {
      const updateBook: Book = {
        _id: book._id,
        title: newTitle,
        ISBN: newISBN,
        author: newAuthor,
        status: newStatus,
        publishedDate: newPublishedDate,
        publisher: newPublisher,
        genres: newGenres,
      }
      console.log('this is the updated book', updateBook)
      dispatch(editBookThunk(updateBook))
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
          <DialogContentText>Add new book to the library</DialogContentText>
          <form onSubmit={editBook}>
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
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
