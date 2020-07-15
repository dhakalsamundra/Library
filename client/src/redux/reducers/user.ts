import { GOOGLE_SIGNIN, UserActions, SIGNOUT, UserState } from '../../types'

export default function user(
  state: UserState = { users: [] },
  action: UserActions
): UserState {
  switch (action.type) {
    case GOOGLE_SIGNIN: {
      const { user } = action.payload
      return { ...state, users: [...state.users, user] }
    }
    case SIGNOUT: {
      return state
    }

    default:
      return state
  }
}
