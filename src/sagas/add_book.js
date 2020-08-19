import { call } from "redux-saga/effects";
import fetchBooksAsync from "./books";
import axiosInstance from "../api/axiosInstance";

export default function* fetchAddBookAsync(data) {
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
}
