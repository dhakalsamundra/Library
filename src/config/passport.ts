import GoogleTokenStrategy from 'passport-google-id-token'
import { GOOGLE_CLIENT_ID } from '../util/secrets'
import AuthService from '../services/auth'
import passport from 'passport'

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async function (parsedToken: any, googleId: string, done: any) {
      if (
        parsedToken?.payload.email &&
        parsedToken?.payload.email_verified === true
      ) {
        const userPayload = {
          googleId: googleId,
          email: parsedToken?.payload.email,
          firstName: parsedToken?.payload.given_name,
          lastName: parsedToken?.payload.family_name,
          picture: parsedToken?.payload.picture,
        }

        try {
          const user = await AuthService.findOrCreate(userPayload)
          done(null, user)
        } catch (error) {
          console.log(error.message)
          done(error, false)
        }
      } else {
        done(null, false)
      }
    }
  )
)