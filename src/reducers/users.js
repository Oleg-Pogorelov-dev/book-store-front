import { ADD_USER } from '../actions/actions'

const initialState = [{ 
    id: 0,
    email: '',
    password: '',
    passwrod_confirmation: '',
    first_name: '',
    last_name: ''
  }]

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return [ ...state,{
        id: state[state.length -1].id + 1,
        email: action.payload_1,
        password: action.payload_2,
        passwrod_confirmation: action.payload_3,
        first_name: action.payload_4,
        last_name: action.payload_5
      }]

    default:
      return state
  }
}
