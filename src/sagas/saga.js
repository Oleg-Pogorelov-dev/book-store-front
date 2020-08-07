import { takeEvery } from "redux-saga/effects";

import fetchAuthAsync from "./auth";
import fetchMyProfileAsync from "./profile";
import fetchBooksAsync from "./books";
import fetchSearchBooksAsync from "./search_book";
import fetchBookAsync from "./book";
import fetchAddBookAsync from "./add_book";

// Sagas
export function* watchFetch() {
  yield takeEvery("FETCHED_AUTH", fetchAuthAsync);
  yield takeEvery("FETCHED_MY_PROFILE", fetchMyProfileAsync);
  yield takeEvery("FETCHED_BOOKS", fetchBooksAsync);
  yield takeEvery("FETCHED_SEARCH_BOOKS", fetchSearchBooksAsync);
  yield takeEvery("FETCHED_BOOK", fetchBookAsync);
  yield takeEvery("FETCHED_ADD_BOOK", fetchAddBookAsync);
}
