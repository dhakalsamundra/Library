import express from 'express'

import {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  findAllAuthor,
  findAuthorById,
} from '../controllers/author'

const router = express.Router()

router.get('/', findAllAuthor)
router.get('/:authorId', findAuthorById)
router.delete('/:authorId', deleteAuthor)
router.post('/', createAuthor)
router.put('/:authorId', updateAuthor)

export default router
