import { call, put } from "redux-saga/effects";
import { post_axios, get_axios } from "../api/axiosInstance";
import {
  requestSearchAuthors,
  requestSearchAuthorsSuccess,
  requestAuthor,
  requestAuthorSuccess,
  setMessage,
  requestStatusCode,
} from "../store/actions/actionCreators";

export function* fetchAddAuthorAsync(options) {
  try {
    const data = yield call(() =>
      post_axios("authors/add_author", options.data.formData)
    );
    yield put(setMessage(data.data.message));
  } catch (e) {
    options.data.setMessage(e.response.data.message);
  }
}

export function* fetchSearchAuthorsAsync(options) {
  yield put(requestSearchAuthors());
  const data = yield call(() =>
    get_axios("authors/search_authors", { search: options.data.search })
  );
  yield put(requestSearchAuthorsSuccess(data.data));
}

export function* fetchAuthorAsync(options) {
  try {
    yield put(requestAuthor());
    const data = yield call(() =>
      get_axios("authors/author", { id: options.data })
    );
    yield put(requestAuthorSuccess(data.data));
  } catch (e) {
    if (e.response.status === 404) {
      yield put(requestStatusCode(e.response.status));
    }
    console.log(e.response.data.message);
  }
}
