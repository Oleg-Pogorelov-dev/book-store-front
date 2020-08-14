import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  requestMyProfile,
  requestMyProfileSuccess,
  getRefreshToken,
} from "../actions/actionCreators";

export default function* fetchMyProfileAsync(options) {
  yield put(requestMyProfile());
  try {
    const data = yield call(() => {
      return axios({
        url: "http://localhost:3000/profile",
        method: "GET",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": options.token,
        },
      });
    });
    yield put(requestMyProfileSuccess(data.data));
  } catch (err) {
    console.log(err.response);
    if (err.response.status === 401) {
      yield put(getRefreshToken());
    }
  }
}
