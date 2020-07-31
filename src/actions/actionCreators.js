import { 
  FETCHED_MY_PROFILE, 
  REQUESTED_MY_PROFILE, 
  REQUESTED_MY_PROFILE_SUCCEEDED, 
  FETCHED_BOOKS, 
  REQUESTED_BOOKS, 
  REQUESTED_BOOKS_SUCCEEDED,
  FETCHED_AUTH,
  FETCHED_ADD_BOOK
} from "./actions"

export const postAuth = (data) => {
  return { type: FETCHED_AUTH, data }
}

export const getMyProfile = () => {
  return { type: FETCHED_MY_PROFILE }
}

export const requestMyProfile = () => {
  return { type: REQUESTED_MY_PROFILE }
}

export const requestMyProfileSuccess = (data) => {
  return { type: REQUESTED_MY_PROFILE_SUCCEEDED, data }
}

export const getBooks = () => {
  return { type: FETCHED_BOOKS }
}

export const requestBooks = () => {
  return { type: REQUESTED_BOOKS }
}

export const requestBooksSuccess = (data) => {
  return { type: REQUESTED_BOOKS_SUCCEEDED, data }
}

export const addBook = (data) => {
  return { type: FETCHED_ADD_BOOK, data }
}