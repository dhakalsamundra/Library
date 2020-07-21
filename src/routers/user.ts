import express from 'express'
import passport from 'passport'

import {
  signUp,
  updateUser,
  deleteUser,
  findUserById,
  findAllUser,
  signIn
  // authenticateUser,
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUser)
router.get('/:userId', findUserById)
router.post('/', signUp)
router.post('/signIn', signIn)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
