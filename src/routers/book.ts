import express from 'express'

import {
  createBook,
  updateBook,
  deleteBook,
  findById,
  findAll,
  // getFilteredByQueryInput,
  borrowBook,
  returnBook,
} from '../controllers/book'
// import authJwt from '../middlewares/auth'

const router = express.Router()

router.get('/', findAll)
// router.get('/search/:filterValue', getFilteredByQueryInput)
router.get('/:bookId', findById)
router.put('/:bookId', updateBook)
router.put('/:bookId/borrow', borrowBook)
router.put('/:bookId/return', returnBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router