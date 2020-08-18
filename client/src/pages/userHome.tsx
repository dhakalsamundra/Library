import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchBooksThunk } from '../redux/actions/book'
import NavBar from '../components/NavBar'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [dispatch])
  return (
    <>
      <NavBar />
    </>
  )
}
