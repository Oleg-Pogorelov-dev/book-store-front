import { call } from "redux-saga/effects";
import axios from "axios";

export default function* fetchCreateOrderAsync(data) {
  yield call(() => {
    return axios({
      url: "http://localhost:3000/orders/create_order",
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
