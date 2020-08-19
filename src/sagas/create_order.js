import { call } from "redux-saga/effects";
import axiosInstance from "../api/axiosInstance";

export default function* fetchCreateOrderAsync(data) {
  yield call(() => {
    return axiosInstance.post("orders/create_order", data.data.formData);
  });
}
