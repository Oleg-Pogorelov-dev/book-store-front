import { combineReducers } from 'redux'
import { reducerMyProfile } from './users'
import { reducerBooks } from './books'

export const rootReducer = combineReducers({
  user: reducerMyProfile,
  books: reducerBooks,
})
