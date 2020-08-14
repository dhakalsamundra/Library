import { GOOGLE_SIGNIN, UserActions, SIGNOUT, UserState, REGISTER_USER, SIGNIN, FORGET_PASSWORD, UPDATE_PASSWORD, UPDATE_USER } from '../../types'

export default function user(
  state: UserState = { users: [], isAuthorized: false, currentUser: null
  },
  action: UserActions
): UserState {

  switch (action.type) {

    case GOOGLE_SIGNIN: {
      const { user } = action.payload
      return { ...state, users: [...state.users, user], isAuthorized: true, currentUser: user }
    }
    case SIGNOUT: {
      return { ...state, isAuthorized: false, currentUser: null}
    }
    case REGISTER_USER: {
      const {user} = action.payload
      return { ...state, users: [...state.users, user]}
    }
    case SIGNIN: {
      const {user} = action.payload
      return {...state, users: [...state.users, user], isAuthorized: true, currentUser: user
      }
    }
    case UPDATE_USER: {
      const {user} = action.payload
      return {
        ...state,
        users: state.users.map((oldUser) => oldUser._id === user._id ? user : oldUser)

      }
    }
    case FORGET_PASSWORD: {
      const {email} = action.payload
      return  {...state}
    }
    // case UPDATE_PASSWORD: {
    //   const {password} = action.payload
    //   return {...state, users: state.users.map((oldPassword) => oldPassword.password === password.password ? password: oldPassword)}
    // }
    default:
      return state
  }
}
