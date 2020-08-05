import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  requestMyProfile,
  requestMyProfileSuccess,
  requestBooksSuccess,
  requestBooks,
  requestBook,
  requestBookSuccess,
} from "../actions/actionCreators";

function* fetchMyProfileAsync() {
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

function* fetchBooksAsync(options) {
  yield put(requestBooks());
  const data = yield call(() => {
    return axios({
      url: "http://localhost:3000/books",
      method: "GET",
      responseType: "json",
      params: {
        offset: options.data.offset,
        genre: options.data.genre,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Token": localStorage.getItem("token"),
        "Refresh-Token": localStorage.getItem("refresh-token"),
      },
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
        }
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
  yield put(requestBooksSuccess(data));
}

function* fetchBookAsync(id) {
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

function* fetchAuthAsync(data) {
  yield call(() => {
    return axios({
      url: data.data.url,
      method: "POST",
      data: {
        email: data.data.email,
        password: data.data.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh-token", response.data.refresh_token);
      })
      .catch((err) => data.data.setMessage(err.response.data.message));
  });
  yield fetchMyProfileAsync();
  yield fetchBooksAsync();
}

function* fetchAddBookAsync(data) {
  yield call(() => {
    return axios({
      url: "http://localhost:3000/books/add_book",
      method: "POST",
      data: data.data.formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        data.data.setMessage(response.data.message);
      })
      .catch((err) => data.data.setMessage(err.response));
  });
  yield fetchBooksAsync();
}

function fetchRefreshToken() {
  axios({
    url: "http://localhost:3000/refresh_token",
    method: "GET",
    responseType: "json",
    headers: {
      "Refresh-Token": localStorage.getItem("refresh-token"),
    },
  })
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refresh-token", response.data.refresh_token);
      }
      return response.data;
    })
    .catch((err) => console.log(err.response));
}

// Sagas
export function* watchFetch() {
  yield takeEvery("FETCHED_AUTH", fetchAuthAsync);
  yield takeEvery("FETCHED_MY_PROFILE", fetchMyProfileAsync);
  yield takeEvery("FETCHED_BOOKS", fetchBooksAsync);
  yield takeEvery("FETCHED_BOOK", fetchBookAsync);
  yield takeEvery("FETCHED_ADD_BOOK", fetchAddBookAsync);
}
