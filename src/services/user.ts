// used for authenticate and authorized the user from traditional way login
import bcrypt from 'bcryptjs'

import User, { UserDocument } from '../models/User'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function findById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }
      return user
    })
}

async function findAll(): Promise<UserDocument[]> {
  return User.find().sort({ firstName: 1 }).exec()
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }
      if (update.firstName) {
        user.firstName = update.firstName
      }
      if (update.lastName) {
        user.lastName = update.lastName
      }
      if (update.email) {
        user.email = update.email
      }
      return user.save()
    })
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

export default {
  create,
  findAll,
  deleteUser,
  findById,
  update,
}
