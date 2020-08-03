import express from 'express'
import passport from 'passport'

import {
  authenticateUser,
  signUp,
  signIn,
  passwordRequestReset,
  UpdatePassword,
  passwordTokenStatus,
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
router.put('/updatePassword/:userId', UpdatePassword)
router.post('/resetPasswordRequest', passwordRequestReset)
router.get('/reset/:token', passwordTokenStatus)
router.post('/reset/:token', resetPassword)

export default router
