import { call, put } from "redux-saga/effects";
import {
  requestMyProfileError,
  setAccessToken,
} from "../store/actions/actionCreators";
import { refreshToken, setRefreshToken } from "../api/axiosInstance";
import { fetchMyProfileAsync } from "./auth";

export default function* fetchRefreshToken() {
  try {
    const data = yield call(refreshToken);

    if (data.status === 201) {
      yield put(setAccessToken(data.data.token));
      setRefreshToken(data.data.refresh_token);
      localStorage.setItem("refresh-token", data.data.refresh_token);
      localStorage.setItem("token", data.data.token);
      yield call(fetchMyProfileAsync);
    }
  } catch (e) {
    console.log(e.response);
    yield put(requestMyProfileError(e.response.data));
  }
}
