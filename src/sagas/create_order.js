import { call, put } from "redux-saga/effects";
import { post_axios } from "../api/axiosInstance";
import { setMessage } from "../store/actions/actionCreators";

export default function* fetchCreateOrderAsync(options) {
  try {
    const data = yield call(() =>
      post_axios("orders/create_order", options.data.formData)
    );
    yield put(setMessage(data.data.message));
  } catch (e) {
    console.log(e);
  }
}
