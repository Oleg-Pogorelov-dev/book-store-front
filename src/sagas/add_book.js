import { call } from "redux-saga/effects";
import axios from "axios";
import fetchBooksAsync from "./books";

export default function* fetchAddBookAsync(data) {
  yield call(() => {
    return axios({
      url: "http://localhost:3000/books/add_book",
      method: "POST",
      data: data.data.formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        data.data.setMessage(response.data.message);
      })
      .catch((err) => data.data.setMessage(err.response));
  });
  yield fetchBooksAsync();
}
