import express from 'express'

import {
  createBook,
  updateBook,
  deleteBook,
  findById,
  findAll,
  getFilteredByQueryInput,
  borrowBook,
  returnBook,
} from '../controllers/book'
import authJwt from '../middlewares/auth'
// import authJwt from '../middlewares/auth'

const router = express.Router()

router.get('/', /*authJwt*/ findAll)
router.get('/search', getFilteredByQueryInput)
router.get('/:bookId', findById)
router.put('/:bookId', authJwt, updateBook)
router.put('/:bookId/borrow', borrowBook)
router.put('/:bookId/return', returnBook)
router.delete('/:bookId', authJwt, deleteBook)
router.post('/', createBook)

export default router
