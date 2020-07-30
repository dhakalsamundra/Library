import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { unBorrowBookThunk } from '../../redux/actions'
import { AppState } from '../../types'
import './style.scss'
import { Button } from '@material-ui/core'

export default function Cart() {
  const cartItems = useSelector((state: AppState) => state.book.inCart)
  const dispatch = useDispatch()

  const handleUnBorrowChange = (id: string) => {
    const item = cartItems.find((book) => book._id === id)
    if (item) {
        dispatch(unBorrowBookThunk(item))
      } 
     }
  if (cartItems.length === 0)
    return <p style={{ margin: '10px' }}>No Item Added.</p>

  return (
    <div className="cart">
      {cartItems.map((element) => (
        <div className="cart__details">
          <p key={element._id} className="cart__name">
            {element.title}
          </p>
          <Button
            className="cart__button"
            color="secondary"
            onClick={() => handleUnBorrowChange(element._id)}
          >UnBorrow
          </Button>
        </div>
      ))}
    </div>
  )
}
