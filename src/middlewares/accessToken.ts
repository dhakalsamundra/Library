// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'

// import { UnauthorizedError } from '../helpers/apiError'
// import { JWT_SECRET } from '../util/secrets'
// import UserService from '../services/user'

// // function createToken(payload: {}) {
// //   return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })
// // }

// function verifyToken(token: string | undefined): false | TokenPayload {
//   try {
//     if (typeof token !== 'undefined') {
//       return jwt.verify(token, JWT_SECRET) as TokenPayload
//     }
//     throw null
//   } catch (e) {
//     return false
//   }
// }

// // export function createAccessToken(
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) {
// //   const user = req.user as UserDocument
// //   if (!user) {
// //     next(new UnauthorizedError())
// //   } else {
// //     req.accessToken = createToken({ googleId: user.googleId })
// //     next
// //   }
// // }

// export async function authenticateAccessToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const token = req.header('Authorization')?.replace('Bearer', ' ')
//   const decodedPayload = verifyToken(token)
//   try {
//     if (!decodedPayload) {
//       next(new UnauthorizedError())
//     } else {
//       req.tokenPayload = decodedPayload
//       req.user = await UserService.findByGoogleId(decodedPayload.googleId)
//       next()
//     }
//   } catch (error) {
//     next(new UnauthorizedError())
//   }
// }
