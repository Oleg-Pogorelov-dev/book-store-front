import { call } from "redux-saga/effects";
import { fetchMyProfileAsync } from "./profile";
import fetchBooksAsync from "./books";
import axiosInstance from "../api/axiosInstance";

export default function* fetchAuthAsync(data) {
  try {
    const tokens = yield call(() => {
      return axiosInstance.post(data.data.url, {
        email: data.data.email,
        password: data.data.password,
      });
    });

    localStorage.setItem("token", tokens.data.token);
    localStorage.setItem("refresh-token", tokens.data.refresh_token);
  } catch (e) {
    console.log(e);
  }

  yield fetchMyProfileAsync();
  yield fetchBooksAsync();
}
