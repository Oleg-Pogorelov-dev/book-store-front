import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  requestSearchBooks,
  requestSearchBooksSuccess,
} from "../actions/actionCreators";
import fetchRefreshToken from "./refresh_token";

export default function* fetchSearchBooksAsync(options) {
  yield put(requestSearchBooks());
  const data = yield call(() => {
    return axios({
      url: "http://localhost:3000/books/search_book",
      method: "GET",
      responseType: "json",
      params: {
        search: options.data.search,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          return fetchRefreshToken();
        }
        return console.log(err);
      });
  });
  yield put(requestSearchBooksSuccess(data));
}
