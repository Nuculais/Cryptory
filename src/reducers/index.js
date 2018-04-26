import {combineReducers} from 'redux'
import profile, {PROFILE_DEFAULT_STATE} from './profile'

const crytptoryApp = combineReducers({
  profile
})

export const DEFAULT_STATE = {
  profile: PROFILE_DEFAULT_STATE
}

export default crytptoryApp
