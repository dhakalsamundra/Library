import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/User'

export const authenticateUser = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    googleId,
    lastName,
    picture,
  } = req.user as UserDocument
  const token = jwt.sign(
    { email, firstName, googleId, lastName, picture },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  res.json({ token })
}
