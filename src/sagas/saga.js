import { takeEvery } from "redux-saga/effects";

import {
  fetchAuthAsync,
  fetchMyProfileAsync,
  fetchUpdateAvatar,
  fetchUpdateInfo,
} from "./auth";

import {
  fetchBooksAsync,
  fetchAddBookAsync,
  fetchBookAsync,
  fetchSearchBooksAsync,
  fetchUpdateBook,
  fetchDeleteBook,
} from "./books";
import {
  fetchAddAuthorAsync,
  fetchSearchAuthorsAsync,
  fetchAuthorAsync,
} from "./author";
import fetchRefreshToken from "./refresh_token";
import fetchCreateOrderAsync from "./create_order";

export function* watchFetch() {
  yield takeEvery("FETCHED_AUTH", fetchAuthAsync);
  yield takeEvery("FETCHED_MY_PROFILE", fetchMyProfileAsync);
  yield takeEvery("FETCHED_BOOKS", fetchBooksAsync);
  yield takeEvery("FETCHED_SEARCH_BOOKS", fetchSearchBooksAsync);
  yield takeEvery("FETCHED_BOOK", fetchBookAsync);
  yield takeEvery("FETCHED_ADD_BOOK", fetchAddBookAsync);
  yield takeEvery("FETCHED_ADD_AUTHOR", fetchAddAuthorAsync);
  yield takeEvery("REQUESTED_REFRESH_TOKEN", fetchRefreshToken);
  yield takeEvery("FETCHED_CREATE_ORDER", fetchCreateOrderAsync);
  yield takeEvery("UPDATE_AVATAR", fetchUpdateAvatar);
  yield takeEvery("UPDATE_INFO", fetchUpdateInfo);
  yield takeEvery("FETCHED_SEARCH_AUTHORS", fetchSearchAuthorsAsync);
  yield takeEvery("FETCHED_AUTHOR", fetchAuthorAsync);
  yield takeEvery("UPDATE_BOOK", fetchUpdateBook);
  yield takeEvery("DELETE_BOOK", fetchDeleteBook);
}
