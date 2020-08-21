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
  FETCHED_ADD_AUTHOR,
  FETCHED_SEARCH_BOOKS,
  REQUESTED_SEARCH_BOOKS_SUCCEEDED,
  REQUESTED_SEARCH_BOOKS,
  REQUESTED_NOTIFICATION_TRUE,
  REQUESTED_NOTIFICATION_FALSE,
  SAVE_TOKEN,
  REQUESTED_REFRESH_TOKEN,
  FETCHED_CREATE_ORDER,
  UPDATE_AVATAR,
  UPDATE_INFO,
  FETCHED_SEARCH_AUTHORS,
  REQUESTED_SEARCH_AUTHORS_SUCCEEDED,
  REQUESTED_SEARCH_AUTHORS,
  FETCHED_AUTHOR,
  REQUESTED_AUTHOR,
  REQUESTED_AUTHOR_SUCCEEDED,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "./actions";

export const postAuth = (data) => {
  return { type: FETCHED_AUTH, data };
};

export const getMyProfile = (token) => {
  return { type: FETCHED_MY_PROFILE, token };
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

export const getSearchBooks = (data) => {
  return { type: FETCHED_SEARCH_BOOKS, data };
};

export const getBook = (data) => {
  return { type: FETCHED_BOOK, data };
};

export const requestBooks = () => {
  return { type: REQUESTED_BOOKS };
};

export const requestSearchBooks = () => {
  return { type: REQUESTED_SEARCH_BOOKS };
};

export const requestBook = () => {
  return { type: REQUESTED_BOOK };
};

export const requestBooksSuccess = (data) => {
  return { type: REQUESTED_BOOKS_SUCCEEDED, data };
};

export const requestSearchBooksSuccess = (data) => {
  return { type: REQUESTED_SEARCH_BOOKS_SUCCEEDED, data };
};

export const requestBookSuccess = (data) => {
  return { type: REQUESTED_BOOK_SUCCEEDED, data };
};

export const addBook = (data) => {
  return { type: FETCHED_ADD_BOOK, data };
};

export const getSearchAuthors = (data) => {
  return { type: FETCHED_SEARCH_AUTHORS, data };
};

export const requestSearchAuthors = (data) => {
  return { type: REQUESTED_SEARCH_AUTHORS, data };
};

export const requestSearchAuthorsSuccess = (data) => {
  return { type: REQUESTED_SEARCH_AUTHORS_SUCCEEDED, data };
};

export const addAuthor = (data) => {
  return { type: FETCHED_ADD_AUTHOR, data };
};

export const setNotificationTrue = () => {
  return { type: REQUESTED_NOTIFICATION_TRUE };
};

export const setNotificationFalse = () => {
  return { type: REQUESTED_NOTIFICATION_FALSE };
};

export const saveToken = () => {
  return { type: SAVE_TOKEN };
};

export const getRefreshToken = () => {
  return { type: REQUESTED_REFRESH_TOKEN };
};

export const createOrder = (data) => {
  return { type: FETCHED_CREATE_ORDER, data };
};

export const updateAvatar = (data) => {
  return { type: UPDATE_AVATAR, data };
};

export const updateInfo = (data) => {
  return { type: UPDATE_INFO, data };
};

export const getAuthor = (data) => {
  return { type: FETCHED_AUTHOR, data };
};

export const requestAuthor = (data) => {
  return { type: REQUESTED_AUTHOR, data };
};

export const requestAuthorSuccess = (data) => {
  return { type: REQUESTED_AUTHOR_SUCCEEDED, data };
};

export const updateBook = (data) => {
  return { type: UPDATE_BOOK, data };
};

export const deleteBook = (data) => {
  return { type: DELETE_BOOK, data };
};
