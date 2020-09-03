import { call, put } from "redux-saga/effects";
import {
  requestBooksSuccess,
  requestBooks,
  requestBook,
  requestBookSuccess,
  requestSearchBooks,
  requestSearchBooksSuccess,
  setMessage,
  requestStatusCode,
} from "../store/actions/actionCreators";
import {
  delete_axios,
  put_axios,
  post_axios,
  get_axios,
} from "../api/axiosInstance";

export function* fetchBooksAsync(options) {
  try {
    yield put(requestBooks());
    const data = yield call(() => get_axios("books", options.data));
    yield put(requestBooksSuccess(data.data));
  } catch (e) {
    if (e.response.status === 404) {
      yield put(requestStatusCode(e.response.status));
    }
    console.log(e.response.data.message);
  }
}

export function* fetchAddBookAsync(options) {
  try {
    const data = yield call(() =>
      post_axios("books/add_book", options.data.formData)
    );
    yield put(setMessage(data.data.message));
    yield fetchBooksAsync({
      data: {
        offset: 0,
        order_item: "id",
        order_type: "DESC",
      },
    });
  } catch (e) {
    options.data.setError(e.response.data.message);
  }
}

export function* fetchBookAsync(options) {
  try {
    const id = options.data || options;
    yield put(requestBook());
    const data = yield call(() => get_axios("books/book", { id }));
    yield put(requestBookSuccess(data.data));
  } catch (e) {
    if (e.response.status === 404) {
      yield put(requestStatusCode(e.response.status));
    }
    console.log(e.response.data.message);
  }
}

export function* fetchSearchBooksAsync(options) {
  yield put(requestSearchBooks());
  const data = yield call(() =>
    get_axios("books/search_book", { search: options.data.search })
  );
  yield put(requestSearchBooksSuccess(data.data));
}

export function* fetchUpdateBook(options) {
  try {
    yield call(() => put_axios("books/update_book", options.data));
  } catch (err) {
    console.log(err.response);
  }
  yield fetchBookAsync(options.data.id);
}

export function* fetchDeleteBook(options) {
  try {
    const data = yield call(() =>
      delete_axios("books/delete_book", { id: options.data })
    );
    yield put(setMessage(data.data.message));
  } catch (err) {
    console.log(err.response);
  }
}
