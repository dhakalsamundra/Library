import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

function create(payload: Partial<UserDocument>): Promise<UserDocument> {
  const newUser = new User(payload)
  return newUser.save()
}

async function findUserByEmail(email?: string): Promise<UserDocument> {
  return await User.findOne({ email })
    .exec()
    .then((user: any) => {
      if (!user) {
        throw new NotFoundError()
      }
      return user
    })
}

async function findOrCreate(payload: Partial<UserDocument>) {
  try {
    return await findUserByEmail(payload?.email)
  } catch (error) {
    try {
      const user = await create(payload)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default { findOrCreate, findUserByEmail, create }
