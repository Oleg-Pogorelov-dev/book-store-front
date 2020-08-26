import { call, put } from "redux-saga/effects";
import {
  requestBooksSuccess,
  requestBooks,
  requestBook,
  requestBookSuccess,
  requestSearchBooks,
  requestSearchBooksSuccess,
} from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export function* fetchBooksAsync(options) {
  yield put(requestBooks());
  const data = yield call(() => {
    return axiosInstance("books", {
      params: {
        offset: options.data.offset,
        genre: options.data.genre,
        title: options.data.title,
        order_item: options.data.order_item,
        order_type: options.data.order_type,
      },
    });
  });
  yield put(requestBooksSuccess(data.data));
}

export function* fetchAddBookAsync(data) {
  try {
    yield call(() => {
      return axiosInstance.post("books/add_book", data.data.formData);
    });
    yield fetchBooksAsync({
      data: {
        offset: 0,
        order_item: "id",
        order_type: "DESC",
      },
    });
  } catch (e) {
    data.data.setMessage(e.response.data.message);
  }
}

export function* fetchBookAsync(options) {
  const id = options.data || options;
  yield put(requestBook());
  const data = yield call(() => {
    return axiosInstance("books/book", {
      params: {
        id,
      },
    });
  });
  yield put(requestBookSuccess(data.data));
}

export function* fetchSearchBooksAsync(options) {
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

export function* fetchUpdateBook(options) {
  try {
    yield call(async () => {
      return axiosInstance.put("books/update_book", options.data);
    });
  } catch (err) {
    console.log(err.response);
  }
  yield fetchBookAsync(options.data.id);
}

export function* fetchDeleteBook(options) {
  try {
    yield call(async () => {
      return axiosInstance.delete("books/delete_book", {
        params: {
          id: options.data,
        },
      });
    });
  } catch (err) {
    console.log(err.response);
  }
}
