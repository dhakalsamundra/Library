import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Button,
} from '@material-ui/core'

import { borrowBookThunk} from '../../redux/actions'
import { AppState } from '../../types'

export default function BookTable() {
  const items = useSelector((state: AppState) => state.book.items)
  const dispatch = useDispatch()


  const handleBorrowChange = (id: string) => {
    const item = items.find((book) => book._id === id)
    if (item) {
      dispatch(borrowBookThunk(item))
    }
  }
  return (
    <Table>
      <TableHead className="book">
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>ISBN</TableCell>
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
            <TableCell>{book.publishedDate}</TableCell>
            <TableCell>{book.publisher}</TableCell>
            <TableCell>{book.genres}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>
        <Button size="small" variant="contained" color="primary" onClick={() => handleBorrowChange(book._id)}>
          {book.status}
        </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  )
}
