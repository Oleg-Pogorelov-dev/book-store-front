import { call, put } from "redux-saga/effects";
import { saveToken } from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export default function* fetchRefreshToken() {
  try {
    const data = yield call(() => {
      return axiosInstance("refresh_token", {
        headers: {
          "Refresh-Token": localStorage.getItem("refresh-token"),
        },
      });
    });

    if (data.status === 201) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refresh-token", data.data.refresh_token);
    }
    yield put(saveToken());
  } catch (err) {
    console.log(err.response);
  }
}
