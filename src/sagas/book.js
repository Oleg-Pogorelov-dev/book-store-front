import { call, put } from "redux-saga/effects";
import axios from "axios";
import { requestBook, requestBookSuccess } from "../actions/actionCreators";

export default function* fetchBookAsync(id) {
  yield put(requestBook());
  const data = yield call(() => {
    return axios({
      url: "http://localhost:3000/books/book",
      method: "GET",
      responseType: "json",
      params: {
        id: id.data,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Token": localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refresh-token"),
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return console.log(err);
      });
  });
  yield put(requestBookSuccess(data));
}
