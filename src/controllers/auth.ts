import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sgMail from '@sendgrid/mail'

import { JWT_SECRET, SENDGRID_API_KEY, FROM_MAIL } from '../util/secrets'
import User, { UserDocument } from '../models/User'
import AuthService from '../services/auth'
import UserService from '../services/user'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'

const isEmail = (email: string) => {
  const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (email.match(regEx)) {
    return true
  } else {
    return false
  }
}
const isPassword = (password: string) => {
  const regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (password.match(regEx)) return true
  else return false
}
export const authenticateUser = async (req: Request, res: Response) => {
  const {
    id,
    email,
    firstName,
    lastName,
    picture,
    userName,
    role,
  } = req.user as UserDocument

  const token = jwt.sign(
    { id, email, firstName, userName, lastName, picture, role },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  console.log('token', token)
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
    if (email === 'dhakalsamundra35@gmail.com') {
      role = 'superadmin'
    }
    if (email.includes('@integrify.io')) {
      role = 'admin'
    }
    //Password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if (!isEmail(email)) {
      throw new Error('Must be a valid email address')
    }
    if (!isPassword(password)) {
      throw new Error(
        'Password must have length of 8 character with one uppercase, one lowercase, one digit and one special character '
      )
    }
    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      role,
      password: hash,
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

export const UpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body.data as {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }
    const user = await User.findById(req.params.userId)
    if (user) {
      const comparePassword = await bcrypt.compareSync(
        oldPassword,
        user.password
      )
      if (!comparePassword) {
        throw new BadRequestError('old password is incorrect')
      } else {
        if (!isPassword(newPassword)) {
          throw new Error(
            'Password length must be minimun 8 character lonh with one uppercase an d lowercase as well as one special character.'
          )
        } else {
          const salt = bcrypt.genSaltSync(10)
          const hashed = bcrypt.hashSync(newPassword, salt)
          user.password = hashed
          user.save()
        }
      }
    }
  } catch (error) {
    next(new NotFoundError(error))
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new BadRequestError('email is not register in the DataBase')
    }
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
      throw new BadRequestError('email is not registered')
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          picture: user.picture,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      )
      res.json(token)
    }
  } catch (error) {
    next(error)
  }
}

export const passwordRequestReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res.json({
        message:
          'This email is not associated. Please check your email address.',
      })
    // generate and set the password reset token to the user database
    user.generatePasswordReset()
    await user.save()
    const link = `http://${req.headers.host}/api/v1/auth/resetPasswordRequest/${user.resetPasswordToken}`
    sgMail.setApiKey(SENDGRID_API_KEY)
    //send email
    const mailOptions = {
      to: user.email,
      from: FROM_MAIL,
      subject: 'password change request',
      text: `Hi ${user.firstName}, click on this link to reset the password.
      ${link}`,
    }
    const sendMail = await sgMail.send(mailOptions)
    if (sendMail) {
      res.json({ message: 'Reset link has been sent to your email address.' })
    }
  } catch (error) {
    next(new BadRequestError('Invalid Request', error))
  }
}

export const resetPasswordTokenStatus = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })
    if (!user)
      return res
        .status(401)
        .json({ message: 'Password reset token is invalid or has expired.' })
    res.redirect(
      `http://localhost:3000/updatePassword/${user.resetPasswordToken}`
    )
  } catch (error) {
    res.send('password token is expired. so resend the new reset password.')
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })
    if (!user) {
      throw new NotFoundError('Password reset token is invalid or has expired.')
    } else {
      // set the new password in bcrypt
      const salt = bcrypt.genSaltSync(10)
      const hashed = await bcrypt.hashSync(req.body.password, salt)
      //set the new password in database
      user.password = hashed
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined
    }
    user.save()
    const mailOptions = {
      to: user.email,
      from: FROM_MAIL,
      subject: 'New Password has been added.',
      text: `Hi ${user.userName}, this is a confirmation mail of changing the password.`,
    }
    const sendMail = await sgMail.send(mailOptions)
    if (sendMail) {
      res.json({ message: 'Login with your new password now.' })
    }
  } catch (error) {
    res.json(error)
  }
}
