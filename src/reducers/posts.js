import { ADD_POST } from '../actions/actions'

const initialState = [{ 
    id: 1, 
    user_id: '',
    title: 'Wow!!', 
    discription: 'This is my first post!', 
    created_at:'',
    updated_at:''
  }]

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [ ...state,{
        id: state[state.length -1].id + 1,
        title: action.payload_1,
        discription: action.payload_2,
      }]

    default:
      return state
  }
}

