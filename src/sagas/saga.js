import { 
        call, 
        put, 
        takeEvery, 
        take
      } from 'redux-saga/effects'
  
export function reducerPost(state = {
  title: '',
  description: '',
  loading: false,
}, action) {
    switch (action.type) {
      case 'REQUESTED_POST':
        return {
          title: '',
          description: '',
          loading: true,
        };
      case 'REQUESTED_POST_SUCCEEDED':
        return action.data
      default:
        return state;
    }
};

export function reducerAddPost(state = {
  error: '',
}, action) {
  switch (action.type) {
    case 'ADD_POST_FAILED':
      return {
        error: "can't be blank!"
      }
    default:
      return state;
  }
};
  
export function reducerCurrentPost(state = {
  id: null,
  title: '',
  description: '',
  loading: false,
}, action) {
  switch (action.type) {
    case 'REQUESTED_CURRENT_POST':
      return {
        id: null,
        title: '',
        description: '',
        loading: true,
      }
    case 'CURRENT_POST_SUCCEEDED':
      return action.data
    default:
      return state;
  }
}

export function reducerComment(state = {
  message: '',
  loading: false,
}, action) {
    switch (action.type) {
      case 'REQUESTED_COMMENT':
        return {
          message: '',
          loading: true,
        }
      case 'REQUESTED_COMMENT_SUCCEEDED':
        return action.data
      default:
        return state;
    }
};

export function reducerMyProfile(state = {
  email: '',
  firs_name: '',
  second_name: '',
  loading: false
}, action) {
    switch (action.type) {
      case 'REQUESTED_MY_PROFILE':
          return {
            email: '',
            firs_name: '',
            second_name: '',
            loading: true
          }
      case 'REQUESTED_MY_PROFILE_SUCCEEDED':
        return action.data.data
      default:
        return state;
    }
};





// Action Creators
const requestPost = () => {
    return { type: 'REQUESTED_POST' }
};

const requestComment = () => {
  return { type: 'REQUESTED_COMMENT' }
};


const requestMyProfile = () => {
  return { type: 'REQUESTED_MY_PROFILE' }
}

const requestMyProfileSuccess = (data) => {
  return { type: 'REQUESTED_MY_PROFILE_SUCCEEDED', data }
}

const requestPostSuccess = (data) => {
  return { type: 'REQUESTED_POST_SUCCEEDED', data }
};

const requestCurrentPost = (data) => {
    return { type: 'REQUESTED_CURRENT_POST', data }
};

const requestCommentSuccess = (data) => {
  return { type: 'REQUESTED_COMMENT_SUCCEEDED', data }
};

const requestPostError = () => {
    return { type: 'REQUESTED_POST_FAILED' }
};

const requestAddPostError = () => {
  return { type: 'ADD_POST_FAILED' }
};

  // Sagas
export function* watchFetchPost() {
  yield takeEvery('FETCHED_POST', fetchPostAsync)
  yield takeEvery('ADD_POST', fetchAddPostAsync)
  yield takeEvery('ADD_COMMENT', fetchAddCommentAsync)
  yield takeEvery('FETCHED_EDIT_POST', fetchEditPostAsync)
  yield takeEvery('FETCHED_COMMENT', fetchCommentAsync)
  yield takeEvery('FETCHED_MY_PROFILE', fetchMyProfileAsync)
  yield takeEvery('DELETE_POST', fetchDeletePostAsync)
}
  
function* fetchMyProfileAsync() {
  yield put(requestMyProfile())
  const data = yield call(() => {
    return fetch('https://postify-api.herokuapp.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('Access-Token'),
        'Client': localStorage.getItem('Client'),
        'Uid': localStorage.getItem('Uid'),
      }
    }).then(data => {
      return data.json()
    })
  })
  yield put(requestMyProfileSuccess(data))
}

  function* fetchPostAsync() {
    yield put(requestPost())
    try {
      const data = yield call(() => {
        return fetch('https://postify-api.herokuapp.com/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': localStorage.getItem('Access-Token'),
                        'Client': localStorage.getItem('Client'),
                        'Uid': localStorage.getItem('Uid'),
                    }})
                .then(res => res.json())
                .then(data => {
                  return data
                })
        } 
      );
      yield put(requestPostSuccess(data));
    } catch (error) {
      yield put(requestPostError());
    }
  }



  function* fetchCommentAsync() {
    yield put(requestComment())
    try {
      const data = yield call(() => {
        return fetch('https://postify-api.herokuapp.com/comments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': localStorage.getItem('Access-Token'),
                        'Client': localStorage.getItem('Client'),
                        'Uid': localStorage.getItem('Uid'),
                    }})
                .then(res => res.json())
                .then(data => {
                  return data
                })
        } 
      );
      yield put(requestCommentSuccess(data));
    } catch (error) {
      yield put(requestPostError());
    }
  }


function* fetchAddPostAsync(data) {
  fetch('https://postify-api.herokuapp.com/posts', {
    method: 'POST',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
  .then(data => {
    data.json()
    if(!data.ok){
      requestAddPostError()
    }
  })
  yield fetchPostAsync()
}

function* fetchAddCommentAsync(data) {
  fetch('https://postify-api.herokuapp.com/comments', {
    method: 'POST',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
  yield fetchCommentAsync()
}

function* fetchEditPostAsync(data) {
  fetch(`https://postify-api.herokuapp.com/posts/${data.data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
  yield fetchPostAsync()
  yield fetchPostAsync()
}

function* fetchCurrentPostAsync(id) {
  const data = call(() => {
    return fetch(`https://postify-api.herokuapp.com/posts/${id.id}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Access-Token': localStorage.getItem('Access-Token'),
                      'Client': localStorage.getItem('Client'),
                      'Uid': localStorage.getItem('Uid'),
                  }})
              .then(res => res.json())
              .then(data => {
                return data
              })
    })
  yield put(requestCurrentPost(data));
} 

function* fetchDeletePostAsync(id) {
  fetch(`https://postify-api.herokuapp.com/posts/${id.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('Access-Token'),
        'Client': localStorage.getItem('Client'),
        'Uid': localStorage.getItem('Uid'),
    }
  })
  yield fetchPostAsync()
  yield fetchPostAsync()
}