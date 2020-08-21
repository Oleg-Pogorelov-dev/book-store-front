import { call, put } from "redux-saga/effects";
import axiosInstance from "../api/axiosInstance";
import {
  requestSearchAuthors,
  requestSearchAuthorsSuccess,
  requestAuthor,
  requestAuthorSuccess,
} from "../actions/actionCreators";

export function* fetchAddAuthorAsync(data) {
  yield call(() => {
    return axiosInstance.post("authors/add_author", data.data.formData);
  });
}

export function* fetchSearchAuthorsAsync(options) {
  yield put(requestSearchAuthors());
  const data = yield call(() => {
    return axiosInstance("authors/search_authors", {
      params: {
        search: options.data.search,
      },
    });
  });
  yield put(requestSearchAuthorsSuccess(data.data));
}

export function* fetchAuthorAsync(options) {
  yield put(requestAuthor());
  const data = yield call(() => {
    return axiosInstance("authors/author", {
      params: {
        id: options.data,
      },
    });
  });
  yield put(requestAuthorSuccess(data.data));
}
