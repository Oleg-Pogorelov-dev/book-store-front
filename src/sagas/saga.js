import{call, put, takeEvery} from 'redux-saga/effects'
import axios from "axios";
import { requestMyProfile, requestMyProfileSuccess} from '../actions/actionCreators';

function* fetchMyProfileAsync() {
  yield put(requestMyProfile())
  const data = yield call(() => {
    return axios({
      url: 'http://localhost:3000/profile',
      method: 'GET',
      responseType: "json",
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('token')
      }
    }).then(response => response.data)
  })
  yield put(requestMyProfileSuccess(data))
}

// Sagas
export function* watchFetch() {
  yield takeEvery('FETCHED_MY_PROFILE', fetchMyProfileAsync)
}
