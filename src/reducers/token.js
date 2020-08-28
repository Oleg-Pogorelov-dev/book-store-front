import { REQUESTED_TOKEN } from "../actions/actions";

const accessToken = localStorage.getItem("token") || "";

const initialState = {
  token: "",
};

export function reducerToken(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_TOKEN:
      return {
        token: accessToken,
      };
    default:
      return state;
  }
}
