import { REQUESTED_MY_PROFILE, REQUESTED_MY_PROFILE_SUCCEEDED } from "../actions/actions";

export function reducerMyProfile(state = {
  email: '',
  loading: false
}, action) {
    switch (action.type) {
      case REQUESTED_MY_PROFILE:
          return {
            email: '',
            loading: true
          }
      case REQUESTED_MY_PROFILE_SUCCEEDED:
        return {
          email: action.data.user,
          loading: false
        }
      default:
        return state;
    }
};
  
