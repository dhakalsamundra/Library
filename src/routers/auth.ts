import express from 'express'
import passport from 'passport'

import { authenticateUser, signUp, signIn } from '../controllers/auth'

const router = express.Router()

router.post(
  '/google',
  passport.authenticate('google-id-token', { session: false }),
  authenticateUser
)
router.post('/', signUp)
router.post('/signIn', signIn)

export default router
