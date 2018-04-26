import {
  ADD_COIN,
  ADD_COIN_SUCCESS,
  PROFILE_FAILURE,
  TOGGLE_COIN,
  DELETE_COIN,
  LOADED_PROFILE,
  FETCH_PROFILE
} from '../actions/profile'

export const PROFILE_DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: '',
  items: []
}

export default function profile(state = PROFILE_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_PROFILE:
      return {
        ...state,
        items: action.profile,
        loading: false
      }

    case FETCH_PROFILE: {
      return {
        ...state,
        loading: true
      }
    }

    case ADD_COIN:
      return {
        ...state,
        saving: true
      }

    case ADD_COIN_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.todo),
        saving:
          false
      }

    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        saving: false,
        error: action.error
      }

    case TOGGLE_COIN:
      return {
        ...state,
        items: state.items.map((coin) =>
          coin._id === action.id
            ? {...coin, done: !coin.done}
            : coin
        )
      }

    case DELETE_COIN:
      return {
        ...state,
        items: state.items.reduce((items, todo) =>
          todo._id !== action.id ? items.concat(todo) : items, []
        )
      }

    default:
      return state
  }
}
