import{call, put, takeEvery} from 'redux-saga/effects'
import axios from "axios";
import { 
  requestMyProfile, 
  requestMyProfileSuccess, 
  requestBooksSuccess, 
  requestBooks
} from '../actions/actionCreators';

function* fetchMyProfileAsync() {
  yield put(requestMyProfile())
  const data = yield call(() => {
    return axios({
      url: 'http://localhost:3000/profile',
      method: 'GET',
      responseType: "json",
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
        'Refresh-Token': localStorage.getItem('refresh-token')
      }
    }).then(response => {
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    })
  })
  yield put(requestMyProfileSuccess(data))
}

function* fetchBooksAsync() {
  yield put(requestBooks())
  const data = yield call(() => {
    return axios({
      url: 'http://localhost:3000/books',
      method: 'GET',
      responseType: "json",
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token'),
        'Refresh-Token': localStorage.getItem('refresh-token')
      }
    }).then(response => {
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    })
  })
  yield put(requestBooksSuccess(data))
}

function* fetchAuthAsync(data) {
  yield call(() => {
    return axios({
      url: data.data.url,
      method: 'POST',
      data: {
        email: data.data.email,
        password: data.data.password
      },
      headers: {
        'Content-Type': 'application/json',
      }
      })
      .then(response => { 
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refresh-token', response.data.refresh_token)
      })
      .catch(err => data.data.setMessage(err.response.data.message))
  })
  yield fetchMyProfileAsync();
  yield fetchBooksAsync();
}


// Sagas
export function* watchFetch() {
  yield takeEvery('FETCHED_AUTH', fetchAuthAsync)
  yield takeEvery('FETCHED_MY_PROFILE', fetchMyProfileAsync)
  yield takeEvery('FETCHED_BOOKS', fetchBooksAsync)
}
