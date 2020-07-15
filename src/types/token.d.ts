/// <reference types="express" />

/**
 * This type definition augments existing definition
 * from @types/express-flash
 */
declare namespace Express {
  export interface Request {
    tokenPayload: TokenPayload
    accessToken?: string
  }
}
type TokenPayload = {
  email?: string
  googleId?: string
  username?: string
  iat?: number
  exp?: number
  role?: string
}
