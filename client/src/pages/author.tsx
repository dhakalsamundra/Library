import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAuthorsThunk } from '../redux/actions/author'
import AuthorData from '../components/Author'

export default function Author() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])
  return (
    <>
      <AuthorData />
    </>
  )
}
