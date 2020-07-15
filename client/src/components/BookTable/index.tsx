import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { deleteBookThunk } from '../../redux/actions'
import { AppState } from '../../types'

export default function BookTable() {
  const items = useSelector((state: AppState) => state.book.filteredBook)
  const dispatch = useDispatch()

  const handleDelete = (id: string) => {
    const item = items.find((book) => book._id === id)
    if (item) {
      dispatch(deleteBookThunk(item))
    }
  }
  const handleEdit = (id: string) => {
    const item = items.find((book) => book._id === id)
    if (item) {
      // dispatch(editBookThunk(item))
    }
  }
  return (
    <Table>
      <TableHead className="book">
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>ISBN</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>PublishedDate</TableCell>
          <TableCell>Publisher</TableCell>
          <TableCell>Genres</TableCell>
          <TableCell>Author</TableCell>
        </TableRow>
      </TableHead>
      {items.map((book) => (
        <TableBody key={book._id}>
          <TableRow>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.ISBN}</TableCell>
            <TableCell>{book.status}</TableCell>
            <TableCell>{book.publishedDate}</TableCell>
            <TableCell>{book.publisher}</TableCell>
            <TableCell>{book.genres}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>
              <IconButton
                color="secondary"
                aria-label="delete book"
                onClick={() => handleDelete(book._id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                color="secondary"
                aria-label="edit book"
                onClick={() => handleEdit(book._id)}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  )
}
