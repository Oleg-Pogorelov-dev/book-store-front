import { call } from "redux-saga/effects";
import axiosInstance from "../api/axiosInstance";

export default function* fetchAddAuthorAsync(data) {
  yield call(() => {
    return axiosInstance.post("authors/add_author", data.data.formData);
  });
}
