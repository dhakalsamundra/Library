import express from 'express'
import passport from 'passport'

import {
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findAllUser,
  // authenticateUser,
} from '../controllers/user'

const router = express.Router()

// router.post(
//   '/google-signin',
//   passport.authenticate('google-id-token', { session: false }),
//   authenticateUser
// )

router.get('/', findAllUser)
router.get('/:userId', findUserById)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
