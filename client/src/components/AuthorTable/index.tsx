import React, { useEffect } from 'react'
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

import { deleteAuthorThunk, fetchAuthorsThunk } from '../../redux/actions'
import { AppState } from '../../types'
import AuthorUpdate from '../UpdateAuthor'

export default function AuthorTable() {
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
  return (
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
              <AuthorUpdate key={author._id} author={author} />
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  )
}
