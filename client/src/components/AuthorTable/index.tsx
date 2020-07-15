import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import {
  deleteAuthorThunk,
  fetchAuthorsThunk,
  editAuthorThunk,
} from '../../redux/actions'
import { AppState } from '../../types'

export default function AuthorTable() {
  const [open, setOpen] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newDateOfBirth, setNewDateOfBirth] = useState('')
  const [newBook, setNewBook] = useState('')
  const items = useSelector((state: AppState) => state.author.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])

  const handleDelete = (id: string) => {
    const item = items.find((author) => author._id === id)
    if (item) {
      dispatch(deleteAuthorThunk(item))
    }
  }

  const handleEdit = (id: string) => {
    const item = items.find((author) => author._id === id)
    if (item) {
      const updatedAuthor = {
        ...item,
        firstName: newFirstName,
        lastName: newLastName,
        dateOfBirth: newDateOfBirth,
        book: newBook,
      }
      console.log('dfdsagfsagfsar', item._id)
      dispatch(editAuthorThunk(updatedAuthor))
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        AuthorList
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Table>
            <TableHead className="book">
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>DateOfBirth</TableCell>
                <TableCell>Book</TableCell>
              </TableRow>
            </TableHead>
            {items.map((author) => (
              <TableBody key={author._id}>
                <TableRow>
                  <TableCell>{author.firstName}</TableCell>
                  <TableCell>{author.lastName}</TableCell>
                  <TableCell>{author.dateOfBirth}</TableCell>
                  <TableCell>{author.book}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      aria-label="delete author"
                      onClick={() => handleDelete(author._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      aria-label="edit author"
                      onClick={() => handleEdit(author._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}