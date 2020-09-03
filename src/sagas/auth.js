import { call, put } from "redux-saga/effects";
import { fetchBooksAsync } from "./books";
import axiosInstance, { put_axios, post_axios } from "../api/axiosInstance";
import {
  requestMyProfile,
  requestMyProfileSuccess,
  requestMyProfileError,
  requestToken,
  setAccessToken,
} from "../store/actions/actionCreators";

export function* fetchAuthAsync(data) {
  const { url, email, password, setMessage } = data.data;
  try {
    const tokens = yield call(() => post_axios(url, { email, password }));
    yield put(setAccessToken(tokens.data.token));
    localStorage.setItem("refresh-token", tokens.data.refresh_token);
    localStorage.setItem("token", tokens.data.token);
    yield put(requestToken());
    yield call(() => fetchMyProfileAsync(), fetchBooksAsync());
  } catch (e) {
    setMessage(e.response.data.message);
  }
}

export function* fetchMyProfileAsync() {
  yield put(requestMyProfile());
  try {
    const data = yield call(() => {
      return axiosInstance("profile");
    });
    yield put(requestMyProfileSuccess(data.data));
  } catch (e) {
    yield put(requestMyProfileError(e.response.data));
  }
}

export function* fetchUpdateAvatar(options) {
  try {
    yield call(put_axios("update_avatar", options.data));
  } catch (err) {
    console.log(err.response);
  }
  yield fetchMyProfileAsync();
}

export function* fetchUpdateInfo(options) {
  try {
    yield call(put_axios("update_info", options.data));
  } catch (err) {
    console.log(err.response);
  }
  yield fetchMyProfileAsync();
}
