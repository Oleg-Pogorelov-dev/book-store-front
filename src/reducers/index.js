import { combineReducers } from 'redux'
import { reducerMyProfile } from './users'

export const rootReducer = combineReducers({
  user: reducerMyProfile,
})
