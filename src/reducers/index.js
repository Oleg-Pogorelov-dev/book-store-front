import { combineReducers } from 'redux'
import { reducerPost, reducerComment, reducerCurrentPost, reducerMyProfile, reducerAddPost } from '../sagas/saga'

export const rootReducer = combineReducers({
  post: reducerPost,
  comment: reducerComment,
  current_post: reducerCurrentPost,
  profile: reducerMyProfile,
  error_post: reducerAddPost,
})
