import {
  REQUESTED_MY_PROFILE,
  REQUESTED_MY_PROFILE_SUCCEEDED,
} from "../actions/actions";

export function reducerMyProfile(
  state = {
    email: "",
    id: null,
    first_name: "",
    last_name: "",
    phone: null,
    avatar: "",
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
        first_name: "",
        last_name: "",
        phone: null,
        avatar: "",
        loading: true,
        orders: [],
      };
    case REQUESTED_MY_PROFILE_SUCCEEDED:
      return {
        email: action.data.user.email,
        id: action.data.user.id,
        first_name: action.data.user.first_name,
        last_name: action.data.user.last_name,
        phone: action.data.user.phone,
        avatar: action.data.user.avatar,
        loading: false,
        orders: action.data.orders,
      };
    default:
      return state;
  }
}
