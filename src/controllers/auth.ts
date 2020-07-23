import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { JWT_SECRET } from '../util/secrets'
import User, { UserDocument } from '../models/User'
import AuthService from '../services/auth'
import { BadRequestError, InternalServerError } from '../helpers/apiError'


const isEmail = (email: string) => {
  const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if(email.match(regEx)) {
    return true
  } else {
    return false
  }
}

const isPassword = (password: string) => {
  const regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if(password.match(regEx)) return true
  else return false
}
export const authenticateUser = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    picture,
    userName,
    role
  } = req.user as UserDocument
  const token = jwt.sign(
    { email, firstName, userName, lastName, picture, role },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  res.json(token)
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body
    let role
    if(email === 'dhakalsamundra35@gmail.com') {
      role = 'superadmin'
    }
    if(email.includes('@integrify.io')) {
      role = 'admin'
    }
    //Password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if(!isEmail(email)) {
      throw new Error('Must be a valid email address')
    }
    if(!isPassword(password)) {
      throw new Error('Password must have length of 8 character with one uppercase, one lowercase, one digit and one special character ')
    }
    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      role,
      password: hash
    })

    const savedUser = await AuthService.create(user)
    res.json(savedUser)
  } catch (error) {
    if (error.name === 'validationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user){
    throw new BadRequestError('email is not register in the DataBase')
  }
  const result = await bcrypt.compare(password, user.password)
  if(!result ) {
    throw new BadRequestError('email is not registered')
  } else {
    const token = jwt.sign({
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }, JWT_SECRET, { expiresIn: '1h'})
    res.json(token)
  } 
} catch (error) {
  next(error)
}
}
