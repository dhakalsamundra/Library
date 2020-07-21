import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/User'

export const authenticateUser = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    userName,
    lastName,
    picture,
  } = req.user as UserDocument
  const token = jwt.sign(
    { email, firstName, userName, lastName, picture },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  res.json({ token })
}
