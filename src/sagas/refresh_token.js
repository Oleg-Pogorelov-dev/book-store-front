import axios from "axios";
import { call, put } from "redux-saga/effects";
import { saveToken } from "../actions/actionCreators";

export default function* fetchRefreshToken() {
  try {
    const data = yield call(() => {
      return axios({
        url: "http://localhost:3000/refresh_token",
        method: "GET",
        responseType: "json",
        headers: {
          "Refresh-Token": localStorage.getItem("refresh-token"),
        },
      });
    });

    console.log("DATA", data);

    if (data.status === 201) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refresh-token", data.data.refresh_token);
    }
    yield put(saveToken());
  } catch (err) {
    console.log(err.response);
  }
}
