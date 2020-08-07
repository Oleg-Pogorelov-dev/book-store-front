import { call, put } from "redux-saga/effects";
import axios from "axios";
import { requestBooksSuccess, requestBooks } from "../actions/actionCreators";
import fetchRefreshToken from "./refresh_token";

export default function* fetchBooksAsync(options) {
  yield put(requestBooks());
  const data = yield call(() => {
    return axios({
      url: "http://localhost:3000/books",
      method: "GET",
      responseType: "json",
      params: {
        offset: options.data.offset,
        genre: options.data.genre,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Token": localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refresh-token"),
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
  yield put(requestBooksSuccess(data));
}
