import { call, put } from "redux-saga/effects";
import { fetchBooksAsync } from "./books";
import axiosInstance, { setAccessToken } from "../api/axiosInstance";
import {
  requestMyProfile,
  requestMyProfileSuccess,
  requestMyProfileError,
  requestToken,
} from "../actions/actionCreators";

export function* fetchAuthAsync(data) {
  try {
    const tokens = yield call(() => {
      return axiosInstance.post(data.data.url, {
        email: data.data.email,
        password: data.data.password,
      });
    });

    requestToken(tokens.data.token);
    localStorage.setItem("refresh-token", tokens.data.refresh_token);
    yield put(requestToken());
    yield call(() => fetchMyProfileAsync(), fetchBooksAsync());
  } catch (e) {
    data.data.setMessage(e.response.data.message);
  }
}

export function* fetchMyProfileAsync() {
  yield put(requestToken());
  setAccessToken();
  yield put(requestMyProfile());
  try {
    const data = yield call(async () => {
      return axiosInstance("profile");
    });
    yield put(requestMyProfileSuccess(data.data));
  } catch (e) {
    yield put(requestMyProfileError(e.response.data));
  }
}

export function* fetchUpdateAvatar(options) {
  try {
    yield call(async () => {
      return axiosInstance.put("update_avatar", options.data);
    });
  } catch (err) {
    console.log(err.response);
  }
  yield fetchMyProfileAsync();
}

export function* fetchUpdateInfo(options) {
  try {
    yield call(async () => {
      return axiosInstance.put("update_info", options.data);
    });
  } catch (err) {
    console.log(err.response);
  }
  yield fetchMyProfileAsync();
}
