import { call, put } from "redux-saga/effects";
import {
  requestMyProfile,
  requestMyProfileSuccess,
} from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

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
