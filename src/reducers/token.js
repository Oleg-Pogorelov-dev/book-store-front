import { SAVE_TOKEN } from "../actions/actions";

const initialState = {
  access_token: "",
  refresh_token: "",
};

export function reducerToken(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        token: localStorage.getItem("token"),
        refresh_token: localStorage.getItem("refresh-token"),
      };
    default:
      return state;
  }
}
