import {
  FETCHED_MY_PROFILE,
  REQUESTED_MY_PROFILE,
  REQUESTED_MY_PROFILE_SUCCEEDED,
  FETCHED_BOOKS,
  FETCHED_BOOK,
  REQUESTED_BOOKS,
  REQUESTED_BOOKS_SUCCEEDED,
  REQUESTED_BOOK,
  REQUESTED_BOOK_SUCCEEDED,
  FETCHED_AUTH,
  FETCHED_ADD_BOOK,
} from "./actions";

export const postAuth = (data) => {
  return { type: FETCHED_AUTH, data };
};

export const getMyProfile = () => {
  return { type: FETCHED_MY_PROFILE };
};

export const requestMyProfile = () => {
  return { type: REQUESTED_MY_PROFILE };
};

export const requestMyProfileSuccess = (data) => {
  return { type: REQUESTED_MY_PROFILE_SUCCEEDED, data };
};

export const getBooks = (data) => {
  return { type: FETCHED_BOOKS, data };
};

export const getBook = (data) => {
  return { type: FETCHED_BOOK, data };
};

export const requestBooks = () => {
  return { type: REQUESTED_BOOKS };
};

export const requestBook = () => {
  return { type: REQUESTED_BOOK };
};

export const requestBooksSuccess = (data) => {
  return { type: REQUESTED_BOOKS_SUCCEEDED, data };
};

export const requestBookSuccess = (data) => {
  return { type: REQUESTED_BOOK_SUCCEEDED, data };
};

export const addBook = (data) => {
  return { type: FETCHED_ADD_BOOK, data };
};
