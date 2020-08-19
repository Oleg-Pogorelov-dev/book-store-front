import { call, put } from "redux-saga/effects";
import {
  requestSearchBooks,
  requestSearchBooksSuccess,
} from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export default function* fetchSearchBooksAsync(options) {
  yield put(requestSearchBooks());
  const data = yield call(() => {
    return axiosInstance("books/search_book", {
      params: {
        search: options.data.search,
      },
    });
  });
  yield put(requestSearchBooksSuccess(data.data));
}
