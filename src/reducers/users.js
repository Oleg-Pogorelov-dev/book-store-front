import {
  REQUESTED_MY_PROFILE,
  REQUESTED_MY_PROFILE_SUCCEEDED,
} from "../actions/actions";

export function reducerMyProfile(
  state = {
    email: "",
    id: null,
    loading: false,
    orders: [],
  },
  action
) {
  switch (action.type) {
    case REQUESTED_MY_PROFILE:
      return {
        email: "",
        id: null,
        loading: true,
        orders: [],
      };
    case REQUESTED_MY_PROFILE_SUCCEEDED:
      return {
        email: action.data.user.email,
        id: action.data.user.id,
        loading: false,
        orders: action.data.orders,
      };
    default:
      return state;
  }
}
