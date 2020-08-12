import express from 'express'
import passport from 'passport'

import {
  authenticateUser,
  signUp,
  signIn,
  passwordRequestReset,
  UpdatePassword,
  resetPasswordTokenStatus,
  resetPassword,
} from '../controllers/auth'

const router = express.Router()

router.post(
  '/google',
  passport.authenticate('google-id-token', { session: false }),
  authenticateUser
)
router.post('/', signUp)
router.post('/signIn', signIn)
router.post('/updatePassword/:userId', UpdatePassword)
router.post('/resetPasswordRequest', passwordRequestReset)
router.get('/resetPasswordRequest/:token', resetPasswordTokenStatus)
router.post('/resetPasswordRequest/:token', resetPassword)

export default router
