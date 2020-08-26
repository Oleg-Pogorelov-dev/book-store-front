import { call, put } from "redux-saga/effects";
import { requestMyProfileError } from "../actions/actionCreators";
import axiosInstance from "../api/axiosInstance";

export default function* fetchRefreshToken() {
  try {
    const data = yield call(() => {
      console.log("TOKEN", localStorage.getItem("refresh-token"));
      return axiosInstance.post("refresh_token", {
        refresh_token: localStorage.getItem("refresh-token"),
      });
    });

    if (data.status === 201) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refresh-token", data.data.refresh_token);
    }
  } catch (e) {
    yield put(requestMyProfileError(e.response.data));
  }
}
