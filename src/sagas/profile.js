import { call, put } from "redux-saga/effects";
import axios from "axios";
import {
  requestMyProfile,
  requestMyProfileSuccess,
} from "../actions/actionCreators";
import fetchRefreshToken from "./refresh_token";

export default function* fetchMyProfileAsync() {
  yield put(requestMyProfile());
  const data = yield call(() => {
    return axios({
      url: "http://localhost:3000/profile",
      method: "GET",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          return fetchRefreshToken();
        }
        return console.log(err);
      });
  });
  yield put(requestMyProfileSuccess(data));
}
