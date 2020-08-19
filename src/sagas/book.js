import { call, put } from "redux-saga/effects";
import { requestBook, requestBookSuccess } from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export default function* fetchBookAsync(id) {
  yield put(requestBook());
  const data = yield call(() => {
    return axiosInstance("books/book", {
      params: {
        id: id.data,
      },
    });
  });
  yield put(requestBookSuccess(data.data));
}
