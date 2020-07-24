import { GOOGLE_SIGNIN, UserActions, SIGNOUT, UserState, REGISTER_USER, SIGNIN } from '../../types'

export default function user(
  state: UserState = { users: [], isAuthorized: false
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case GOOGLE_SIGNIN: {
      const { user } = action.payload
      return { ...state, users: [...state.users, user], isAuthorized: true }
    }
    case SIGNOUT: {
      return { ...state, isAuthorized: false}
    }
    case REGISTER_USER: {
      const {user} = action.payload
      return { ...state, users: [...state.users, user], isAuthorized: false}
    }
    case SIGNIN: {
      const {user} = action.payload
      return {...state, users: [...state.users, user], isAuthorized: true}
    }

    default:
      return state
  }
}
