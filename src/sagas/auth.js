import { call, put } from "redux-saga/effects";
import { fetchBooksAsync } from "./books";
import axiosInstance from "../api/axiosInstance";
import {
  requestMyProfile,
  requestMyProfileSuccess,
} from "../actions/actionCreators";

export function* fetchAuthAsync(data) {
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

  yield call(() => fetchMyProfileAsync(), fetchBooksAsync());
}

export function* fetchMyProfileAsync() {
  yield put(requestMyProfile());
  try {
    const data = yield call(async () => {
      return axiosInstance("profile");
    });
    yield put(requestMyProfileSuccess(data.data));
  } catch (err) {
    console.log(err.response);
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
