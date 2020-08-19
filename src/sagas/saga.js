import { takeEvery } from "redux-saga/effects";

import fetchAuthAsync from "./auth";
import {
  fetchMyProfileAsync,
  fetchUpdateAvatar,
  fetchUpdateInfo,
} from "./profile";
import fetchBooksAsync from "./books";
import fetchSearchBooksAsync from "./search_book";
import fetchBookAsync from "./book";
import fetchAddBookAsync from "./add_book";
import fetchAddAuthorAsync from "./add_author";
import fetchRefreshToken from "./refresh_token";
import fetchCreateOrderAsync from "./create_order";

// Sagas
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
}
