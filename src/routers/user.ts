import express from 'express'

import {
  updateUser,
  deleteUser,
  findUserById,
  findAllUser,
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUser)
router.get('/:userId', findUserById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
