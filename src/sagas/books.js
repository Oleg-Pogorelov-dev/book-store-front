import { call, put } from "redux-saga/effects";
import { requestBooksSuccess, requestBooks } from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export default function* fetchBooksAsync(options) {
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
