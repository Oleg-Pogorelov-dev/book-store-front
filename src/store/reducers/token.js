import { SET_ACCESS_TOKEN } from "../actions/actions";

const accessToken = localStorage.getItem("token") || "";

const initialState = {
  token: accessToken,
};

export function reducerToken(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        token: action.data,
      };
    default:
      return state;
  }
}
