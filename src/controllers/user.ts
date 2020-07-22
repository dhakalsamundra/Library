import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../models/User'
import { JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'
import { NotFoundError, BadRequestError, InternalServerError, UnauthorizedError} from '../helpers/apiError'
import { nextTick } from 'process'


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
export const findAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body
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
      password: hash
    })
    const savedUser = await UserService.signUp(user)
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
  const user = await User.findOne(email)
  if(!user){
    throw new BadRequestError('email is not register in the DataBase')
  }
  const result = await bcrypt.compare(password, user.password)
  if(result ) {
    const token = jwt.sign({
      email: user.email,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }, JWT_SECRET, { expiresIn: '1h'})
    res.json(token)
  } 
} catch (error) {
  next(error)
}
}
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}
