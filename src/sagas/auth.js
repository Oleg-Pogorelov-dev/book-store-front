import { call } from "redux-saga/effects";
import axios from "axios";
import fetchMyProfileAsync from "./profile";
import fetchBooksAsync from "./books";

export default function* fetchAuthAsync(data) {
  yield call(() => {
    return axios({
      url: data.data.url,
      method: "POST",
      data: {
        email: data.data.email,
        password: data.data.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh-token", response.data.refresh_token);
      })
      .catch((err) => data.data.setMessage(err.response.data.message));
  });
  yield fetchMyProfileAsync();
  yield fetchBooksAsync();
}
