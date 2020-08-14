import { call } from "redux-saga/effects";
import axios from "axios";

export default function* fetchAddAuthorAsync(data) {
  yield call(() => {
    return axios({
      url: "http://localhost:3000/authors/add_author",
      method: "POST",
      data: data.data.formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        data.data.setMessage(response.data.message);
      })
      .catch((err) => data.data.setMessage(err.response));
  });
}
