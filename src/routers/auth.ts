import express from 'express'
import passport from 'passport'

import { authenticateUser } from '../controllers/auth'

const router = express.Router()

router.post(
  '/google',
  passport.authenticate('google-id-token', { session: false }),
  authenticateUser
)

export default router
